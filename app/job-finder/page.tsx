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
import { getParsedResume } from "../utils/getParsedResume";
import getJobRole from "../utils/getJobRole";
import getJobs from "../utils/getJobs";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

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
    jobProviders: { jobProvider: string; url: string }[]; // Defining the shape of the objects inside the array
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
      setLoadingText("Uploading resume");

      if (!resumeFile) {
        throw new Error("No file selected");
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
      const jobs = await getJobs(jobRole);
      if (jobs == null || jobs.length === 0) {
        toast.error("Something went wrong try again");
      }
      setJobResults(jobs);
      setLoadingText("Finding matching jobs");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  return (
    <>
      <Header />
      <main>
        <Toaster />
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
          <div className="container p-4 mx-auto max-w-2xl">
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
                  ? "border-blue-500 bg-blue-50"
                  : "border-dashed border-gray-400"
              } rounded-md p-6 text-center cursor-pointer transition-all duration-200`}
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

            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
          </div>
        </section>

        {/* Suggested Jobs Section */}
        {jobResults.length > 0 && (
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
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-900">
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
                        {jobResults.map(
                          (jobResult, index) =>
                            jobResult.jobProviders &&
                            jobResult.jobProviders.length > 0 && (
                              <div key={index} className="flex gap-2 flex-wrap">
                                {jobResult.jobProviders.map(
                                  (provider, providerIndex) => (
                                    <Link
                                      key={providerIndex}
                                      href={provider.url}
                                      target="_blank"
                                      className="bg-blue-600 p-2 rounded text-white text-xs hover:bg-blue-700"
                                    >
                                      {provider.jobProvider}
                                    </Link>
                                  )
                                )}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default JobFinder;
