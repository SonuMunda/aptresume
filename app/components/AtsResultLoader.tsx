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

const AtsResultLoader: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      2000
    );
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
      <CircularProgress
        size={56}
        thickness={4}
        sx={{ mb: 3, color: "primary.main" }}
      />

      {/* Fade animates the text change */}
      <Fade key={index} in timeout={400}>
        <Typography variant="h6" sx={{ fontWeight: 500, textAlign: "center" }}>
          {messages[index]}
        </Typography>
      </Fade>

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
