"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import FeatureCard from "./components/shared/FeatureCard";
import { indigo } from "@mui/material/colors";
import { atsProcess } from "@/data/atsProcess";
import services from "@/data/servicesData";
import Link from "next/link";
import SectionSummary from "./components/shared/SectionSummary";
import homeFaqData from "@/data/homeFaqData";
import AccordionComponent from "./components/shared/AccordionComponent";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-section flex items-center min-h-[75vh] lg:h-screen bg-gradient-to-br from-indigo-50 to-blue-50"
      >
        <div className="container px-4 py-25 mx-auto h-full max-w-7xl flex flex-col lg:flex-row items-center justify-between">
          <div className="hero-content h-full w-full lg:w-1/2 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-900 font-bold text-4xl sm:text-5xl"
            >
              Enhance your professional image with aptresume.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl"
            >
              Upload your resume and unlock personalized job opportunities
              tailored to your expertise and skills with our advanced AI
              technology.
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <Link href="/resume-scan">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    py: 2,
                    px: 4,
                    borderRadius: 2,
                    backgroundColor: indigo[500],
                    color: "#ffffff",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: indigo[700],
                    },
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
          <div className="hero-image w-full  lg:w-1/2">
            <Image
              src={"/images/homepage-hero.png"}
              alt="Professional Career Image"
              width={600}
              height={600}
              className="object-cover mx-auto"
            />
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="about-section bg-white py-24 px-4 sm:px-10 text-gray-900 overflow-x-hidden"
      >
        <div className="container max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="w-full text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-6 leading-tight tracking-tight">
              About AptResume
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              At <strong>aptresume</strong>, we empower job seekers and
              employers with cutting-edge, AI-driven solutions. Our platform
              optimizes resumes and delivers intelligent job matching, enabling
              you to navigate the job market with confidence and precision.
            </p>

            <p className="text-gray-700 text-base sm:text-lg mt-6 leading-relaxed">
              Whether you’re launching your career, transitioning to a new role,
              or seeking top talent, aptresume streamlines the
              process—connecting the right individuals with the right
              opportunities efficiently.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className=" bg-gradient-to-br from-indigo-50 to-blue-50 space-y-10 py-24 px-4 sm:px-6 lg:px-10 text-center"
      >
        <div className="container max-w-7xl mx-auto">
          <SectionSummary
            headline="How Our ATS Scanner Works"
            supportingText="Our AI-powered ATS scanner helps you optimize your resume for top job matching."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {atsProcess.map(
              ({ icon: Icon, title, iconBgColor, description }, index) => (
                <FeatureCard
                  index={index}
                  Icon={Icon}
                  title={title}
                  iconBgColor={iconBgColor}
                  description={description}
                  key={index}
                />
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="bg-white text-center py-24 px-4 sm:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <SectionSummary
            headline="Our Service"
            supportingText="Explore advanced tools designed to enhance your job search—featuring
            resume scanning, personalized job matching, and expert resume
            creation services."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {services.map(({ Icon, title, description, href }, index) => (
              <Link href={href} key={index}>
                <motion.div
                  initial={{ y: 30 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  className="column h-full bg-white space-y-6 p-6 border border-gray-300 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50"
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full text-indigo-600  mx-auto">
                    <Icon fontSize="large" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-gray-600">{description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Faqs */}
      <motion.div className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <motion.div className="container max-w-7xl mx-auto py-20 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-800 font-bold text-3xl sm:text-5xl mb-12 text-center"
          >
            Frequently Asked Question
          </motion.h1>

          <motion.div className="faq-accordion max-w-5xl mx-auto space-y-6">
            {homeFaqData.map((faq, index) => (
              <AccordionComponent
                question={faq.question}
                answer={faq.answer}
                key={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
