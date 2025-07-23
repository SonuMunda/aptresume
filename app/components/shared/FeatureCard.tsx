import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ElementType } from "react";

const FeatureCard = ({
  index,
  Icon,
  iconBgColor,
  title,
  description,
}: {
  index: number;
  Icon: ElementType;
  iconBgColor?: string;
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
      className={`cursor-default ${
        index === 2 && "sm:col-span-full lg:col-span-1"
      } bg-white border border-gray-300 rounded-2xl p-6 lg:p-15 shadow-md hover:shadow-2xl transition-all duration-300`}
    >
      <div
        className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full ${iconBgColor} text-white`}
      >
        <Icon sx={{ fontSize: 36 }} />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed">{description}</p>
    </Box>
  );
};

export default FeatureCard;
