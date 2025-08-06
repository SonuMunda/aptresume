import React from "react";
import SectionSummary from "./shared/SectionSummary";
import services from "@/data/servicesData";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardVariants } from "@/ui/animations";

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
