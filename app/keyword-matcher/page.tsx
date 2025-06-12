"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import Header from "../components/Header";
import { blue, grey } from "@mui/material/colors";
import { getKeywordResponse } from "../utils/getKeywordResponse";
import { useState } from "react";
import { motion } from "framer-motion";
import keywordMatcherSteps from "../data/kewordMatcherSteps";

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
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Box
          component={"section"}
          className="hero min-h-[70vh] bg-gray-950  flex flex-col justify-center items-center text-center px-6"
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
              mb: 4,
            }}
          >
            Paste a job description and get the best keywords to boost your
            resume and beat the ATS!
          </Typography>
        </Box>

        {/* Form Section */}
        <Box className="form-section text-black py-16 flex flex-col items-center">
          <Box className="w-full max-w-6xl p-4">
            <Typography
              variant="h2"
              component={"h1"}
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Enter Job Description
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              Paste the job description below to extract the most relevant
              keywords for your resume.
            </Typography>
            <TextField
              multiline
              minRows={8}
              maxRows={24}
              fullWidth
              variant="outlined"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              sx={{ backgroundColor: "#f9fafb", borderRadius: 2 }}
            />
            <Box className="flex justify-center mt-6">
              <Button
                variant="contained"
                size="large"
                onClick={handleClick}
                disabled={isLoading}
                sx={{
                  width: "100%",
                  textTransform: "none",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Extract Keywords"
                )}
              </Button>
            </Box>

            {error && (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            )}

            {keywords && (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto overflow-wrap mt-8"
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Extracted Keywords
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textOverflow: "wrap",
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
          className="working-section bg-blue-950 text-black py-16"
        >
          <Box component="div" className="container mx-auto p-4">
            <Typography
              variant="h1"
              component={motion.h1}
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 4,
                color: grey[200],
              }}
            >
              How It Works
            </Typography>
            <Box className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {keywordMatcherSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Box
                    key={index}
                    className="flex flex-col items-center gap-2 text-center p-10"
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <Icon sx={{ fontSize: 50, color: blue[100] }} />
                    <Typography
                      variant="h3"
                      sx={{
                        color: grey[50],
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: grey[200] }}>
                      {step.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Purpose Section */}
        <Box className="bg-white text-black px-6 py-16">
          <Box className="max-w-5xl mx-auto text-center">
            <Typography
              variant="h1"
              component={motion.h1}
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 4,
              }}
            >
              Why do you need perfect keywords?
            </Typography>
            <Typography
              variant="body1"
              component={motion.p}
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              sx={{ color: grey[700], fontSize: "1.1rem" }}
            >
              Many resumes get filtered out by Applicant Tracking Systems (ATS)
              even before reaching a human. The purpose of this tool is to
              analyze job descriptions and extract the most relevant keywords.
              You can use these keywords strategically in your resume to
              increase visibility and chances of selection.
            </Typography>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default KeywordMatcher;
