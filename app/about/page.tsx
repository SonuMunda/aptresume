"use client";

import { Box, Button, Typography } from "@mui/material";
import HeroSection from "../components/layout/HeroSection";
import ServicesSection from "../components/ServicesSection";
import SectionSummary from "../components/shared/SectionSummary";
import { indigo } from "@mui/material/colors";
import Link from "next/link";
import { motion } from "framer-motion";

const heroContent = {
  headline: "Welcome to AptResume",
  supportingText:
    "AptResume is your all-in-one AI-powered career companion. Whether you’re polishing your resume,extracting key skills from job descriptions, or searching top job portals, our platform helps you succeed faster and smarter.",
  image: "/images/about-us-hero.png",
  imageAlt: "ATS Scanner Hero Image",
};

const AboutPage = () => {
  return (
    <Box component={"main"}>
      <HeroSection
        headline={heroContent.headline}
        supportingText={heroContent.supportingText}
        image={heroContent.image}
        imageAlt={heroContent.imageAlt}
      />

      <ServicesSection />

      <Box component={"section"} className="mission bg-neutral-100">
        <Box
          component={"div"}
          className="container max-w-7xl px-4 py-25 mx-auto"
        >
          <Box component={"div"} className="content mx-auto">
            <SectionSummary
              headline="Our Misssion"
              supportingText="At AptResume, we are dedicated to empowering job seekers with advanced
          AI-driven tools that simplify the hiring process and enhance career
          opportunities. We strive to bridge the gap between talent and
          opportunity with technology, helping individuals succeed with
          confidence and clarity."
            />
          </Box>
        </Box>
      </Box>

      <Box component={"section"} className="mission bg-white">
        <Box
          component={"div"}
          className="container max-w-7xl px-4 py-25 mx-auto"
        >
          <Box component={"div"} className="content mx-auto">
            <SectionSummary
              headline="Ready to Supercharge Your Job Search?"
              supportingText="Sign up now to access our AI-powered ATS Scanner, Resume Builder, and
          aggregated job listings — all in one place. Let AptResume help you
          stand out and land your dream job faster."
            />

            <Box
              component={motion.div}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-fit lg:mx-auto"
            >
              <Link href={"/auth/signup"} className="flex lg:justify-center">
                <Button
                  variant="contained"
                  sx={{
                    
                    p: 2,
                    textTransform: "capitalize",
                    backgroundColor: indigo[500],
                    "&:hover": {
                      backgroundColor: indigo[700],
                    },
                  }}
                >
                  <Typography component={"span"}>
                    Get Started for Free
                  </Typography>
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box component={"section"} className="mission bg-neutral-100">
        <Box
          component={"div"}
          className="container max-w-7xl px-4 py-25 mx-auto"
        >
          <Box
            component={"div"}
            className="content mx-auto grid lg:grid-cols-2 items-center"
          >
            <SectionSummary
              headline="Did You Know?"
              supportingText="          Over 70% of companies use ATS software to filter
          resumes before a human even sees them. AptResume is here to make sure
          yours gets noticed every time."
            />
            <Box
              component={motion.div}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-fit lg:mx-auto"
            >
              <Link href={"/contact"} className="flex lg:justify-center">
                <Button
                  variant="contained"
                  sx={{
                    
                    p: 2,
                    textTransform: "capitalize",
                    backgroundColor: indigo[500],
                    "&:hover": {
                      backgroundColor: indigo[700],
                    },
                  }}
                >
                  <Typography component={"span"}>
                    Get in touch with us
                  </Typography>
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
