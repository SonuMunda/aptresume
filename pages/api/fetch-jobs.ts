import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Job query is required" });
  }

  const url = `https://jsearch.p.rapidapi.com/search?query=${query}page=1&num_pages=1&date_posted=all`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.JOBS_FINDER_API_KEY as string,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const jobsData = result?.data;

    return res.status(200).json({ jobs: jobsData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
