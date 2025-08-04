const getJobDescription = async (query: string) => {
  if (!query) {
    throw new Error("Job Description is Empty");
  }
  const response = await fetch("/api/aptresume-ai/gen-job-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({query}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get Description");
  }

  return data;
};

export default getJobDescription;
