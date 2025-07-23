import { motion } from "framer-motion";
import Image from "next/image";

interface SectionProps {
  headline: string;
  supportingText: string;
  image: string;
  imageAlt : string;
  buttonText?: string;
  handleScroll: () => void;
}

const HeroSection = ({
  headline,
  supportingText,
  image,
  imageAlt,
  buttonText,
  handleScroll,
}: SectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[85vh] py-20 flex flex-col lg:flex-row items-center justify-center bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="content w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.h1
            className="font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-8 text-gray-900 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="mx-auto lg:mx-0 mt-4 text-lg sm:text-xl max-w-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {supportingText}
          </motion.p>

          {buttonText && (
            <motion.button
              className="bg-indigo-600 block mt-8 mx-auto lg:mx-0 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md"
              onClick={handleScroll}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              {buttonText}
            </motion.button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <Image
            src={image}
            alt={imageAlt}
            width={500}
            height={500}
            className="rounded-xl object-cover max-w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
