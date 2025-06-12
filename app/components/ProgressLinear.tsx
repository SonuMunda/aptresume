import * as React from "react";
import {
  Box,
  LinearProgress,
  Typography,
  alpha,
  linearProgressClasses,
} from "@mui/material";

interface LinearBarProps {
  value: number;
  height?: number;
  showLabel?: boolean;
}

const getColorByValue = (value: number): string => {
  if (value >= 0 && value <= 33) return "#EF4444"; // Red
  if (value <= 66) return "#FACC15"; // Yellow
  return "#10B981"; // Green
};

const getLabelByValue = (value: number): string => {
  if (value >= 0 && value <= 33) return "Needs Improvement";
  if (value <= 66) return "Satisfactory";
  return "Excellent";
};

export default function ProgressLinear({
  value,
  height = 24,
  showLabel = true,
}: LinearBarProps) {
  const color = getColorByValue(value);
  const label = getLabelByValue(value);

  return (
    <Box sx={{ width: "100%" }}>
      {showLabel && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(value)}`}
          </Typography>
        </Box>
      )}

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height,
          borderRadius: 4,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 4,
            backgroundColor: color,
          },
          backgroundColor: alpha(getColorByValue(value), 0.3), 
        }}
      />
    </Box>
  );
}
