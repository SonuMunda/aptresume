"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { indigo } from "@mui/material/colors";
import Link from "next/link";
import SectionSummary from "./components/shared/SectionSummary";
import homeFaqData from "@/data/homeFaqData";
import AccordionComponent from "./components/shared/AccordionComponent";
import { cardVariants } from "@/ui/animations";
import ServicesSection from "./components/ServicesSection";
import userJourneySteps from "@/data/userJourneySteps";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
    },
  },
};
const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-section flex items-center min-h-[75vh] lg:h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container px-4 py-25 mx-auto h-full max-w-7xl flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="hero-content h-full w-full lg:w-1/2 flex flex-col justify-center"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-900 font-bold text-4xl sm:text-5xl"
            >
              Enhance your professional image with aptresume.
            </motion.h1>

            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl"
            >
              Upload your resume and unlock personalized job opportunities
              tailored to your expertise and skills with our advanced AI
              technology.
            </motion.p>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10"
            >
              <Link href="/resume-scan">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    p: 2,
                    px: 4,
                    borderRadius: 100,
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
          </motion.div>
          <motion.div
            className="hero-image w-full  lg:w-1/2"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={"/images/homepage-hero.png"}
              alt="Professional Career Image"
              width={500}
              height={500}
              className="object-cover mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* How its Works */}
      <section className="working bg-white">
        <div className="container max-w-7xl text-center mx-auto py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
          <SectionSummary
            headline="Your Step-by-Step Path to Career Success"
            supportingText="Navigate your job search with confidence using AptResume’s comprehensive tools. From uploading your resume to applying for the perfect job, our AI-driven platform guides you through every step with personalized insights and seamless experiences designed to help you stand out and succeed."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-10">
            {userJourneySteps.map(({ Icon, title, description }, index) => (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px rgba(60,72,150,0.18)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 15 }}
                className="column h-full bg-indigo-50 space-y-6 p-6 border border-gray-300 rounded-xl"
                key={index}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full text-indigo-600  mx-auto">
                  <Icon fontSize="large" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about-section bg-indigo-50 py-24 px-4 sm:px-10 text-gray-900 overflow-x-hidden">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            className="w-full text-center"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-gray-700 mb-6"
              variants={fadeUp}
            >
              About AptResume
            </motion.h2>

            <motion.p
              className="text-gray-700 text-base sm:text-lg leading-relaxed"
              variants={fadeUp}
            >
              At <b>aptresume</b>, we empower job seekers and employers with
              cutting-edge, AI-driven solutions. Our platform optimizes resumes
              and delivers intelligent job matching, enabling you to navigate
              the job market with confidence and precision.
            </motion.p>

            <motion.p
              className="text-gray-700 text-base sm:text-lg mt-6 leading-relaxed"
              variants={fadeUp}
            >
              Whether you’re launching your career, transitioning to a new role,
              or seeking top talent, aptresume streamlines the
              process—connecting the right individuals with the right
              opportunities efficiently.
            </motion.p>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10"
            >
              <Link href="/about">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    p: 2,
                    px: 4,
                    borderRadius: 100,
                    backgroundColor: indigo[500],
                    color: "#ffffff",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: indigo[700],
                    },
                  }}
                >
                  Learn more
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <ServicesSection />

      {/* Faqs */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <motion.div className="container max-w-7xl mx-auto py-20 px-4">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="text-gray-800 font-bold text-3xl sm:text-5xl mb-12 text-center"
          >
            Frequently Asked Question
          </motion.h1>

          <div className="faq-accordion max-w-5xl mx-auto space-y-6">
            {homeFaqData.map((faq, index) => (
              <AccordionComponent
                question={faq.question}
                answer={faq.answer}
                key={index}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
