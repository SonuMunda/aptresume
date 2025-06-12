const getJobs = async (jobRole: string) => {
  try {
    const response = await fetch(
      `/api/get-jobs?profession=${jobRole} `,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return error.message;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) return error.message;
  }
};

export default getJobs;
