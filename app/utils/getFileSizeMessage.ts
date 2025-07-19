const getFileSizeMessage = (fileSize: string | undefined): string => {
  if (!fileSize) {
    return "Oops! It looks like the file size is unknown. Please try re-uploading your resume.";
  }

  const parsedSize = parseFloat(fileSize);
  const formattedSize = `${parsedSize.toFixed(1)} KB`;

  if (parsedSize <= 500) {
    return `Great job! Your resume size is ${formattedSize}, which is ideal for fast uploads and ATS systems.`;
  }

  if (parsedSize <= 1000) {
    return `Your resume size is ${formattedSize}. That’s acceptable, but you might want to optimize it slightly for better performance.`;
  }

  return `Heads up! Your resume is ${formattedSize}, which is quite large. Consider compressing it for smoother uploads and better compatibility.`;
};

export default getFileSizeMessage;
