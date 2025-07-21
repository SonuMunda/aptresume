import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ElementType } from "react";

const FeatureCard = ({
  index,
  Icon,
  title,
  description,
}: {
  index: number;
  Icon: ElementType;
  title: string;
  description: string;
}) => {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className={`${
        index === 2 ? "sm:col-span-full lg:col-span-1" : ""
      } bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition`}
    >
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
        <Icon sx={{ fontSize: 36 }} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-indigo-100 text-base leading-relaxed">{description}</p>
    </Box>
  );
};

export default FeatureCard;
