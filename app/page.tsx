"use client";

import Image from "next/image";
import sideImage from "./assets/images/about-side-home.jpg";
import features from "../data/features";
import processes from "../data/jobFinderProcess";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import FeatureCard from "./components/shared/FeatureCard";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-section bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen"
      >
        <div className="container mx-auto h-full flex flex-col items-center justify-center px-4 max-w-6xl">
          <div className="hero-content text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Advance Your Career with AptResume
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
            >
              Upload your resume and let our AI instantly connect you with job
              opportunities tailored to your unique experience and skills.
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <Button
                variant="contained"
                href="/find-job"
                sx={{
                  textTransform: "none",
                  px: 6,
                  py: 2,
                  borderRadius: "1rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="about-section py-20 px-4 sm:px-10 bg-gray-100 text-gray-900 overflow-x-hidden"
      >
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-600 mb-6 leading-tight">
              About <span className="text-blue-400">AptResume</span>
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              At <strong>AptResume</strong>, we empower job seekers and
              employers through smart, AI-driven solutions. From resume
              optimization to intelligent job matching, we help you navigate the
              job market with confidence and precision.
            </p>

            <p className="text-gray-700 text-lg mt-4 leading-relaxed">
              Whether you&apos;re starting your career, transitioning to a new
              role, or recruiting top talent, AptResume simplifies the
              process—connecting the right people with the right opportunities,
              faster.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <Image
              src={sideImage}
              alt="About AptResume"
              width={500}
              height={500}
              className="rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-blue-100 tracking-tight">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {processes.map(({ icon: Icon, title, description }, index) => (
            <FeatureCard
              index={index}
              Icon={Icon}
              title={title}
              description={description}
              key={index}
            />
          ))}
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-10 bg-gray-100 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Discover intelligent tools designed to streamline your job search —
            from resume scanning to personalized job matching and professional
            resume building.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md  border border-gray-200 transition duration-300"
              >
                <div className={`mb-4 flex justify-center text-blue-600`}>
                  <feature.icon fontSize="large" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
