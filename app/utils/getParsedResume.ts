export const getParsedResume = async (file: File | string) => {
  if (!file) throw new Error("No file provided");

  const res = await fetch("/api/parsers/resume-parser", {
    method: "POST",
    body: JSON.stringify({ file }),
  });

  if (!res.ok) {
    const message = await res.text();
    console.log(message);
    throw new Error(`Resume parse failed: ${message || res.statusText}`);
  }

  return res.json();
};
