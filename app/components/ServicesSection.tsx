import React from "react";
import SectionSummary from "./shared/SectionSummary";
import services from "@/data/servicesData";
import Link from "next/link";
import { motion } from "framer-motion";

const ServicesSection = () => {
  return (
    <section className="bg-white text-center py-24 px-4 sm:px-10">
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
                className="column h-full space-y-6 p-6"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full text-indigo-600  mx-auto">
                  <Icon fontSize="large" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
