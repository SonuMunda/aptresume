import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  headline: string;
  supportingText: string;
}

const SectionSummary = ({ headline, supportingText }: SectionProps) => {
  return (
    <motion.div
      className="space-y-6 text-left lg:text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 className="text-gray-800 font-bold text-3xl sm:text-5xl">
        {headline}
      </motion.h1>
      <motion.p className="text-gray-600 sm:text-lg mb-14 lg:max-w-3xl mx-auto">
        {supportingText}
      </motion.p>
    </motion.div>
  );
};

export default SectionSummary;
