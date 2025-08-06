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
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import keywordMatcherSteps from "@/data/kewordMatcherSteps";
import FeatureCard from "../components/shared/FeatureCard";
import HeroSection from "../components/layout/HeroSection";
import { ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import AccordionComponent from "../components/shared/AccordionComponent";
import keywordsFaqData from "@/data/keywordsFaqData";
import SectionSummary from "../components/shared/SectionSummary";
import { container, fadeUp } from "@/ui/animations";

const KeywordExtractor = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploaderRef = useRef<HTMLElement>(null);

  const heroContent = {
    headline: "Unlock Your Dream Job with ATS-Optimized Keywords",
    supportingText:
      "Boost your resume’s visibility with AI-driven keyword suggestions tailored to job descriptions, ensuring you pass ATS filters and impress employers.",
    image: "/images/keyword-matcher-hero-image.png",
    imageAlt: "ATS Keyword Optimization",
    buttonText: "Upload Job Description",
  };

  const scrollToUploader = () => {
    uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
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
    } catch (error) {
      if (error instanceof ApiError)
        setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        headline={heroContent.headline}
        supportingText={heroContent.supportingText}
        image={heroContent.image}
        imageAlt={heroContent.imageAlt}
        buttonText={heroContent.buttonText}
        handleScroll={scrollToUploader}
      />

      {/* Form Section */}
      <Box
        component="section"
        className="form-section bg-white text-black py-16 sm:py-24 flex flex-col items-center"
        ref={uploaderRef}
      >
        <Box component="div" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 3,
              fontSize: { xs: "2.25rem", sm: "3rem" },
              color: "text.primary",
              letterSpacing: "-0.025em",
            }}
          >
            Job Description Keyword Extractor
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 6,
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.125rem" },
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Paste the job description below to identify and extract the most
            relevant keywords for optimizing your resume.
          </Typography>

          <Box className="input w-full max-w-4xl p-6 sm:p-10">
            <TextField
              multiline
              minRows={8}
              maxRows={20}
              fullWidth
              variant="outlined"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              aria-label="Job description input"
              sx={{
                mb: 5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": {
                    borderColor: "grey.300",
                  },
                  "&:hover fieldset": {
                    borderColor: indigo[400],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: indigo[600],
                  },
                },
              }}
            />

            <Box className="flex justify-center gap-2">
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={isLoading || !jobDescription.trim()}
                sx={{
                  px: { xs: 4, sm: 8 },
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                  backgroundColor: indigo[500],
                  boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: indigo[700],
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.400",
                    boxShadow: "none",
                  },
                }}
              >
                {isLoading ? (
                  <Box className="flex items-center">
                    <CircularProgress size={24} color="inherit" />
                    <span className="ml-3">Extracting...</span>
                  </Box>
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
                sx={{
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor: "#fef2f2",
                  borderColor: "#f87171",
                }}
              >
                {error}
              </Alert>
            )}

            {keywords && (
              <Box className="max-w-4xl mx-auto mt-10">
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    color: "text.primary",
                    textAlign: "center",
                  }}
                >
                  Extracted Keywords
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    color: "text.secondary",
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    lineHeight: 1.7,
                    wordBreak: "break-word",
                    backgroundColor: "#f8fafc",
                    p: 4,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                  }}
                >
                  {keywords}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box
        component="section"
        className="working-section bg-gradient-to-br from-indigo-50 to-blue-50"
      >
        <Box component="div" className="container max-w-7xl mx-auto py-20 px-4">
          <SectionSummary
            headline="How our AI-powered keyword extractor works"
            supportingText="Effortlessly uncover key insights with our AI-powered keyword extractor"
          />

          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center mx-auto">
            {keywordMatcherSteps.map(
              ({ Icon, iconBgColor, title, description }, index) => {
                return (
                  <FeatureCard
                    key={index}
                    index={index}
                    Icon={Icon}
                    iconBgColor={iconBgColor}
                    title={title}
                    description={description}
                  />
                );
              }
            )}
          </Box>
        </Box>
      </Box>

      {/* Purpose Section */}
      <Box
        component="section"
        className="bg-white text-black px-4 sm:px-6 py-16 sm:py-24"
        aria-labelledby="keyword-importance-heading"
      >
        <Box
          component={motion.div}
          className="container items-start max-w-7xl mx-auto flex flex-col md:flex-row gap-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Image */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <Image
              src={"/images/keywords-importance.png"}
              alt="Importance of keywords"
              width={600}
              height={600}
              className="rounded-2xl object-cover"
            />
          </Box>

          <Box className="content w-full md:w-1/2 text-left">
            <Typography
              variant="h2"
              component={motion.h2}
              variants={fadeUp}
              id="keywords-importance-heading"
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                lineHeight: 1.2,
                mb: 5,
                color: grey[800],
                letterSpacing: "-0.025em",
              }}
            >
              Why Perfect Keywords Are Essential for Your Resume
            </Typography>

            <Typography
              variant="body1"
              component={motion.p}
              variants={fadeUp}
              sx={{
                color: grey[700],
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                lineHeight: 1.7,
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
                opacity: 0.9,
              }}
            >
              In today’s competitive job market, most companies use Applicant
              Tracking Systems (ATS) to screen resumes before they ever reach a
              human recruiter. These systems scan for specific keywords that
              match the job description, filtering out candidates who don’t
              align closely with the role’s requirements. Without the right
              keywords, even the most qualified candidates risk being
              overlooked.
            </Typography>

            <Typography
              variant="body1"
              component={motion.p}
              variants={fadeUp}
              sx={{
                color: grey[700],
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                lineHeight: 1.7,
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
                opacity: 0.9,
              }}
            >
              Our advanced keyword extraction tool analyzes job descriptions to
              identify the most relevant terms and phrases, such as required
              skills, qualifications, and industry-specific jargon. By
              integrating these keywords into your resume, you ensure it aligns
              with what employers and ATS systems are looking for, significantly
              increasing your chances of passing the initial screening and
              landing an interview.
            </Typography>

            <Typography
              variant="body1"
              component={motion.p}
              variants={fadeUp}
              sx={{
                color: grey[700],
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                lineHeight: 1.7,
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Beyond ATS optimization, using precise keywords showcases your
              understanding of the role and industry, making your application
              stand out to recruiters. Our tool simplifies this process, saving
              you time and effort while helping you craft a resume that speaks
              directly to the job you want. Start optimizing your resume today
              to unlock more opportunities!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Faqs */}
      <Box
        component={"section"}
        className="bg-gradient-to-br from-indigo-50 to-blue-50"
      >
        <Box
          component={"div"}
          className="container max-w-7xl mx-auto py-20 px-4"
        >
          <Typography
            variant="h2"
            component={motion.h2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: { opacity: 1, scale: 1 },
            }}
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "3rem",
              color: grey[900],
              fontSize: { xs: "2.25rem", sm: "3rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Box
            component={"div"}
            className="faq-accordion max-w-5xl mx-auto space-y-6"
          >
            {keywordsFaqData.map((faq, index) => (
              <AccordionComponent
                question={faq.question}
                answer={faq.answer}
                key={index}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default KeywordExtractor;
