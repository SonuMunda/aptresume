import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();
  const url =
    "https://ai-resume-builder-cv-checker-resume-rewriter-api.p.rapidapi.com/analyzeResume?noqueue=1&language=en";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.ATS_ANALYSER_API_KEY as string,
      "x-rapidapi-host":
        "ai-resume-builder-cv-checker-resume-rewriter-api.p.rapidapi.com",
      "Content-Type": "application/json",
      "x-usiapps-req": "true",
    },
    body: JSON.stringify({ resumeText }),
  };

  try {
    const response = await fetch(url, options);

    const result = await response.json();

    return NextResponse.json(
      {
        message: "Resume analyzed successfully",
        data: result,
      },
      { status: 200 }
    );

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
