import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: "No resume text provided" });
  }

  const query = resumeText.toString().trim();
  const aiPrompt = `${query} Give me Only Job Title Fit to it just title not other text`;

  const url = `https://chatgpt-42.p.rapidapi.com/conversationllama3`;
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.ROLE_FINDER_API_KEY as string,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: aiPrompt,
        },
      ],
      web_access: false,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data?.result);

    return res.status(200).json({ jobTitle: data?.result });
  } catch (error) {
    console.error("Error fetching job title:", error);
    return res.status(500).json({ error: "Failed to fetch job title" });
  }
}
