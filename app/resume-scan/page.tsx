"use client";

import { motion } from "framer-motion";
import { atsProcess } from "@/data/atsProcess";
import ResumeUploader from "../components/ResumeUploader";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FeatureCard from "../components/shared/FeatureCard";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ResumeScan = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
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
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[26rem] sm:h-[30rem] md:h-[34rem] flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white text-center px-4 overflow-hidden">
        <motion.h1
          className="hero-title font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 relative  drop-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          ATS Resume Scanner & Optimizer
        </motion.h1>

        <motion.p
          className="hero-description mt-3 text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-3xl relative  drop-shadow-md"
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
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How Our ATS Scanner Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {atsProcess.map(({ id, icon: Icon, title, description }, index) => (
            <FeatureCard
              index={index}
              Icon={Icon}
              title={title}
              description={description}
              key={id}
            />
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
    </main>
  );
};

export default ResumeScan;
