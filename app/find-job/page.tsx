"use client";

import React, { useRef, useState } from "react";
import { Button, Typography, CircularProgress, Chip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  BusinessOutlined,
  ErrorOutline,
  LocationOnOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { getParsedResume } from "../utils/getParsedResume";
import getJobRole from "../utils/getJobRole";
import getJobs from "../utils/getJobs";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import reputableProviders from "@/data/reputableProviders";
import { ApiError } from "next/dist/server/api-utils";
import AccordionComponent from "../components/shared/AccordionComponent";
import jobsFaqData from "@/data/jobFinderFaqs";
import HeroSection from "../components/layout/HeroSection";

const JobFinder: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const [error, setError] = useState<string>("");

  interface JobResult {
    id: string;
    title: string;
    company: string;
    description: string;
    image: string;
    location: string;
    employmentType: string;
    datePosted: string;
    salaryRange: string;
    jobProviders: { jobProvider: string; url: string }[];
  }

  const [jobResults, setJobResults] = useState<JobResult[]>([]);
  const uploaderRef = useRef<HTMLElement>(null);

  const heroContent = {
    headline: "Unlock Your Perfect Career Match",
    supportingText:
      "Upload your resume and let our advanced AI analyze your skills, experience, and goals to recommend tailored job opportunities that align with your unique profile.",
    image: "/images/ai-jobs-suggestion.png",
    imageAlt: "Keyword Matcher Hero Image",
    buttonText: "Upload Resume",
  };

  const scrollToUploader = () => {
    uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setResumeFile(acceptedFiles[0]);
      }
    },
  });

  const handleUploadResume = async () => {
    try {
      setLoading(true);
      setJobResults([]);
      setLoadingText("Uploading resume");

      if (!resumeFile) {
        setError("Please select a resume file");
        toast.error("Upload a resume");
        return;
      }

      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64);
        };

        reader.onerror = () => reject("Failed to read file");

        reader.readAsDataURL(resumeFile);
      });

      setLoadingText("Parsing resume");
      const parsedResume = await getParsedResume(base64String);
      const query = parsedResume?.text;
      setLoadingText("Matching job role");
      const jobRole = await getJobRole(query);

      setLoadingText("Finding jobs for you");
      const jobsData = await getJobs(jobRole);
      console.log(jobsData?.jobs);
      setLoadingText("Finding matching jobs");
      if (jobsData?.jobs.length === 0) {
        setError("No jobs found");
        setJobResults([]);
      }
      setJobResults(jobsData.jobs);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        console.log(error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setLoadingText("");
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
        imageAlt={heroContent.imageAlt}
        buttonText={heroContent.buttonText}
        handleScroll={scrollToUploader}
      />

      {/* Upload Section */}
      <section className="upload-section" ref={uploaderRef}>
        <div className="container my-16 p-6 mx-auto max-w-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Upload Your Resume
          </h3>

          <Typography
            variant="body2"
            sx={{
              color: "#4a5568",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span>
              Upload your resume (PDF). Our AI will analyze your skills and
              recommend the most suitable job roles for you.
            </span>
          </Typography>

          <div
            {...getRootProps()}
            className={`border-2 ${
              isDragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-dashed border-gray-400"
            } rounded-md p-6 text-center cursor-pointer transition-all duration-200`}
          >
            <input {...getInputProps()} />
            <CloudUploadOutlinedIcon
              fontSize="large"
              className="text-indigo-700 mb-2"
            />
            <Typography variant="body2" className="text-gray-700 mb-1">
              Drag & drop your PDF here, or click to select
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              (PDF format only, max 1 file)
            </Typography>
          </div>

          {resumeFile && (
            <Chip
              label={resumeFile.name}
              color="primary"
              variant="outlined"
              icon={<UploadFileIcon />}
              sx={{ mt: 2, borderRadius: 1 }}
            />
          )}

          <Button
            variant="contained"
            disabled={!resumeFile || loading}
            onClick={handleUploadResume}
            sx={{
              mt: 3,
              textTransform: "none",
              width: "100%",
              backgroundColor: "#084f8e",
              "&:hover": { backgroundColor: "#06396a" },
              "&.Mui-disabled": {
                backgroundColor: "#cfd8dc",
                color: "#565a5c",
              },
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <CircularProgress size={20} color="inherit" />
                {loadingText || "Finding Jobs..."}
              </span>
            ) : (
              "Find My Jobs"
            )}
          </Button>
        </div>
      </section>

      {/* Suggested Jobs Section */}
      {!loading && error && (
        <motion.div
          className="flex items-center justify-center gap-2 p-10 bg-red-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorOutline color="error" />
          <p className="text-center text-red-600">{error}</p>
        </motion.div>
      )}

      {jobResults?.length > 0 && (
        <section className="job-result">
          <div className="container max-w-6xl mx-auto py-10 px-4 mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Suggested Jobs
            </h3>

            <div className="jobs-list flex flex-col gap-6 mt-6">
              <AnimatePresence>
                {jobResults?.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white border border-gray-300 hover:shadow-md rounded-lg"
                  >
                    <div className="min-w-[60px]">
                      <Image
                        src={job.image || "/images/unknown-business-logo.png"}
                        alt={job.company || "Company Logo"}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-indigo-900">
                        {job.title || "Untitled Job"}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                        <Chip
                          size="small"
                          icon={<BusinessOutlined fontSize="small" />}
                          label={job.company || "Unknown Company"}
                        />
                        <Chip
                          size="small"
                          icon={<LocationOnOutlined fontSize="small" />}
                          label={job.location || "NA"}
                        />
                        <Chip
                          size="small"
                          icon={<AccessTimeOutlined fontSize="small" />}
                          label={job.datePosted || "NA"}
                        />
                        <Chip
                          size="small"
                          icon={<AttachMoneyOutlined fontSize="small" />}
                          label={job.salaryRange || "NA"}
                        />
                        <Chip
                          size="small"
                          icon={<WorkOutline fontSize="small" />}
                          label={job.employmentType || "NA"}
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {job.jobProviders &&
                          job.jobProviders.length > 0 &&
                          (() => {
                            const reputable = job.jobProviders.filter(
                              (provider) =>
                                reputableProviders.includes(
                                  provider.jobProvider
                                )
                            );
                            const others = job.jobProviders.filter(
                              (provider) =>
                                !reputableProviders.includes(
                                  provider.jobProvider
                                )
                            );

                            return (
                              <div className="flex gap-2 flex-wrap">
                                {(reputable.length > 0
                                  ? reputable
                                  : others
                                ).map((provider, idx) => (
                                  <Link
                                    key={idx}
                                    href={provider.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 p-2 rounded text-white text-xs hover:bg-indigo-700"
                                  >
                                    {provider.jobProvider}
                                  </Link>
                                ))}
                              </div>
                            );
                          })()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* Faqs */}
      <section className="bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight lg:max-w-4xl lg:mx-auto">
          Frequently Asked Questions
        </h3>

        <div className="faq-accordion max-w-5xl mx-auto space-y-6">
          {jobsFaqData.map((faq, index) => (
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

export default JobFinder;
