"use client";

import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box className="h-screen w-full flex items-center justify-center">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
