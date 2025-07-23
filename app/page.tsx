"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import FeatureCard from "./components/shared/FeatureCard";
import { indigo } from "@mui/material/colors";
import { atsProcess } from "@/data/atsProcess";
import services from "@/data/servicesData";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-section h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen bg-gray-50"
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6 max-w-7xl">
          <div className="hero-content w-full lg:w-1/2">
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
              <Button
                variant="contained"
                href="/resume-scan"
                sx={{
                  textTransform: "none",
                  py: 2,
                  px: 4,
                  borderRadius: 2,
                  backgroundColor: indigo[600],
                  color: "#ffffff",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: indigo[800],
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
          <div className="hero-image hidden lg:block w-1/2">
            <Image
              src={"/images/homepage-hero.png"}
              alt="Professional Career Image"
              width={600}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="about-section bg-white py-24 px-4 sm:px-10 text-gray-900 overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <Image
              src={"/images/about-section-image.jpg"}
              alt="About aptresume"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-left"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8 leading-tight tracking-tight">
              About <span className="text-indigo-600">aptresume</span>
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
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-10 text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-14 text-gray-900 tracking-tight">
          How It Works
        </h2>

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
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 text-center py-24 px-4 sm:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Our Services
          </h2>
          <p className="text-gray-600 sm:text-lg mb-14 max-w-3xl mx-auto">
            Explore advanced tools designed to enhance your job search—featuring
            resume scanning, personalized job matching, and expert resume
            creation services.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {services.map(({ Icon, title, description }, index) => (
              <motion.div
                key={index}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                className="column bg-white space-y-6 p-6 border-2 border-gray-300 rounded-xl "
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full text-blue-600  mx-auto">
                  <Icon fontSize="large" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
