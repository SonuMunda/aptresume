export const getKeywordResponse = async (query: string) => {
  try {
    const response = await fetch(`/api/aptresume-ai/gen-keywords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch keywords: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getKeywordResponse:", error);
    if (error instanceof Error) return error;
  }
};
