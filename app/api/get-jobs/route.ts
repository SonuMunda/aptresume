import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { title, experience, location } = body;

  if (!title)
    return NextResponse.json(
      { message: "Job Title Required" },
      { status: 400 }
    );

  let query = "";

  if (location) {
    query  = `${title} in ${location}`;
  }

  console.log(query);
  

  const params = [
    `query=${encodeURIComponent(query)}`,
    "page=1",
    "num_pages=10",
    "country=in",
    "date_posted=week",
  ];

  if (experience) {
    params.push(`job_requirements=${encodeURIComponent(experience)}`);
  }

  const url = `https://jsearch.p.rapidapi.com/search?${params.join("&")}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.JSEARCH_API_KEY as string,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "No data fetched" },
        { status: response.status }
      );
    }

    const jobs = await response.json();
    return NextResponse.json(jobs.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
