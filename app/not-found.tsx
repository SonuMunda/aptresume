"use client";

import { Box, Button, Typography, Container, useTheme } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 6,
          background: "white",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 60, sm: 96 },
              fontWeight: 800,
              color: "error.main",
              mb: 2,
            }}
          >
            404
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            The page you are looking for doesn&apos;t exist or has been moved. Try
            going back to the homepage.
          </Typography>

          {/* CTA */}
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/"
            sx={{
              textTransform: "none",
              px: 5,
              py: 1.5,
              fontSize: 16,
              borderRadius: 3,
              background: "linear-gradient(to right, #2563eb, #1e40af)",
              boxShadow: "0px 4px 14px rgba(37, 99, 235, 0.3)",
              "&:hover": {
                background: "linear-gradient(to right, #1d4ed8, #1e3a8a)",
              },
            }}
          >
            Go Back Home
          </Button>
        </Container>
      </Box>
    </>
  );
}
