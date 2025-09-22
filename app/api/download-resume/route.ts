import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { html, pageSize } = body;

  if (!html) {
    return NextResponse.json({ message: "No Content" }, { status: 400 });
  }

  let browser = null;

  try {
    let puppeteer;
    let launchOptions = {};
    if (process.env.VERCEL_ENV !== "development") {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        ignoreHTTPSErrors: true,
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Lato&family=Nunito&family=Open+Sans&family=Montserrat&family=Raleway&family=Roboto&display=swap" rel="stylesheet" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
        ${html}
        </body>
      </html>
    `;

    await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: pageSize,
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    if (browser) await browser.close();
    if (error instanceof Error) {
      console.log(error);

      return NextResponse.json(
        { message: "Failed to generate pdf" },
        { status: 500 }
      );
    }
  }
};
