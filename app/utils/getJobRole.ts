const getJobRole = async (query: string) => {
  try {
    const response = await fetch("/api/aptresume-ai/gen-job-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    const jobRole = data;
    return jobRole;
  } catch (error) {
    if (error instanceof Error) return error.message;
  }
};

export default getJobRole;
