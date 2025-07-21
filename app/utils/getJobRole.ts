import { ApiError } from "next/dist/server/api-utils";

const getJobRole = async (query: string) => {
  const response = await fetch("/api/aptresume-ai/gen-job-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message || "Error while generating job role";
    throw new ApiError(response.status, message);
  }
  const data = await response.json();
  const jobRole = data;
  return jobRole;
};

export default getJobRole;
