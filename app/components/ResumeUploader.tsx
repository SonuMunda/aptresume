"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { Clear, InsertDriveFileRounded } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { motion } from "framer-motion";

interface ResumeUploaderProps {
  handleFileUpload: (file: File) => void;
  loading: boolean;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  handleFileUpload,
  loading,
}) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setResumeFile(file);
    } else {
      toast.error("Unsupported file type");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="uploader space-y-6 w-full max-w-xl mx-auto p-10 bg-white rounded text-center"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 rounded cursor-pointer select-none transition-colors duration-300 ${
          isDragActive
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-25"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <CloudUploadIcon
            style={{
              fontSize: 64,
              color: isDragActive ? "#10b981" : "#6b7280",
              transition: "color 0.3s ease",
            }}
          />
          <p className="mt-6 text-gray-700  md:text-lg">
            {isDragActive
              ? "Drop the file here..."
              : "Drag and drop your resume here, or click to select"}
          </p>
          <em className="text-sm text-gray-500 mt-2">
            Only .pdf, .doc, and .docx files accepted
          </em>
        </div>
      </div>

      {resumeFile && (
        <div className="relative flex items-center justify-between p-3 bg-white border border-gray-300 rounded mx-auto">
          <div className="flex items-center gap-4">
            <div className="icon p-2 text-gray-600 bg-white border border-gray-300 rounded">
              <InsertDriveFileRounded className="text-3xl" />
            </div>
            <div className="details text-left">
              <p className="text-sm text-gray-800 font-medium">
                {resumeFile.name}
              </p>
              <p className="text-gray-500 text-xs">
                {(resumeFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <div
            className="remove-btn absolute right-2 top-2"
            onClick={() => setResumeFile(null)}
          >
            <button
              className="text-gray-500 hover:text-red-600 transition-colors duration-200"
              aria-label="Remove file"
            >
              <Clear
                sx={{
                  fontSize: 20,
                }}
              />
            </button>
          </div>
        </div>
      )}

      <div className="upload-button">
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            width: "100%",
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: indigo[500],
            "&:hover": { backgroundColor: indigo[700] },
          }}
          disabled={!resumeFile || loading}
          onClick={() => resumeFile && handleFileUpload(resumeFile)}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload Resume"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ResumeUploader;
