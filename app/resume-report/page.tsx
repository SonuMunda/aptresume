"use client";

import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import result from "../data/atsResult";
import {
  BarChart,
  Check,
  Clear,
  Feedback,
  Info,
  Insights,
  TipsAndUpdates,
  ManageSearch,
  PriorityHighRounded,
  Article,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { blue, grey, orange } from "@mui/material/colors";
import ProgressLinear from "../components/ProgressLinear";
import ListBox from "../components/ListBox";
import AtsResultSidebar from "../components/AtsResultSidebar";
import AtsResultResponsiveMenu from "../components/AtsResultResponsiveMenu";
import AtsResultLoader from "../components/AtsResultLoader";
import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { getResume } from "../utils/getResume";
import { getParsedResume } from "../utils/getParsedResume";
import { getResumeAtsReport } from "../utils/getResumeAtsReport";
import ResumeNotFound from "../components/AtsNotFoundPage";


const Page = () => {
  const [atsResult, setAtsResult] = useState<object | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const id = searchParams.get("id");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    viewport: { once: false },
  };

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setError("Please Upload Resume")
    }
    const fetchReport = async () => {
      try {
        
        const url = await getResume(id);
        const parsedResume = await getParsedResume(url);
        const resumeText = await parsedResume?.text;
        const report = await getResumeAtsReport(resumeText);
        setAtsResult(report?.data?.result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if(loading) return <AtsResultLoader/>

  if(error) return <ResumeNotFound/>

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      <Box className="container mx-auto">
          <Box className="result-content relative md:max-w-6xl mx-auto md:p-10 flex gap-10">
            {/* Sidebar */}
            <AtsResultSidebar score={atsResult?.overallScore} />

            {/* Main Content */}
            <Box className="main-content w-full p-4 bg-gray-200 rounded-md shadow">
              <Box className="main-body">
                {/* Header */}
                <Box className="main-headings">
                  <Typography
                    variant="h5"
                    className="text-gray-800"
                    sx={{ mt: 2 }}
                  >
                    Resume Analysis Report
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-gray-600"
                    sx={{ mb: 2 }}
                  >
                    Here is a summary of your resume analysis report.
                  </Typography>
                </Box>

                <Box className="ats-results grid gap-8">
                  {/* ATS Compatibility */}
                  <Box
                    className="ats-compatibility flex flex-col gap-6 p-4 md:p-8 bg-white rounded-md shadow-md"
                    id="ats"
                    component={motion.div}
                    variants={fadeInUp}
                  >
                    <Box className="flex items-center gap-2">
                      <ManageSearch sx={{ color: "primary.main" }} />
                      <Typography
                        variant="h6"
                        className="uppercase"
                        sx={{ color: "text.primary", fontWeight: "bold" }}
                      >
                        ATS Compatibility
                      </Typography>
                    </Box>

                    <Box className="bg-gray-50 grid gap-6 p-6 border border-gray-300 rounded-md shadow">
                      <Typography
                        variant="h6"
                        className="uppercase mb-4 flex items-center gap-2"
                        sx={{ color: "text.primary", fontWeight: "bold" }}
                      >
                        Compatibility
                      </Typography>

                      <ProgressLinear
                        value={atsResult?.atsCompatibility.score}
                      />

                      <Typography
                        variant="h6"
                        sx={{
                          color: "#0b855d",
                          fontWeight: "bold",
                          mt: 1,
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                      >
                        Great!
                      </Typography>

                      <Typography variant="body1" color="text.secondary">
                        We parsed your resume successfully. Your ATS score is
                        <span className="mx-1 font-bold text-black">
                          {atsResult?.atsCompatibility.score}
                        </span>
                        out of 100. This score is based on the keywords and
                        formatting of your resume.
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Keyword Matched */}
                    <Box
                      id="keyword-matched"
                      className="keywords-matched bg-gray-50 p-6 border border-gray-300 rounded-md shadow"
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                      >
                        Keyword Matched
                      </Typography>

                      <Box className="flex flex-wrap gap-2 mt-3">
                        {atsResult?.atsCompatibility.keywordMatch.map(
                          (keyword, index) => (
                            <Chip
                              key={index}
                              label={keyword}
                              color="success"
                              sx={{
                                color: "#0b855d",
                                borderRadius: "4px",
                              }}
                              variant="outlined"
                            />
                          )
                        )}
                      </Box>
                    </Box>

                    {/* Missing Keywords */}
                    <Box
                      id="keyword-missing"
                      className="keywords-missing bg-gray-50 p-6 border border-gray-300 rounded-md shadow"
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                      >
                        Missing Keywords
                      </Typography>

                      <Box className="flex flex-wrap gap-2 mt-3">
                        {atsResult?.atsCompatibility.missingKeywords.map(
                          (keyword, index) => (
                            <Chip
                              key={index}
                              label={keyword}
                              color="error"
                              sx={{
                                color: "#ff2056",
                                borderRadius: "4px",
                              }}
                              variant="outlined"
                            />
                          )
                        )}
                      </Box>
                    </Box>

                    {/* Suggestions */}
                    <Box
                      id="suggesions"
                      className="bg-gray-50 p-6 border border-gray-300 rounded-md shadow"
                    >
                      <Box className="flex items-center gap-2">
                        <TipsAndUpdates sx={{ color: "#f57c00" }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Suggestions
                        </Typography>
                      </Box>

                      <Box className="mt-3 flex flex-col gap-2">
                        {atsResult?.atsCompatibility.suggestions.map(
                          (suggesion, index) => (
                            <Box key={index} className="flex items-start gap-2">
                              <TipsAndUpdates
                                fontSize="small"
                                sx={{ color: "#9e9e9e", mt: 0.5 }}
                              />
                              <Typography variant="body2">
                                {suggesion}
                              </Typography>
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>

                    {/* ATS Meaning */}
                    <Box className="ats-meaning bg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                      <Box className="flex items-center gap-2 mb-2">
                        <Info color="info" />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          What is ATS Compatibility?
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        ATS (Applicant Tracking System) compatibility ensures
                        your resume can be easily read and parsed by software
                        used by recruiters.
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2"
                        color="text.secondary"
                      >
                        Many companies use ATS to filter and rank job
                        applications. A well-formatted, ATS-friendly resume
                        increases your chances of passing this initial
                        screening.
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content Analysis */}
                  <Box
                    className="content-analysis flex flex-col gap-6 p-4 md:p-8 bg-white rounded-md shadow-md"
                    id="content"
                    component={motion.div}
                    variants={fadeInUp}
                  >
                    <Box className="flex items-center gap-2">
                      <Article
                        sx={{
                          color: grey[800],
                        }}
                      />
                      <Typography
                        variant="h6"
                        className="uppercase"
                        sx={{ color: "text.primary", fontWeight: "bold" }}
                      >
                        Content
                      </Typography>
                    </Box>

                    {/* Structure */}
                    <Box className="structure grid gap-6 bg-gray-50 p-3 md:p-6 rounded-md border border-gray-300">
                      <Box className="flex items-center gap-2">
                        <BarChart color="primary" />
                        <Typography
                          variant="h6"
                          className="uppercase"
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Structure
                        </Typography>
                      </Box>
                      <ProgressLinear
                        value={atsResult?.contentAnalysis.structure.score}
                      />
                      <Divider />
                      <Box className="feedback bg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                        <Box className="flex items-center gap-2 mb-1">
                          <Feedback color="info" />
                          <Typography variant="subtitle1">Feedback</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {atsResult?.contentAnalysis.structure.feedback}
                        </Typography>
                      </Box>
                      <Box className="suggesstions bg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                        <Box className="flex items-center gap-2 mb-1">
                          <Typography
                            variant="h6"
                            className="uppercase"
                            sx={{ color: "text.primary", fontWeight: "bold" }}
                          >
                            Improvements Needed
                          </Typography>
                        </Box>
                        <List dense>
                          {atsResult?.contentAnalysis.structure.improvements.map(
                            (improvement, index) => (
                              <ListItem key={index} disablePadding>
                                <ListItemIcon>
                                  <TipsAndUpdates color="disabled" />
                                </ListItemIcon>
                                <ListItemText primary={improvement} />
                              </ListItem>
                            )
                          )}
                        </List>
                      </Box>
                    </Box>

                    {/* Clarity */}
                    <Box className="clarity grid gap-6 bg-gray-50 p-3 md:p-6 rounded-md border border-gray-300">
                      <Box className="flex items-center gap-2">
                        <BarChart color="primary" />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Clarity
                        </Typography>
                      </Box>
                      <ProgressLinear
                        value={atsResult?.contentAnalysis.clarity.score}
                      />
                      <Divider />
                      <Box className="feedback mbg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                        <Box className="flex items-center gap-2 mb-1">
                          <Feedback color="info" />
                          <Typography variant="subtitle1">Feedback</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {atsResult?.contentAnalysis.clarity.feedback}
                        </Typography>
                      </Box>
                      <Box className="suggesstions bg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                        <Box className="flex items-center gap-2 mb-1">
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Improvements Needed
                          </Typography>
                        </Box>
                        <List dense>
                          {atsResult?.contentAnalysis.clarity.improvements.map(
                            (improvement, index) => (
                              <ListItem key={index} disablePadding>
                                <ListItemIcon>
                                  <TipsAndUpdates color="disabled" />
                                </ListItemIcon>
                                <ListItemText primary={improvement} />
                              </ListItem>
                            )
                          )}
                        </List>
                      </Box>
                    </Box>

                    {/* Impact */}
                    <Box className="impact grid gap-6 bg-gray-50 p-3 md:p-6 rounded-md border border-gray-300">
                      <Box className="flex items-center gap-2">
                        <BarChart color="primary" />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Impact
                        </Typography>
                      </Box>
                      <ProgressLinear
                        value={atsResult?.contentAnalysis.impact.score}
                      />
                      <Divider />
                      <Box className="feedback bg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                        <Box className="flex items-center gap-2 mb-1">
                          <Feedback color="info" />
                          <Typography variant="subtitle1">Feedback</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {atsResult?.contentAnalysis.impact.feedback}
                        </Typography>
                      </Box>
                      <Box className="suggesstions bg-gray-50 p-6 border border-gray-300 rounded-md shadow">
                        <Box className="flex items-center gap-2 mb-1">
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Improvements Needed
                          </Typography>
                        </Box>
                        <List dense>
                          {atsResult?.contentAnalysis.impact.improvements.map(
                            (improvement, index) => (
                              <ListItem key={index} disableGutters>
                                <ListItemIcon>
                                  <TipsAndUpdates color="disabled" />
                                </ListItemIcon>
                                <ListItemText primary={improvement} />
                              </ListItem>
                            )
                          )}
                        </List>
                      </Box>
                    </Box>
                  </Box>

                  {/* Insights */}
                  <Box
                    className="insights flex flex-col gap-6 p-4 md:p-8 bg-white rounded-md shadow-md"
                    id="insights"
                    component={motion.div}
                    variants={fadeInUp}
                  >
                    <Box className="flex items-center gap-2">
                      <Insights sx={{ color: blue[600] }} />
                      <Typography
                        variant="h6"
                        className="uppercase"
                        sx={{ color: "text.primary", fontWeight: "bold" }}
                      >
                        Insights
                      </Typography>
                    </Box>

                    <Box className="grid gap-6 mt-6">
                      {/* Strengths */}
                      <ListBox
                        title="Strengths"
                        classname="strengths"
                        items={atsResult?.keyFindings.strengths}
                        icon={Check}
                        iconColor="text-emerald-600"
                      />

                      {/* Weaknesses */}
                      <ListBox
                        title="Weaknesses"
                        classname="weaknesses"
                        items={atsResult?.keyFindings.weaknesses}
                        icon={Clear}
                        iconColor="text-rose-600"
                      />

                      {/* Opportunities */}
                      <ListBox
                        title="Opportunities"
                        classname="opportunities"
                        items={atsResult?.keyFindings.opportunities}
                        icon={TipsAndUpdates}
                        iconColor="text-amber-500"
                      />
                    </Box>
                  </Box>

                  {/* Job Fit Analysis */}
                  <Box
                    className="job-fit-analysis flex flex-col gap-6 p-4 md:p-8 bg-white rounded-md shadow-md"
                    id="jobfit"
                    component={motion.div}
                    variants={fadeInUp}
                  >
                    <Box className="flex items-center gap-2">
                      <TipsAndUpdates sx={{ color: orange[700] }} />
                      <Typography
                        variant="h6"
                        className="uppercase"
                        sx={{ color: "text.primary", fontWeight: "bold" }}
                      >
                        Job Fit Analysis
                      </Typography>
                    </Box>

                    {/* Relevance Score */}
                    <Box className="relevance-score">
                      <ProgressLinear
                        value={atsResult?.jobFitAnalysis.relevanceScore}
                      />

                      <Typography
                        variant="body2"
                        sx={{ color: grey[600], mt: 1 }}
                      >
                        This score indicates how well your resume aligns with
                        the job description.
                      </Typography>
                    </Box>
                    <Divider />

                    {/* Matched Qualifications */}
                    <ListBox
                      title="Matched Qualifications"
                      classname="qualification-details"
                      items={atsResult?.jobFitAnalysis.matchedQualifications}
                      icon={Check}
                      iconColor="text-emerald-600"
                    />

                    {/* Missing Qualifications */}
                    <ListBox
                      title="Missing Qualifications"
                      classname="missing-qualifications"
                      items={atsResult?.jobFitAnalysis.missingQualifications}
                      icon={Clear}
                      iconColor="text-rose-600"
                    />

                    {/* Suggestions */}
                    <ListBox
                      title="Suggestions"
                      classname="suggestions"
                      items={atsResult?.jobFitAnalysis.suggestions}
                      icon={TipsAndUpdates}
                      iconColor="text-gray-500"
                    />
                  </Box>

                  {/* Recommendations */}
                  <Box
                    className="reccomendations  flex flex-col gap-6 p-4 md:p-8 bg-white rounded-md shadow-md"
                    id="actions"
                    component={motion.div}
                    variants={fadeInUp}
                  >
                    <Box className="flex items-center gap-2">
                      <PriorityHighRounded
                        sx={{
                          color: orange[900],
                        }}
                      />
                      <Typography
                        variant="h6"
                        className="uppercase"
                        sx={{ color: "text.primary", fontWeight: "bold" }}
                      >
                        Action Needed
                      </Typography>
                    </Box>

                    {/* Content */}
                    <ListBox
                      title="Content"
                      classname="content"
                      items={atsResult?.recommendations.content}
                      icon={TipsAndUpdates}
                      iconColor="text-orange-500"
                    />

                    {/* Formatting */}
                    <ListBox
                      title="Formatting"
                      classname="formatting"
                      items={atsResult?.recommendations.formatting}
                      icon={TipsAndUpdates}
                      iconColor="text-orange-500"
                    />

                    {/* Priorities */}
                    <ListBox
                      title="priorities"
                      classname="priorities"
                      items={atsResult?.recommendations.highPriority}
                      icon={TipsAndUpdates}
                      iconColor="text-orange-500"
                    />

                    {/*Keywords */}
                    <ListBox
                      title="keywords"
                      classname="keywords"
                      items={atsResult?.recommendations.keywords}
                      icon={TipsAndUpdates}
                      iconColor="text-orange-500"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Responsive Menu */}
            <AtsResultResponsiveMenu />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Page;
