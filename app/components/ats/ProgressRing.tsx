import * as React from "react";
import { alpha, Box, CircularProgress, Typography } from "@mui/material";

interface ProgressRingProps {
  value: number;
  label?: string;
  size?: number;
  thickness?: number;
}

const getColorByValue = (value: number): string => {
  if (value >= 0 && value <= 33) return "#EF4444";
  if (value <= 66) return "#FACC15";
  return "#10B981";
};

const getLabelByValue = (value: number): string => {
    if (value >= 0 && value <= 33) return "Needs Improvement";
    if (value <= 66) return "Satisfactory";
    return "Excellent";
  };
  

export default function ProgressRing({
  value,
  label = getLabelByValue(value),
  size = 180,
  thickness = 6,
}: ProgressRingProps) {
  const color = getColorByValue(value);

  return (
    <Box position="relative" display="inline-flex">
      {/* background track */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: alpha(getColorByValue(value), 0.3),
          transform: "rotate(-90deg)",
        }}
      />

      {/* foreground progress */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={{
          color,
          position: "absolute",
          left: 0,
          [`& .MuiCircularProgress-circle`]: {
            strokeLinecap: "round",
          },
          transform: "rotate(-90deg)",
        }}
      />

      {/* center text */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          component="span"
          fontWeight={700}
          color="text.primary"
        >
          {`${Math.round(value)}`}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
