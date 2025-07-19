import React from "react";

import { Card, CardMedia, Box, Typography } from "@mui/material";
const ResumeTemplateCard = ({ title, url }: { title: string; url: string }) => {
  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      {/* Thumbnail Image */}
      <CardMedia
        component="img"
        image={url}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay on hover */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          left: 0,
          color: "#000000",
          background: "rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, p: 1 }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
};

export default ResumeTemplateCard;
