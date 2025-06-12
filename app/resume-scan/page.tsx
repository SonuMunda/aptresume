"use client";

import Header from "../components/Header";
import { motion } from "framer-motion";
import { atsProcess } from "../data/atsProcess";
import ResumeUploader from "../auth/components/ResumeUploader";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ResumeScan = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload: (file: File) => Promise<Response> = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.error || "Upload failed");
        throw new Error("Error uploading file");
      }
      toast.success("File uploaded successfully");
      const data = await response.json();

      const resumeId = data?.upload?.id;
      router.push(`/resume-report?id=${resumeId}`);
      return response;
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Something went wrong while uploading.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="relative h-[26rem] sm:h-[30rem] md:h-[34rem] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 text-white text-center px-4">
        <motion.h1
          className="hero-title text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          ATS Resume Scanner & Optimizer
        </motion.h1>
        <motion.p
          className="hero-description mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ delay: 0.3 }}
        >
          Upload your resume to see how well it performs against ATS algorithms
          and get instant optimization tips.
        </motion.p>
      </section>
      <Toaster />
      {/* Upload Section */}
      <ResumeUploader handleFileUpload={handleFileUpload} loading={loading} />

      {/* How It Works Section */}
      <section className="py-16 bg-white px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          How Our ATS Scanner Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {atsProcess.map(({ id, icon: Icon, title, description }, index) => (
            <motion.div
              key={id}
              className="bg-gray-100 p-8 rounded-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              transition={{ delay: index * 0.25 }}
            >
              <div className="mb-4 text-blue-400">
                <Icon sx={{ fontSize: 50 }} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black ">
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-100 px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why Optimize Your Resume for ATS?
          </h2>
          <p className="text-gray-700 mb-6">
            Most companies use Applicant Tracking Systems (ATS) to filter
            resumes before a human ever reads them. Our scanner helps ensure
            your resume passes through these filters by analyzing formatting,
            keywords, and relevance to job roles.
          </p>
          <p className="text-gray-700">
            By tailoring your resume to the job description and optimizing
            content structure, you improve your chances of getting noticed and
            landing an interview.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default ResumeScan;
