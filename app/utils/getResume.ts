import { ApiError } from "next/dist/server/api-utils";

export const getResume = async (fileId: string) => {
  if (!fileId) {
    throw new ApiError(400, "File ID is required");
  }

  const response = await fetch(
    `/api/get-resume?fileId=${encodeURIComponent(fileId)}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    const status = response.status;
    throw new ApiError(status, errorData.message);
  }
  return response.json();
};
