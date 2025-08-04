import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  headline: string;
  supportingText: string;
}

const SectionSummary = ({ headline, supportingText }: SectionProps) => {
  return (
    <div className="space-y-6 text-left lg:text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-800 font-bold text-3xl sm:text-5xl"
      >
        {headline}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 sm:text-lg mb-14 lg:max-w-3xl mx-auto"
      >
        {supportingText}
      </motion.p>
    </div>
  );
};

export default SectionSummary;
