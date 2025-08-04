"use client";
import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import ProgressLinear from "./ProgressLinear";
import { ATSReport } from "@/types/atsReportTypes";
import {
  Check,
  DescriptionOutlined,
  EditOutlined,
  InsertDriveFileOutlined,
  StyleOutlined,
  TipsAndUpdatesOutlined,
  TipsAndUpdatesRounded,
  TuneOutlined,
  ViewListOutlined,
  WarningRounded,
} from "@mui/icons-material";
import ListBox from "../shared/ListBox";
import getFileSizeMessage from "../../utils/getFileSizeMessage";
import { motion } from "framer-motion";

const AtsContent = ({ report }: { report: ATSReport }) => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <Box component={"div"} className="ats-content flex flex-col gap-10 max-w-3xl w-full">
      {/* Tailoring Section */}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="tailoring bg-white p-6 sm:p-10 border border-gray-300 rounded-lg"
        id="tailoring"
      >
        {/* Main Heading */}
        <Box
          component={"div"}
          className="tailoring-heading flex items-center gap-2 mb-10"
        >
          <TuneOutlined fontSize="medium" className="text-blue-500" />
          <Typography
            variant="h3"
            component={"h5"}
            sx={{
              textTransform: "uppercase",
            }}
          >
            Tailoring
          </Typography>
        </Box>

        <Box className="tailoring-tip mt-6 text-gray-500">
          <Typography variant="body1" component={"p"} marginBottom={3}>
            Each resume should be tailored to the specific role you&apos;re
            applying for. Generic resumes often fail to highlight relevant
            qualifications and keywords.
          </Typography>

          <Typography variant="body1" component={"p"} marginBottom={5}>
            Carefully review the job description and align your resume by
            mirroring key terms and qualifications mentioned in the posting.
            Customize your summary and experience to reflect the employer&apos;s
            priorities.
          </Typography>
        </Box>

        {/* Score */}
        <Box
          component={"div"}
          className="score flex flex-col gap-8 mb-10 p-6 border border-gray-300 rounded-md bg-gray-50"
        >
          <Typography
            variant="h4"
            component={"h4"}
            sx={{
              textAlign: "center",
            }}
          >
            Your Resume Tailoring Score
          </Typography>
          <ProgressLinear
            value={report.breakdown_by_category.tailoring.score * 10}
          />
          {/* Feedback */}
          <Box component={"div"} className="feedback text-center italic">
            <Typography component={"p"} variant="body2">
              {report.breakdown_by_category.tailoring.feedback}
            </Typography>
          </Box>
        </Box>

        {/* Matched Keywords */}
        <Box component={"div"} className="matched-keywords mt-10">
          <Box component={"div"} className="section-heading">
            <Typography variant="h4" component={"h4"}>
              Matched Keywords
            </Typography>
          </Box>
          <Box component={"div"} className="flex flex-wrap gap-4 mt-6">
            {report.breakdown_by_category.tailoring.matched_keywords.map(
              (item, index) => {
                return <Chip key={index} variant="outlined" label={item} />;
              }
            )}
          </Box>
        </Box>
        {/* Missing Keywords */}
        <Box component={"div"} className="missing-keywords mt-10">
          <Box component={"div"} className="section-heading">
            <Typography variant="h4" component={"h4"}>
              Missing Keywords
            </Typography>
          </Box>
          <Box component={"div"} className="flex flex-wrap gap-4 mt-6">
            {report.breakdown_by_category.tailoring.missing_keywords.map(
              (item, index) => {
                return <Chip key={index} variant="outlined" label={item} />;
              }
            )}
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="content bg-white p-6 sm:p-10 border border-gray-300 rounded-lg"
        id="content"
      >
        {/* Main Heading */}
        <Box
          component={"div"}
          className="content-heading flex items-center gap-2 mb-10"
        >
          <EditOutlined fontSize="medium" className="text-green-500" />
          <Typography
            variant="h3"
            component={"h5"}
            sx={{
              textTransform: "uppercase",
            }}
          >
            Content
          </Typography>
        </Box>

        {/* TIP */}
        <Box className="content-tip mt-6 text-gray-700">
          <Typography variant="body1" component={"p"} marginBottom={3}>
            Strong content is focused, concise, and achievement-driven. Avoid
            vague responsibilities or filler phrases.
          </Typography>

          <Typography variant="body1" component={"p"} marginBottom={5}>
            Use action verbs and quantify results whenever possible (e.g.,
            “Increased sales by 25%” instead of “Responsible for sales”). Limit
            your resume to the most recent 10–15 years of experience and ensure
            relevance to the job. priorities.
          </Typography>
        </Box>

        {/* Score */}
        <Box
          component={"div"}
          className="score flex flex-col gap-8 mb-10 p-6 border border-gray-300 rounded-md bg-gray-50"
        >
          <Typography
            variant="h4"
            component={"h4"}
            sx={{
              textAlign: "center",
            }}
          >
            Your Resume Content Score
          </Typography>
          <ProgressLinear
            value={report.breakdown_by_category.content.score * 10}
          />
          {/* Feedback */}
          <Box component={"div"} className="feedback text-center italic">
            <Typography component={"p"} variant="body2">
              {report.breakdown_by_category.tailoring.feedback}
            </Typography>
          </Box>
        </Box>

        {/* Skills Matched */}
        <Box component={"div"} className="matched-keywords">
          <Box component={"div"} className="section-heading mt-10">
            <Typography variant="h4" component={"h4"}>
              Skills Matched
            </Typography>
          </Box>
          <Box component={"div"} className="flex flex-wrap gap-4 mt-6">
            {report.breakdown_by_category.content.skills_matched.map(
              (item, index) => {
                return <Chip key={index} variant="outlined" label={item} />;
              }
            )}
          </Box>
        </Box>

        {/* Missing Skills */}
        {report.breakdown_by_category.content.skills_missing.length > 0 && (
          <Box component={"div"} className="missing-keywords mt-10">
            <Box component={"div"} className="section-heading mt-10">
              <Typography variant="h4" component={"h4"}>
                Missing Skills
              </Typography>
            </Box>
            <Box component="div" className="flex flex-wrap gap-4 mt-6">
              {report.breakdown_by_category.content.skills_missing.map(
                (item, index) => (
                  <Chip
                    key={index}
                    variant="outlined"
                    color="error"
                    label={item}
                  />
                )
              )}
            </Box>
          </Box>
        )}

        {/* Achievments Identified */}
        <Box component={"div"} className="achievments mt-10">
          <Typography variant="h4" component={"h4"}>
            Achievements Identified
          </Typography>

          <Box
            component={"div"}
            className="achievements-items flex flex-wrap gap-4 mt-6"
          >
            {report.breakdown_by_category.content.achievements_identified.map(
              (item, index) => {
                return <Chip key={index} variant="outlined" label={item} />;
              }
            )}
          </Box>
        </Box>

        {/* Certification */}
        <Box component={"div"} className="certifications mt-10">
          {report.breakdown_by_category.content.certifications.found.length >
          0 ? (
            <ListBox
              classname=""
              title="Certification"
              icon={Check}
              items={report.breakdown_by_category.content.certifications.found}
              iconColor="text-emerald-600"
            />
          ) : (
            <Box className="certification-feedback flex items-center gap-3">
              <WarningRounded color="action" />
              <Typography component="p" fontStyle={"oblique"} variant="body1">
                {report.breakdown_by_category.content.certifications.feedback}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Format Section */}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="style bg-white p-6 sm:p-10 border border-gray-300 rounded-lg"
        id="format"
      >
        {/* Main Heading */}
        <Box
          component={"div"}
          className="format-heading flex items-center gap-2 mb-10"
        >
          <DescriptionOutlined fontSize="medium" className="text-amber-500" />
          <Typography
            variant="h3"
            component={"h5"}
            sx={{
              textTransform: "uppercase",
            }}
          >
            Format
          </Typography>
        </Box>

        <Box className="format-tip mt-6 text-gray-700">
          <Typography variant="body1" component={"p"} marginBottom={3}>
            Your resume formatting plays a critical role in how well it is
            parsed by an Applicant Tracking System (ATS). ATS-friendly resumes
            should avoid complex designs, images, tables, and columns that can
            confuse parsing algorithms.
          </Typography>

          <Typography variant="body1" component={"p"} marginBottom={5}>
            Stick to a clean, single-column layout with clear headings and
            simple formatting. Avoid headers, footers, and embedded images to
            maximize ATS compatibility.
          </Typography>
        </Box>

        {/* Score */}
        <Box
          component={"div"}
          className="score flex flex-col gap-8 p-6 border border-gray-300 rounded-md bg-gray-50 mb-10"
        >
          <Typography
            variant="h4"
            component={"h4"}
            sx={{
              textAlign: "center",
            }}
          >
            Your Resume Format Score
          </Typography>
          <ProgressLinear
            value={report.breakdown_by_category.format.score * 10}
          />
          {/* Feedback */}
          <Box component={"div"} className="feedback text-center italic">
            <Typography component={"p"} variant="body2">
              {report.breakdown_by_category.format.feedback}
            </Typography>
          </Box>
        </Box>

        <Box
          component={"div"}
          className="fileDetails bg-gray-50 flex flex-col items-center justify-center gap-8 border border-gray-300 p-4 sm:p-10 rounded-md mb-10"
        >
          <InsertDriveFileOutlined
            color="primary"
            sx={{
              fontSize: "5rem",
            }}
          />

          <Typography
            sx={{
              width: "100%",
              maxWidth: "720px",
              textAlign: "center",
            }}
          >
            {getFileSizeMessage(report.breakdown_by_category.format.file_size)}
          </Typography>
        </Box>

        {/* Guidelines */}
        <Box component={"div"} className="guidelines">
          {/* Heading */}
          <Typography variant="h4" component={"h4"} fontWeight={"bold"} mb={1}>
            Important Guidelines
          </Typography>

          {/* Guidelines Text*/}
          <Typography
            variant="body2"
            color={"textSecondary"}
            component={"p"}
            marginBottom={5}
          >
            Resumes should be submitted in <strong>PDF, DOC, or DOCX</strong>
            format. PDF is the preferred format due to its consistent formatting
            across platforms and high compatibility with Applicant Tracking
            Systems (ATS). DOC and DOCX formats are acceptable alternatives but
            may exhibit minor formatting differences depending on the software
            used. File types such as <strong>JPG, PNG, TXT, ODT, or RTF</strong>
            should be avoided, as they are not reliably parsed by most
            recruitment systems. Resume files must not be password-protected and
            should not exceed 1MB in size to ensure optimal upload performance
            and system compatibility.
          </Typography>
        </Box>
      </Box>

      {/* Sections */}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="style bg-white p-6 sm:p-10 border border-gray-300 rounded-lg"
        id="sections"
      >
        {/* Main Heading */}
        <Box
          component={"div"}
          className="sections-heading flex items-center gap-2 mb-10"
        >
          <ViewListOutlined fontSize="medium" className="text-purple-500" />
          <Typography
            variant="h3"
            component={"h5"}
            sx={{
              textTransform: "uppercase",
            }}
          >
            Sections
          </Typography>
        </Box>

        <Box component={"div"} className="sections-tip mt-6 text-gray-700">
          <Typography variant="body1" component={"p"} marginBottom={3}>
            Organize your resume into clear, logically ordered sections that ATS
            software can recognize.
          </Typography>

          <Typography variant="body1" component={"p"} marginBottom={5}>
            Include the following key sections: Contact Information,
            Professional Summary or Objective, Skills or Core Competencies, Work
            Experience, Education, and optionally, Certifications, Awards, or
            Projects.
          </Typography>
        </Box>

        {/* Score */}
        <Box
          component={"div"}
          className="score flex flex-col gap-8 p-6 border border-gray-300 rounded-md bg-gray-50 mb-10 "
        >
          <Typography
            variant="h4"
            component={"h4"}
            sx={{
              textAlign: "center",
            }}
          >
            Your Resume Secions Score
          </Typography>
          <ProgressLinear
            value={report.breakdown_by_category.style.score * 10}
          />
          {/* Feedback */}
          <Box component={"div"} className="feedback text-center italic">
            <Typography component={"p"} variant="body2">
              {report.breakdown_by_category.style.feedback}
            </Typography>
          </Box>
        </Box>

        {/* Present Sections */}
        <Box component={"div"} className="present-sections mt-10">
          <Typography variant="h4" component={"h4"}>
            Present Sections
          </Typography>

          <Box
            component={"div"}
            className="sections-present flex flex-wrap gap-4 mt-6"
          >
            {report.breakdown_by_category.sections.required_sections_present.map(
              (item, index) => {
                return (
                  <Chip
                    key={index}
                    variant="outlined"
                    label={item}
                    color="success"
                  />
                );
              }
            )}
          </Box>
        </Box>

        {/* Missing Sections */}
        {report.breakdown_by_category.sections.missing_sections.length > 0 && (
          <Box component={"div"} className="missing-sections mt-10">
            <Typography variant="h4" component={"h4"}>
              Missing sections
            </Typography>

            <Box
              component={"div"}
              className="sections-missing flex flex-wrap gap-4 mt-6"
            >
              {report.breakdown_by_category.sections.missing_sections.map(
                (item, index) => {
                  return (
                    <Chip
                      key={index}
                      variant="outlined"
                      label={item}
                      color="error"
                    />
                  );
                }
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Style Section */}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="style bg-white p-6 sm:p-10 border border-gray-300 rounded-lg"
        id="style"
      >
        {/* Main Heading */}
        <Box className="style-heading flex items-center gap-2 mb-10">
          <StyleOutlined fontSize="medium" className="text-rose-500" />
          <Typography
            variant="h3"
            component="h5"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Style
          </Typography>
        </Box>

        {/* Description */}
        <Box className="style-tip mt-6 text-gray-700">
          <Typography variant="body1" component="p" marginBottom={3}>
            Maintain a consistent, professional writing style with clear,
            concise language. Use active voice, bullet points, and appropriate
            tense.
          </Typography>
        </Box>

        {/* Score */}
        <Box className="score flex flex-col gap-8 p-6 border border-gray-300 rounded-md bg-gray-50 mb-10 ">
          <Typography
            variant="h4"
            component={"h4"}
            sx={{
              textAlign: "center",
            }}
          >
            Your Resume Styling Score
          </Typography>
          <ProgressLinear
            value={report.breakdown_by_category.style.score * 10}
          />
          {/* Feedback */}
          <Box className="feedback text-center italic">
            <Typography component="p" variant="body2">
              {report.breakdown_by_category.style.feedback}
            </Typography>
          </Box>
        </Box>

        {/* Style Attributes */}
        <Box className="style-attributes mt-10">
          <Typography variant="h4">Writing Style Attributes</Typography>
          <Box className="attributes flex flex-wrap gap-4 mt-4">
            <Chip
              label={`Font Consistency: ${
                report.breakdown_by_category.style.font_consistency
                  ? "Yes"
                  : "No"
              }`}
              color={
                report.breakdown_by_category.style.font_consistency
                  ? "success"
                  : "error"
              }
              variant="outlined"
            />

            <Chip
              label={`Bullet Points Used: ${
                report.breakdown_by_category.style.bullet_points_used
                  ? "Yes"
                  : "No"
              }`}
              color={
                report.breakdown_by_category.style.bullet_points_used
                  ? "success"
                  : "error"
              }
              variant="outlined"
            />
            <Chip
              label={`Tense Consistency: ${
                report.breakdown_by_category.style.tense_consistency
                  ? "Yes"
                  : "No"
              }`}
              color={
                report.breakdown_by_category.style.tense_consistency
                  ? "success"
                  : "error"
              }
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Readability Feedback */}
        <Box className="readability-feedback p-6 border border-gray-300 rounded-md bg-gray-50 mt-10">
          <Typography
            variant="h4"
            sx={{ marginBottom: 4, textAlign: "center" }}
          >
            Readability Feedback
          </Typography>
          <Typography variant="body1" component="p" marginBottom={1}>
            <span>Sentence Complexity:</span>
            <span className="ms-2 text-gray-600">
              {
                report.breakdown_by_category.style.readability_feedback
                  .sentence_complexity
              }
            </span>
          </Typography>
          <Typography variant="body1" component="p" marginBottom={1}>
            <span>Passive Voice Usage:</span>
            <span className="ms-2 text-gray-600">
              {
                report.breakdown_by_category.style.readability_feedback
                  .passive_voice_usage
              }
            </span>
          </Typography>

          {/* Recommendations */}
          {report.breakdown_by_category.style.readability_feedback
            .recommendations?.length > 0 && (
            <Box className="recommendations mt-4">
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 1 }}
              >
                Recommendations:
              </Typography>
              <ul className="list-disc list-inside text-gray-700">
                {report.breakdown_by_category.style.readability_feedback.recommendations.map(
                  (rec, idx) => (
                    <li key={idx}>{rec}</li>
                  )
                )}
              </ul>
            </Box>
          )}
        </Box>
      </Box>

      {/* Tips Section */}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="recommendations bg-white p-6 sm:p-10 border border-gray-300 rounded-lg"
        id="recommendations"
      >
        {/* Main Heading */}
        <Box
          component={"div"}
          className="recommendation-heading flex items-center gap-2 mb-10"
        >
          <TipsAndUpdatesOutlined
            fontSize="medium"
            sx={{
              color: "orange",
            }}
          />
          <Typography
            variant="h3"
            component={"h5"}
            sx={{
              textTransform: "uppercase",
            }}
          >
            Tips
          </Typography>
        </Box>

        <Box component="div" className="tips-grid">
          <Grid container spacing={2}>
            {report.recommendations_for_ats_optimization.map((item, index) => (
              <Grid key={index}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "flex-start",
                    gap: 1,
                    backgroundColor: "#fff8e1",
                    padding: 2,
                    borderRadius: 2,
                    border: "1px solid #fcd34d",
                  }}
                >
                  <TipsAndUpdatesRounded
                    fontSize="small"
                    sx={{ color: "#f59e0b" }}
                  />
                  <Typography fontSize="0.95rem" color="text.primary">
                    {item}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AtsContent;
