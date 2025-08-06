import { container } from "@/ui/animations";
import { motion } from "framer-motion";
import Image from "next/image";

interface SectionProps {
  headline: string;
  supportingText: string;
  image: string;
  imageAlt: string;
  buttonText?: string;
  handleScroll?: () => void;
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
    <section className="relative min-h-[85vh] py-25 flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-800 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="content w-full lg:w-1/2 text-left"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h1
            className="font-bold text-4xl sm:text-5xl mb-8 text-gray-800"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="mx-auto lg:mx-0 mt-4 text-lg sm:text-xl lg:max-w-xl text-gray-600"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {supportingText}
          </motion.p>

          {buttonText && (
            <motion.button
              className="bg-indigo-700 block mt-8 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-800 transition duration-300 shadow-md"
              onClick={handleScroll}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {buttonText}
            </motion.button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full  lg:w-1/2 flex justify-center"
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
    </section>
  );
};

export default HeroSection;
