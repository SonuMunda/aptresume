export const getResumeAtsReport = async (resumeText: string) => {
  try {
    const response = await fetch("/api/analyse-ats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeText }),
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Request failed: ${message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ATS analysis failed:", error);
    throw error;
  }
};
