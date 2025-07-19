import { Box, Typography } from "@mui/material";
import React, { ComponentType } from "react";

const SectionHeading = ({
  Icon,
  heading,
}: {
  Icon: ComponentType;
  heading: string;
}) => {
  return (
    <Box className="flex items-center gap-2">
      <Icon />
      <Typography component="h4" fontWeight={600}>{heading}</Typography>
    </Box>
  );
};

export default SectionHeading;
