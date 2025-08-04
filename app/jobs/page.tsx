"use client";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect, useRef, useState } from "react";
import HeroSection from "../components/layout/HeroSection";
import SectionSummary from "../components/shared/SectionSummary";
import { indigo } from "@mui/material/colors";
import JobCard from "../components/JobCard";
import toast, { Toaster } from "react-hot-toast";
import getJobDescription from "../utils/getJobDescription";
import JobDescriptionSkeleton from "../components/JobDescriptionSkeleton";
import JobCardSkeleton from "../components/JobCardSkeleton";
import { ChevronLeft } from "@mui/icons-material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setError, setJobs, setLoading } from "@/store/slices/jobsSlice";

interface formDataProps {
  title: string;
  experience: string;
  location: string;
}

interface searchJobsProps {
  title: string;
  location?: string | null;
  experience?: string | null;
}

const Jobs = () => {
  const {
    data: jobs,
    loading,
    error,
  } = useSelector((state: RootState) => state.jobs);

  const dispatch = useDispatch();
  // States
  const [descriptionHTML, setDescriptionHTML] = useState<string>("");
  const [descLoading, setDescLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<formDataProps>({
    title: "",
    experience: "",
    location: "",
  });
  const [descJobId, setDescJobId] = useState<string | null>("");
  const selectedJob = jobs?.find((job) => job?.job_id === descJobId);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // References
  const uploaderRef = useRef<HTMLElement>(null);
  const jobsContent = useRef<HTMLElement>(null);

  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const experience = searchParams.get("experience");
  const location = searchParams.get("location");

  // Hero Section Contents
  const heroContent = {
    headline: "Discover Your Dream Career",
    supportingText:
      "Ready to make an impact? Browse hundreds of open roles across industries, from remote tech jobs to on-site opportunities, powered by real-time listings from leading job boards. Join aptresume and take the next step in your career.",
    image: "/images/jobs-hero-image.png",
    imageAlt: "Jobs Hero Image",
    buttonText: "Explore Jobs",
  };

  // Functions
  const scrollToUploader = () => {
    uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToJobs = () => {
    jobsContent.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch Jobs

  useEffect(() => {
    const searchJobs = async ({
      title,
      experience,
      location,
    }: searchJobsProps) => {
      const queryData: Record<string, string> = {};

      if (title) queryData.title = title;
      if (experience) queryData.experience = experience;
      if (location) queryData.location = location;

      dispatch(setLoading(true));
      try {
        const response = await fetch(`/api/get-jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryData),
        });
        const data = await response.json();
        if (!response.ok) {
          dispatch(setError(data.message));
          return;
        }
        dispatch(setJobs(data));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Oops,something went wrong");
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (title) {
      searchJobs({ title, experience, location });
    }
  }, [title, experience, location, dispatch]);

  // Event Handlers
  const handleSearch = () => {
    const query: Record<string, string> = {};

    if (formData.title) {
      query.title = formData.title;
    }
    if (formData.experience) {
      query.experience = formData.experience;
    }
    if (formData.location) {
      query.location = formData.location;
    }

    const queryString = new URLSearchParams(query).toString();

    router.push(`?${queryString}`, { scroll: false });
  };

  // Get Salary Range
  const getSalary = (
    minSalary: string | number | null,
    maxSalary: string | number | null
  ) => {
    return minSalary && maxSalary ? `${minSalary}- ${minSalary}` : "";
  };

  // Get Location
  const getLocation = (
    city: string | null,
    state: string | null,
    country: string | null
  ) => {
    return `${city ? city + ", " : ""}${state ? state + ", " : ""}${country}`;
  };

  // Get Formatted Description
  const getDescription = async (description: string) => {
    try {
      setDescLoading(true);
      setDescriptionHTML("");
      const formattedDesc = await getJobDescription(description);
      setDescriptionHTML(formattedDesc);
      console.log(formattedDesc);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setDescLoading(false);
    }
  };

  useEffect(() => {
    if (selectedJob) {
      getDescription(selectedJob?.job_description);
    }
  }, [selectedJob]);

  return (
    <Box component={"main"}>
      <Toaster />

      {/* Hero Section */}
      <HeroSection
        headline={heroContent.headline}
        supportingText={heroContent.supportingText}
        image={heroContent.image}
        imageAlt={heroContent.imageAlt}
        buttonText={heroContent.buttonText}
        handleScroll={scrollToUploader}
      />

      {/* Jobs Section*/}
      <Box component="section" ref={uploaderRef} className="job-search">
        <Box
          component="div"
          className="container max-w-7xl mx-auto px-4 py-25 space-y-10"
        >
          <SectionSummary
            headline="Explore Jobs That Fit You"
            supportingText="Use our powerful search to browse open roles across industries, sourced instantly from leading job boards like LinkedIn and Indeed. Enter a job title, location, or keyword to start your career journey."
          />

          {/* Search Bar*/}
          <Box
            component="div"
            className="flex flex-wrap gap-4"
            ref={jobsContent}
          >
            <FormControl sx={{ flex: 1, minWidth: { xs: "100%", sm: 300 } }}>
              <TextField
                variant="outlined"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Job Title, Location, or Keyword"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    "&:hover fieldset": { borderColor: indigo[200] },
                    "&.Mui-focused fieldset": { borderColor: indigo[400] },
                  },
                }}
              />
            </FormControl>
            <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
              <Select
                variant="outlined"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                displayEmpty
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: indigo[200],
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: indigo[400],
                  },
                }}
                aria-label="Select experience level"
              >
                <MenuItem disabled value="">
                  Experience Level
                </MenuItem>
                <MenuItem value="no_experience">Entry-Level</MenuItem>
                <MenuItem value="under_3_years_experience">Mid-Level</MenuItem>
                <MenuItem value="more_than_3_years_experience">
                  Senior-Level
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
              <TextField
                variant="outlined"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Location"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: indigo[200],
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: indigo[400],
                  },
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={formData.title.trim().length === 0}
              sx={{
                borderRadius: 2,
                py: 2,
                px: 4,
                width: 140,
                backgroundColor: indigo[500],
                "&:hover": { backgroundColor: indigo[700] },
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Typography component={"span"}>Search</Typography>
              )}
            </Button>
          </Box>

          {/* Jobs Loading Skeletons*/}
          <Box component={"div"} className="skeletons">
            {loading &&
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <JobCardSkeleton key={`skeleton-${index}`} />
                ))}
          </Box>

          <Suspense fallback={<Loading />}>
            {jobs && jobs.length > 0 && (
              <Box component={"div"} className="jobs-listings relative">
                <Box component={"div"} className="jobs-contents flex gap-6">
                  <Box
                    component={"div"}
                    className={`jobs w-full xl:${
                      selectedJob ? "w-1/2" : "w-full"
                    } `}
                  >
                    {/* Jobs Cards*/}
                    <Box
                      component={"div"}
                      className={`job-cards w-full space-y-6 transition duration-300`}
                    >
                      {currentJobs.map((item) => (
                        <JobCard
                          key={item.job_id}
                          id={item.job_id}
                          imageUrl={item.employer_logo}
                          title={item.job_title}
                          company={item.employer_name}
                          companyUrl={item.employer_website}
                          location={
                            item.job_location
                              ? item.job_location
                              : getLocation(
                                  item.job_city,
                                  item.job_state,
                                  item.job_country
                                )
                          }
                          type={item.job_employment_types}
                          posted={item.job_posted_at}
                          salary={
                            item.job_salary?.toString()
                              ? item.job_salary?.toString()
                              : getSalary(
                                  item.job_min_salary,
                                  item.job_max_salary
                                )
                          }
                          setDescJobId={setDescJobId}
                        />
                      ))}
                    </Box>

                    {/* Pagination*/}
                    <Stack
                      direction="row"
                      gap={2}
                      justifyContent="center"
                      flexWrap="wrap"
                      className="space-y-2"
                      mt={4}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
                          scrollToJobs();
                        }}
                        disabled={currentPage === 1}
                        sx={{
                          bgcolor: indigo[900],
                          "&:hover": { bgcolor: indigo[800] },
                          opacity: currentPage === 1 ? 0.5 : 1,
                        }}
                      >
                        Previous
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            scrollToJobs();
                          }}
                          variant={
                            currentPage === i + 1 ? "contained" : "outlined"
                          }
                          sx={{
                            bgcolor:
                              currentPage === i + 1
                                ? indigo[900]
                                : "transparent",
                            color: currentPage === i + 1 ? "#fff" : indigo[900],
                            borderColor: indigo[900],
                            "&:hover": {
                              bgcolor:
                                currentPage === i + 1
                                  ? indigo[800]
                                  : indigo[50],
                            },
                          }}
                        >
                          {i + 1}
                        </Button>
                      ))}

                      <Button
                        variant="contained"
                        onClick={() => {
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          );
                          scrollToJobs();
                        }}
                        disabled={currentPage === totalPages}
                        sx={{
                          bgcolor: indigo[900],
                          "&:hover": { bgcolor: indigo[800] },
                          opacity: currentPage === totalPages ? 0.5 : 1,
                        }}
                      >
                        Next
                      </Button>
                    </Stack>
                  </Box>

                  {/* Job Description*/}
                  {selectedJob && (
                    <Box
                      component={"div"}
                      className="job-description h-screen xl:h-[80vh] overflow-auto bg-white fixed top-0 left-0 z-10 xl:z-1 xl:sticky xl:top-20 py-15  px-4 xl:p-0 w-full xl:w-1/2 space-y-6"
                    >
                      <Box
                        component={"div"}
                        className="block xl:hidden absolute bg-gray-900/10 rounded-xl top-2 right-2"
                        onClick={() => setDescJobId("")}
                      >
                        <IconButton>
                          <ChevronLeft />
                        </IconButton>
                      </Box>
                      <JobCard
                        id={selectedJob.job_id}
                        imageUrl={selectedJob.employer_logo}
                        title={selectedJob.job_title}
                        company={selectedJob.employer_name}
                        companyUrl={selectedJob.employer_website}
                        salary={
                          selectedJob.job_salary?.toString()
                            ? selectedJob.job_salary?.toString()
                            : getSalary(
                                selectedJob.job_min_salary,
                                selectedJob.job_max_salary
                              )
                        }
                        type={selectedJob.job_employment_types}
                        posted={selectedJob.job_posted_at}
                        location={
                          selectedJob.job_location
                            ? selectedJob.job_location
                            : getLocation(
                                selectedJob.job_city,
                                selectedJob.job_state,
                                selectedJob.job_country
                              )
                        }
                        applyOptions={
                          Array.isArray(selectedJob?.apply_options)
                            ? selectedJob.apply_options
                            : undefined
                        }
                        key={selectedJob.job_id}
                        setDescJobId={setDescJobId}
                      />
                      {/* Job Sescription Skeleton*/}
                      {descLoading && <JobDescriptionSkeleton />}

                      {/* Jobs Description Content*/}
                      {descriptionHTML && (
                        <Box
                          component="div"
                          className="description w-full p-4 lg:p-10 border-2 border-gray-300 rounded-xl"
                          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Suspense>
          {/* Jobs Listings  */}

          {/* Jobs Error Box*/}
          {error && (
            <Box
              component="div"
              className="rounded-md border border-red-300 bg-red-100 text-red-700 p-4 text-sm font-medium shadow-sm"
            >
              {error || "An unexpected error occurred. Please try again."}
            </Box>
          )}
        </Box>
      </Box>

      {/* Promo */}
      <Box
        component="section"
        className="bg-gradient-to-br from-indigo-50 to-sky-50 py-12 px-4"
      >
        <Box
          component="div"
          className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <SectionSummary
            headline="Want More Interviews?"
            supportingText="Scan your resume for ATS compatibility and boost your chances of getting shortlisted. Get personalized tips to optimize your resume based on the job you want."
          />

          <Box
            component="div"
            className="w-full md:w-auto flex justify-center md:justify-end"
          >
            <Link href="/resume-scan" passHref>
              <Button
                variant="contained"
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: 2,
                  backgroundColor: indigo[500],
                  color: "white",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: indigo[700],
                  },
                }}
              >
                Scan My Resume
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Jobs;
