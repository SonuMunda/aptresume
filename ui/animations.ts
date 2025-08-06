export const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
    },
  },
};
export const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export const cardVariants = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
    },
  },
};
