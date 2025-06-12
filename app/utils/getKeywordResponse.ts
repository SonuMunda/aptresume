export const getKeywordResponse = async (query: string) => {
  try {
    const response = await fetch(`/api/aptresume-ai?query=${query}`, {
      method: "GET",
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
