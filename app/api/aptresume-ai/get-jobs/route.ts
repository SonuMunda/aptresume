import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAi = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const resumeText: string = body.resumeText;

  if (!resumeText || typeof resumeText !== "string") {
    return NextResponse.json(
      {
        message: "Invalid Request",
      },
      { status: 400 }
    );
  }

  const prompt = `
  You have to generate Real Time Job Posting
  
  Given the resume text below, your task is to:
  1. Identify 20 job roles that are directly relevant to the candidate’s actual experience, job titles, technologies, and skills. Do not suggest unrelated roles.
  2. For each job role, generate a realistic job posting tailored to the **Indian job market**.
  
  **Strict Rules**:
  - Do NOT include jobs that are unrelated to the candidate’s work experience, skills, or job history.
  - Do NOT include job titles like "Data Scientist", "Backend Developer", or "ML Engineer" unless those clearly match the resume content.
  - Extract only roles relevant to the resume.
  
  Each job posting must include the following fields:
  - "title": Job title (must match resume relevance).
  - "location": Realistic Indian location.
  - "employment_type": e.g., Full-time, Part-time, Contract.
  - "date_posted": ISO format (e.g., "2025-06-28").
  - "salary": Estimated Indian market salary range (e.g., "₹6,00,000 - ₹9,00,000 per annum").
  - "company_name": Real existing company in India.
  - "company_image": Accurate logo URL of the company.
  - "job_providers": 2–3 entries with:
     - "provider_name": Real Indian job platform (e.g., "Naukri.com", "LinkedIn").
     - "apply_link": A complete working  link  for applying to the job posting on the job platform.
  
  Resume Text:
  \`\`\`
  ${resumeText}
  \`\`\`
  
  Return ONLY the following valid JSON format:
  \`\`\`json
  {
    "job_postings": [
      {
        "title": "",
        "location": "",
        "employment_type": "",
        "date_posted": "",
        "salary": "",
        "company_name": "",
        "company_image": "",
        "job_providers": [
          {
            "provider_name": "",
            "apply_link": ""
          }
        ]
      }
    ]
  }
  \`\`\`
  `;

  try {
    const response = await genAi.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    if (!response || !response.text) {
      return NextResponse.json(
        { message: "No response received from Gemini API." },
        { status: 500 }
      );
    }

    const responseText = response.text;
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    let atsData: unknown;

    if (jsonMatch && jsonMatch[1]) {
      atsData = JSON.parse(jsonMatch[1]);
    } else {
      atsData = JSON.parse(responseText);
    }

    return NextResponse.json(atsData);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Api error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occurred during API analysis." },
      { status: 500 }
    );
  }
}
