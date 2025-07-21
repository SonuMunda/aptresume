import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobTitle = searchParams.get("profession");

  if (!jobTitle) {
    return NextResponse.json(
      { message: "Missing 'profession' parameter." },
      { status: 400 }
    );
  }

  const title = encodeURIComponent(jobTitle);
  const location = encodeURIComponent("India");
  const url = `https://jobs-api14.p.rapidapi.com/v2/list?query=${title}&location=${location}&autoTranslateLocation=true&remoteOnly=false&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor&datePosted=hour'`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.JOBS_API_KEY as string,
        "x-rapidapi-host": "jobs-api14.p.rapidapi.com",
      },
    });

    const data = await response.json();
    const jobs = data?.jobs;

    return NextResponse.json(
      {
        jobs: jobs,
        message: data.message || "Job Fetched",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: "Failed to fetch jobs" },
        { status: 500 }
      );
    }
  }
}
