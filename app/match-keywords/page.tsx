"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { getKeywordResponse } from "../utils/getKeywordResponse";
import { useState } from "react";
import { motion } from "framer-motion";
import keywordMatcherSteps from "@/data/kewordMatcherSteps";
import FeatureCard from "../components/shared/FeatureCard";

const KeywordMatcher = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Motoin Fadeup
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleClick = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setKeywords(null);

    try {
      const responseData = await getKeywordResponse(jobDescription);
      if (responseData instanceof Error) {
        setError(responseData.message);
      } else {
        setKeywords(responseData);
      }
    } catch (err) {
      if (err instanceof Error) setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <Box
        component={"section"}
        className="hero min-h-[70vh] bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 flex flex-col justify-center items-center text-center px-6"
      >
        <Typography
          variant="h2"
          component={motion.h2}
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariants}
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "2rem",
              sm: "2.8rem",
              md: "3.2rem",
              lg: "3.8rem",
              xl: "4.2rem",
            },
            color: grey[100],
          }}
          gutterBottom
        >
          AptResume&apos;s Keyword Matcher
        </Typography>

        <Typography
          component={motion.p}
          variant="body1"
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariants}
          sx={{
            maxWidth: 800,
            color: grey[400],
          }}
        >
          Paste a job description and get the best keywords to boost your resume
          and beat the ATS!
        </Typography>
      </Box>

      {/* Form Section */}
      <Box className="form-section text-black py-20 flex flex-col items-center bg-gray-50">
        <Box className="w-full max-w-4xl p-6 sm:p-8 bg-white">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.8rem", sm: "2.25rem" },
              color: "text.primary",
            }}
          >
            Enter Job Description
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 6,
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.125rem" },
            }}
          >
            Paste the job description below to extract the most relevant
            keywords for your resume.
          </Typography>

          <TextField
            multiline
            minRows={8}
            maxRows={16}
            fullWidth
            variant="outlined"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            sx={{
              backgroundColor: "#f9fafb",
              borderRadius: 3,
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <Box className="flex justify-center">
            <Button
              variant="contained"
              size="large"
              onClick={handleClick}
              disabled={isLoading || !jobDescription.trim()}
              sx={{
                width: "100%",
                px: 8,
                textTransform: "none",
                borderRadius: 2,
                backgroundColor: indigo[600],
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: indigo[700],
                },
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" />{" "}
                  <span className="ms-2">Extracting...</span>
                </>
              ) : (
                "Extract Keywords"
              )}
            </Button>
          </Box>

          {error && (
            <Alert
              severity="error"
              className="mt-6"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            >
              {error}
            </Alert>
          )}

          {keywords && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mt-10"
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "text.primary",
                }}
              >
                Extracted Keywords
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  color: "text.secondary",
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  wordBreak: "break-word",
                }}
              >
                {keywords}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box
        component="section"
        className="working-section bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 py-20 text-white"
      >
        <Box component="div" className="container mx-auto px-4">
          <Typography
            variant="h2"
            component={motion.h2}
            initial="hidden"
            whileInView="visible"
            variants={fadeUpVariants}
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "3rem",
              color: grey[100],
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            How It Works
          </Typography>

          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keywordMatcherSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <FeatureCard
                  key={index}
                  index={index}
                  Icon={Icon}
                  title={step.title}
                  description={step.description}
                />
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Purpose Section */}
      <Box className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black px-6 py-20">
        <Box className="max-w-4xl mx-auto text-center">
          <Typography
            variant="h2"
            component={motion.h2}
            initial="hidden"
            whileInView="visible"
            variants={fadeUpVariants}
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.3,
              mb: 4,
              color: "#111827",
            }}
          >
            Why Do You Need Perfect Keywords?
          </Typography>

          <Typography
            variant="body1"
            component={motion.p}
            initial="hidden"
            whileInView="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.3 }}
            sx={{
              color: grey[700],
              fontSize: "1.125rem",
              lineHeight: 1.8,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Most resumes are filtered by Applicant Tracking Systems (ATS) before
            a recruiter even sees them. Our tool analyzes job descriptions to
            identify the most relevant keywords you should include. By aligning
            your resume with these terms, you dramatically improve visibility
            and increase your chances of getting shortlisted.
          </Typography>
        </Box>
      </Box>
    </main>
  );
};

export default KeywordMatcher;
