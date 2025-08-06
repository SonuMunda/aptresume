import React from "react";
import { motion } from "framer-motion";
import { container, fadeUp } from "@/ui/animations";

interface SectionProps {
  headline: string;
  supportingText: string;
}



const SectionSummary = ({ headline, supportingText }: SectionProps) => {
  return (
    <motion.div
      className="space-y-6 text-left lg:text-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h1
        variants={fadeUp}
        className="text-gray-800 font-bold text-3xl sm:text-5xl"
      >
        {headline}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="text-gray-600 sm:text-lg mb-14 lg:max-w-3xl mx-auto"
      >
        {supportingText}
      </motion.p>
    </motion.div>
  );
};

export default SectionSummary;
