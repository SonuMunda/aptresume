import { Box, Button, Typography } from "@mui/material";

export default function ResumeNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Box className="text-center p-8">
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          404 - Resume Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-6">
          The resume you’re looking for does not exist or has been removed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/resume-scan"
          sx={{ textTransform: "none", marginTop: "1rem" }}
        >
          Upload Another Resume
        </Button>
      </Box>
    </div>
  );
}
