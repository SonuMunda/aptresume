import { ApiError } from "next/dist/server/api-utils";

export const getResumeAtsReport = async (
  resumeText: string,
  file_size: number,
  file_type: string
) => {
  const response = await fetch("/api/aptresume-ai/analyse-ats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resumeText,
      file_size: file_size,
      file_type: file_type,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    const status = response.status;
    throw new ApiError(status, errorData.message);
  }

  return data;
};
