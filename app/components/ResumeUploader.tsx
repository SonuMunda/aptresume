"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Chip, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

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
    <section className="py-16 px-4 flex justify-center">
      <div className="w-full max-w-3xl p-8 bg-gray-50 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Upload Your Resume
        </h2>
        <p className="text-gray-600 mb-6">Supported formats: PDF, DOC, DOCX</p>

        <div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-lg cursor-pointer select-none transition-colors duration-300 ${
              isDragActive
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <CloudUploadIcon
                style={{
                  fontSize: 60,
                  color: isDragActive ? "#10b981" : "#9ca3af",
                  transition: "color 0.3s ease",
                }}
              />
              <p className="mt-4 text-gray-700">
                {isDragActive
                  ? "Drop the file here ..."
                  : "Drag and drop your resume here, or click to select a file"}
              </p>
              <em className="text-sm text-gray-400 mt-2">
                Only .pdf, .doc, and .docx files accepted
              </em>
            </div>
          </div>
        </div>

        {resumeFile && (
          <Chip
            label={resumeFile.name}
            color="primary"
            variant="outlined"
            icon={<UploadFileIcon />}
            sx={{ mt: 2, px: 2, borderRadius: "4px" }}
          />
        )}

        <div className="mt-6">
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", width: "100%" }}
            disabled={!resumeFile || loading}
            onClick={() => resumeFile && handleFileUpload(resumeFile)}
          >
            {loading ? (
              <CircularProgress
                size={28}
                color="inherit"
              />
            ) : (
              "Upload Resume"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResumeUploader;
