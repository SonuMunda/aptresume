"use client";

import React, { useState } from "react";
import { Button, Typography, CircularProgress, Chip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  BusinessOutlined,
  LocationOnOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

const JobFinder: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const [error, setError] = useState<string>("");

  interface JobResult {
    job_id: string;
    employer_logo?: string;
    employer_name?: string;
    job_title?: string;
    job_is_remote?: boolean;
    job_location?: string;
    job_posted_at?: string;
    job_salary?: string;
    job_min_salary?: number;
    job_max_salary?: number;
    job_employment_types?: string[];
    job_apply_link?: string;
    apply_options?: { publisher?: string; apply_link?: string }[] | undefined;
    job_google_link?: string;
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

  const handleSubmit = async () => {
    if (!resumeFile) {
      alert("Please upload a resume file.");
      return;
    }
    setLoading(true);
    setLoadingText("Parsing your resume...");
    setError("");
    setJobResults([]);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const result = reader.result as string;
          const base64 = result.split(",")[1];

          const res = await fetch("/api/parse-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileBase64: base64,
              fileType: resumeFile.type,
            }),
          });

          if (!res.ok) throw new Error("Failed to parse resume");
          const data = await res.json();

          setLoadingText("Matching job roles...");
          const jobRoleRes = await fetch("/api/fetch-job-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: data.text }),
          });

          if (!jobRoleRes.ok) throw new Error("Failed to fetch job role");
          const { jobTitle } = await jobRoleRes.json();

          const jobSearchRes = await fetch("/api/fetch-jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: jobTitle }),
          });

          if (!jobSearchRes.ok) throw new Error("Failed to fetch jobs");
          const { jobs } = await jobSearchRes.json();

          setLoadingText("Found jobs, displaying results...");
          setJobResults(jobs);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
            setError(error.message);
          } else {
            console.error("Unexpected error:", error);
            setError("An unexpected error occurred. Please try again.");
          }
        } finally {
          setLoadingText("");
          setLoading(false);
          setResumeFile(null);
        }
      };

      reader.readAsDataURL(resumeFile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error:", error);
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[26rem] sm:h-[30rem] md:h-[34rem] flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-800 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 text-center max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover Your Dream Job
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your resume, and let our AI match you to the best jobs.
          </p>
        </motion.div>
      </section>

      {/* Upload Section */}
      <section className="py-16 px-6 flex flex-col items-center justify-center">
        <div className="container p-4 mx-auto max-w-md bg-white shadow-xl rounded-2xl border border-gray-200">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center mb-4"
          >
            Upload Your Resume
          </motion.h3>

          <Typography
            variant="body2"
            sx={{
              color: "#4a5568",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            Upload your resume (PDF). Our AI will analyze your skills and
            recommend the most suitable job roles for you.
          </Typography>

          <div
            {...getRootProps()}
            className={`border-2 ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-dashed border-gray-400"
            } rounded-xl p-6 text-center cursor-pointer transition-all duration-200`}
          >
            <input {...getInputProps()} />
            <CloudUploadOutlinedIcon
              fontSize="large"
              className="text-blue-700 mb-2"
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
              sx={{ mt: 2 }}
            />
          )}

          <Button
            variant="contained"
            disabled={!resumeFile || loading}
            onClick={handleSubmit}
            sx={{
              mt: 3,
              textTransform: "none",
              borderRadius: "8px",
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
                <CircularProgress size={20} sx={{ color: "white" }} />
                {loadingText || "Finding Jobs..."}
              </span>
            ) : (
              "Find My Jobs"
            )}
          </Button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </section>

      {/* Suggested Jobs Section */}
      <section className="max-w-4xl mx-auto py-10 px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Suggested Jobs
        </h3>

        {loading && (
          <p className="text-center text-gray-600 animate-pulse">
            {loadingText || "Searching for jobs..."}
          </p>
        )}

        {!loading && jobResults.length === 0 && !error && (
          <p className="text-center text-gray-600">
            No jobs found yet. Upload your resume to get started.
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-red-600">{error}</p>
        )}

        <div className="jobs-list flex flex-col gap-6 mt-6">
          <AnimatePresence>
            {jobResults.map((job, index) => (
              <motion.div
                key={job.job_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white border border-gray-300 hover:shadow-md rounded-lg"
              >
                <div className="min-w-[60px]">
                  <Image
                    src={
                      job.employer_logo || "/images/unknown-business-logo.png"
                    }
                    alt={job.employer_name || "Company Logo"}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-900">
                    {job.job_title || "Untitled Job"}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                    <Chip
                      size="small"
                      icon={<BusinessOutlined fontSize="small" />}
                      label={job.employer_name || "Unknown Company"}
                    />
                    <Chip
                      size="small"
                      icon={<LocationOnOutlined fontSize="small" />}
                      label={
                        job.job_is_remote ? "Remote" : job.job_location || "NA"
                      }
                    />
                    <Chip
                      size="small"
                      icon={<AccessTimeOutlined fontSize="small" />}
                      label={job.job_posted_at || "NA"}
                    />
                    <Chip
                      size="small"
                      icon={<AttachMoneyOutlined fontSize="small" />}
                      label={
                        job.job_salary
                          ? `${job.job_min_salary} - ${job.job_max_salary}`
                          : "NA"
                      }
                    />
                    <Chip
                      size="small"
                      icon={<WorkOutline fontSize="small" />}
                      label={job.job_employment_types?.[0] || "NA"}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {(job.apply_options?.length ?? 0) > 0 ? (
                      job.apply_options?.map((option, idx) => {
                        const applyLink =
                          option?.apply_link ||
                          job.job_google_link ||
                          job.job_apply_link;
                        return applyLink ? (
                          <Button
                            key={idx}
                            variant="contained"
                            href={applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{
                              textTransform: "none",
                              borderRadius: "20px",
                              backgroundColor: "#084f8e",
                              "&:hover": { backgroundColor: "#06396a" },
                            }}
                          >
                            {option.publisher || "Apply Now"}
                          </Button>
                        ) : (
                          <Button
                            key={idx}
                            disabled
                            size="small"
                            sx={{ borderRadius: "20px" }}
                          >
                            Apply Unavailable
                          </Button>
                        );
                      })
                    ) : job.job_google_link || job.job_apply_link ? (
                      <Button
                        variant="contained"
                        href={job.job_google_link || job.job_apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          borderRadius: "20px",
                          backgroundColor: "#084f8e",
                        }}
                      >
                        Apply Now
                      </Button>
                    ) : (
                      <Button
                        disabled
                        size="small"
                        sx={{ borderRadius: "20px" }}
                      >
                        Apply Link Unavailable
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default JobFinder;
