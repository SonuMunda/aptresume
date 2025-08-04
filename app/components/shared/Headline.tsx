"use client";

import { motion } from "framer-motion";

const Headline = ({ headline }: {headline: string}) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-gray-900 font-bold text-4xl sm:text-5xl"
    >
      {headline}
    </motion.h1>
  );
};

export default Headline;
