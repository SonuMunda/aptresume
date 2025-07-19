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
  const file_size = body.file_size;
  const file_type = body.file_type;

  if (!resumeText || typeof resumeText !== "string") {
    return NextResponse.json(
      {
        message: "Invalid Request",
      },
      { status: 400 }
    );
  }

  const prompt = `
    You are an expert Applicant Tracking System (ATS) compatibility analyzer and resume reviewer.
    Your task is to critically evaluate the provided resume text and generate a detailed ATS assessment in the specified JSON format.

    For the 'tailoring' assessment, **assume a general, relevant role based on the resume's content itself** (e.g., if the resume shows marketing experience, assume a general marketing role).

    Assess the resume based on the following categories:
    - **Tailoring (out of 10):** How well the resume's keywords, skills, and experience align with general industry expectations for the apparent role (based on resume content).
    - **Content (out of 10):** Quality, relevance, impact of text. Look for quantifiable achievements, strong action verbs, and a targeted summary.
    - **Format (out of 10):** ATS-friendliness (standard headings, no complex graphics, consistent dates, clean layout).
    - **Sections (out of 10):** Use of standard and clear section headings (e.g., 'Education', 'Experience', 'Skills'). Logical structure.
    - **Style (out of 10):** Writing style for professionalism, conciseness, and impact (active voice, strong vocabulary, focus on accomplishments).

    Provide specific feedback for each category. Include an overall ATS score and general recommendations for optimization.

    ---
    Resume Text:
    ${resumeText}
    ---

    Output ONLY the JSON, strictly following this structure:
    \`\`\`json
{
  "overall_assessment": "",
  "breakdown_by_category": {
    "tailoring": {
      "score": null,
      "max_score": 10,
      "feedback": "",
      "matched_keywords": [],
      "missing_keywords": []
    },
    "content": {
      "score": null,
      "max_score": 10,
      "feedback": "",
      "skills_matched": [],
      "skills_missing": [],
      "achievements_identified": [],
      "experience_analysis": {
        "years_found": null,
        "seniority_level": "",
        "feedback": ""
      },
      "education_analysis": {
        "degrees_identified": [],
        "feedback": ""
      },
      "certifications": {
        "found": [],
        "feedback": ""
      }
    },
    "format": {
      "score": null,
      "max_score": 10,
      "feedback": "",
      "file_size": "${file_size}",  
      "file_type": "${file_type}"   
      "is_readable_by_ats": true,
    },
    "sections": {
      "score": null,
      "max_score": 10,
      "feedback": "",
      "required_sections_present": [],
      "missing_sections": []
    },
    "style": {
      "score": null,
      "max_score": 10,
      "feedback": "",
      "font_consistency": true,
      "bullet_points_used": true,
      "tense_consistency": true,
      "readability_feedback": {
        "readability_score": null,
        "sentence_complexity": "",
        "passive_voice_usage": "",
        "recommendations": []
      }
    },
    "overall_score": {
      "score": null,
      "max_score": 10,
      "summary": ""
    }
  },
  "recommendations_for_ats_optimization": [],
  "final_verdict": ""
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
