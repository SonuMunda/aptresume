export const getResume = async (fileId: string) => {
  try {
    if (!fileId) return;

    const response = await fetch(
      `/api/get-resume-url?fileId=${encodeURIComponent(fileId)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch resume");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};
