import { ApiError } from "next/dist/server/api-utils";

export const getParsedResume = async (file: File | string) => {
  if (!file) throw new Error("No file provided");

  const res = await fetch("/api/parsers/resume-parser", {
    method: "POST",
    body: JSON.stringify({ file }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const status = 500;
    throw new ApiError(status, errorData.message);
  }
  return res.json();
};
