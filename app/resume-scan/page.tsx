"use client";

import { motion } from "framer-motion";
import { atsProcess } from "@/data/atsProcess";
import ResumeUploader from "../components/ResumeUploader";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import FeatureCard from "../components/shared/FeatureCard";
import Image from "next/image";
import atsScanFaqData from "@/data/atsScannerFaqs";
import AccordionComponent from "../components/shared/AccordionComponent";
import HeroSection from "../components/layout/HeroSection";
import SectionSummary from "../components/shared/SectionSummary";

const ResumeScan = () => {
  const router = useRouter();
  const uploaderRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const heroContent = {
    headline: "Elevate Your Resume with AI Precision",
    supportingText:
      "Analyze your resume against ATS standards and receive tailored recommendations to stand out to employers.",
    image: "/images/ats-scanner-hero-image.png",
    imageAlt: "ATS Scanner Hero Image",
    buttonText: "Upload Resume",
  };

  const scrollToUploader = () => {
    uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        toast.error(errorData.message || "Upload failed");
        return;
      }

      const data = await response.json();
      const resumeId = data?.upload?.id;
      toast.success(data.message);
      router.push(`/resume-report?id=${resumeId}`);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Toaster />

      {/* Hero Section */}
      <HeroSection
        headline={heroContent.headline}
        supportingText={heroContent.supportingText}
        image={heroContent.image}
        buttonText={heroContent.buttonText}
        handleScroll={scrollToUploader}
        imageAlt={heroContent.imageAlt}
      />

      {/* Additional Info Section */}
      <section className="py-16 bg-white px-6 sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <motion.div
              className="w-full lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/ats-scan-tip.png"
                alt="ATS-Optimized Resume Analysis"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full max-w-md"
              />
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="content space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                  Optimize Your Resume for ATS Success
                </h2>
                <p className="text-gray-600 text-lg md:text-xl mx-auto lg:mx-0 max-w-3xl leading-relaxed">
                  Applicant Tracking Systems (ATS) are used by over 75% of
                  companies to filter resumes, often rejecting candidates before
                  human review. Our advanced ATS scanner evaluates your resume’s
                  formatting, keyword alignment, and job role relevance to
                  ensure it passes these critical filters.
                </p>
                <p className="text-gray-600 text-lg md:text-xl mx-auto lg:mx-0 max-w-3xl leading-relaxed">
                  By optimizing your resume to align with job descriptions and
                  refining its structure, you can increase your visibility by up
                  to 40%. This strategic approach enhances your chances of
                  securing interviews and gives you a competitive edge in
                  today’s job market.
                </p>
                <p className="text-gray-600 text-lg md:text-xl mx-auto lg:mx-0 max-w-3xl leading-relaxed">
                  Leverage our AI-powered insights to refine your resume and
                  unlock new opportunities. Upload your document today to
                  discover how targeted improvements can make a significant
                  impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="resume-uploader bg-gradient-to-br from-indigo-50 to-blue-50" ref={uploaderRef}>
        <div className="container max-w-7xl mx-auto py-24 px-4 grid lg:grid-cols-2 items-center gap-10">
          <SectionSummary
            headline="Upload Your Resume"
            supportingText="Boost your job application success! Upload your resume for an
            instant ATS-friendly scan and tailored improvement tips."
          />

          <div className="w-full mx-auto">
            <ResumeUploader
              handleFileUpload={handleFileUpload}
              loading={loading}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="working white">
        <div className="container max-w-7xl text-center mx-auto py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
          <SectionSummary
            headline="How Our ATS Scanner Works"
            supportingText="Our AI-powered ATS scanner helps you optimize your resume for top job matching."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-10">
            {atsProcess.map(
              ({ icon: Icon, iconBgColor, title, description }, index) => (
                <FeatureCard
                  index={index}
                  Icon={Icon}
                  iconBgColor={iconBgColor}
                  title={title}
                  description={description}
                  key={index}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Faqs */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800  lg:max-w-4xl lg:mx-auto">
          Frequently Asked Questions
        </h3>

        <div className="faq-accordion max-w-5xl mx-auto space-y-6">
          {atsScanFaqData.map((faq, index) => (
            <AccordionComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ResumeScan;
