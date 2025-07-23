import { ApiError } from "next/dist/server/api-utils";

export const getKeywordResponse = async (query: string) => {
  if (!query) {
    throw new ApiError(400, "Description not provided");
  }
  const response = await fetch(`/api/aptresume-ai/gen-keywords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(data.status, data.message);
  }

  const data = await response.json();
  return data;
};
