import { ApiError } from "next/dist/server/api-utils";

const getJobs = async (jobRole: string) => {
  const response = await fetch(`/api/get-jobs?profession=${encodeURIComponent(jobRole)}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(response.status, error.message);
  }

  const data = await response.json();

  if (data.jobs.length === 0) {
    throw new ApiError(400, "No jobs found");
  }

  return data;
};

export default getJobs;
