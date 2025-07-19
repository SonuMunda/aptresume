"use client";

import { ErrorOutline } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ErrorComponent({
  errorStatus,
  errorText,
}: {
  errorStatus: number | string;
  errorText: string;
}) {
  return (
    <Box
      component={motion.div}
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        component={motion.div}
        className="grid gap-4 p-8 text-center max-w-md w-full"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box className="flex justify-center">
          <Box className="bg-red-100 p-4 rounded-full">
            <ErrorOutline
              className="text-red-600"
              sx={{ fontSize: "2.5rem" }}
            />
          </Box>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            color: "#262626",
          }}
        >
          Error
        </Typography>

        <Typography
          variant="body1"
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {errorText}
          <Box component="span" display="block">
            Request failed with status <br /> code {errorStatus}
          </Box>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: "1rem",
            backgroundColor: "#8d433e",
            "&:hover": {
              backgroundColor: "#8d433e",
            },
          }}
          component={Link}
          href="/resume-scan"
        >
          Upload Again
        </Button>
      </Box>
    </Box>
  );
}
