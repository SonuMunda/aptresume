export const getResumeAtsReport = async (
  resumeText: string,
  file_size: number,
  file_type: string
) => {
  try {
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
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Request failed: ${message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
