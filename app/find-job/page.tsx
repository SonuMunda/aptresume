"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  BusinessOutlined,
  ErrorOutline,
  ExpandMore,
  LocationOnOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { getParsedResume } from "../utils/getParsedResume";
import getJobRole from "../utils/getJobRole";
import getJobs from "../utils/getJobs";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import faqData from "@/data/jobFinderFaqs";
import reputableProviders from "@/data/reputableProviders";
import { ApiError } from "next/dist/server/api-utils";

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
      <section className="relative h-[26rem] sm:h-[30rem] md:h-[34rem] flex items-center justify-center bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="px-4 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Your Dream Job
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-indigo-100 leading-relaxed">
            Upload your resume and let our AI match you with the most relevant,
            personalized job opportunities — quickly and efficiently.
          </p>
        </motion.div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
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
      <section className="bg-gray-50 mx-auto px-4 py-20">
        <h3 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          Frequently Asked Questions
        </h3>

        <div className="faq-accordion max-w-5xl space-y-4 mx-auto">
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              elevation={4}
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#1e40af" }} />}
                sx={{
                  px: 3,
                  py: 2,
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                    fontSize: "1.125rem",
                    color: "#1f2937",
                  },
                }}
              >
                <Typography component="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: "#f9fafb",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <Typography
                  component="p"
                  variant="body2"
                  className="text-gray-700 leading-relaxed"
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
    </main>
  );
};

export default JobFinder;
