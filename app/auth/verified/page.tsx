"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";

import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { TaskAlt } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

export default function VerifiedPage() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Email Verified | AptResume</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Box
        component={"section"}
        className="verified-page flex flex-col items-center justify-center h-screen bg-gray-200"
      >
        <Container maxWidth="sm" className="text-center space-y-6">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <TaskAlt
              sx={{
                fontSize: 80,
                color: theme.palette.success.main,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Email Verified Successfully!
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 480,
                mx: "auto",
              }}
            >
              Thank you for confirming your email. You can now sign in and start
              using AptResume.
            </Typography>
          </motion.div>

          {/* Animated Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              variant="contained"
              component={Link}
              href="/auth/signin"
              size="large"
              sx={{
                py: "1rem",
                fontSize: 16,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                background: indigo[700],
              }}
              fullWidth
            >
              Go to Sign In
            </Button>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
