export const getResume = async (fileId: string) => {
  try {
    if (!fileId) return;

    const response = await fetch(
      `/api/get-resume?fileId=${encodeURIComponent(fileId)}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message || "Failed to fetch resume",
        status: response.status,
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};
