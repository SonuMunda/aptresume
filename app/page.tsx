"use client";

import Image from "next/image";
import sideImage from "./assets/images/about-side-home.png";
import features from "./data/features";
import processes from "./data/process";
import { motion } from "framer-motion";
import Header from "./components/Header";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-section bg-gray-950 h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen"
      >
        <div className="container h-full mx-auto flex flex-col items-center justify-center max-w-6xl">
          <div className="hero-content p-4 flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-title text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              Land Your Dream Job with AptResume
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hero-description mt-4 text-lg sm:text-xl md:text-2xl text-gray-300"
            >
              Upload your resume and let our AI match you with the best jobs
              tailored to your skills and experience—fast and effortlessly.
            </motion.p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="hero-btn mt-6"
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  px: 6,
                  py: 2,
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
        className="about-section py-16 px-4 sm:px-10 bg-gray-50 text-gray-900 overflow-x-hidden"
      >
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6">
              About AptResume
            </h2>
            <p className="text-gray-700 text-lg">
              At <strong>AptResume</strong>, our mission is to bridge the gap
              between talent and opportunity. We provide intelligent tools like
              resume scanning, job matching, and keyword optimization to help
              job seekers stand out and employers find the perfect fit faster.
            </p>
            <p className="text-gray-700 text-lg mt-4">
              Whether you&apos;re looking for your first job, switching careers,
              or hiring top talent — AptResume is here to simplify the journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2"
          >
            <Image
              src={sideImage}
              alt="About AptResume"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
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
        className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-blue-950"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-blue-100">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {processes.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`mb-4 text-blue-300`}>
                <Icon sx={{ fontSize: 50 }} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
              <p className="text-gray-200">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-10 bg-gray-50 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-700 text-lg mb-10">
            Explore powerful tools including job discovery, resume scanning,
            keyword optimization, and a professional resume builder.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-gray-100 p-6 ring-2 ring-gray-300 rounded hover:shadow-lg transition"
              >
                <div className={`${feature.color} mb-3`}>
                  <feature.icon fontSize="large" />
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
