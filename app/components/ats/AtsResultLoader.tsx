"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Fade, Typography } from "@mui/material";

const messages = [
  "Analyzing your resume…",
  "Checking ATS compatibility…",
  "Scanning for keywords…",
  "Scoring each section…",
  "Finalizing your report…",
];

const AtsResultLoader = () => {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      {mounted && (
        <>
          <CircularProgress
            size={56}
            thickness={4}
            sx={{ mb: 3, color: "primary.main" }}
          />
          <Fade key={index} in={true} timeout={400}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              {messages[index]}
            </Typography>
          </Fade>
        </>
      )}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, textAlign: "center" }}
      >
        Please wait while we process your resume…
      </Typography>
    </Box>
  );
};

export default AtsResultLoader;
