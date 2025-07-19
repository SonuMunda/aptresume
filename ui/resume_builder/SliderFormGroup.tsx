import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const SliderFormGroup = ({
  id,
  min,
  max,
  step,
  selectedValue,
  label,
  onChange,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  selectedValue: number;
  label: string;
  onChange: (value: number) => void;
}) => {
  return (
    <Box component={"div"} className="slider-group">
      <Box component={"label"} htmlFor={id} className="text-sm font-semibold">
        {label}
      </Box>
      <Box component={"div"} className="flex items-center gap-4">
        <Slider
          min={min}
          max={max}
          step={step}
          id={id}
          value={selectedValue}
          sx={{ color: "inherit" }}
          onChange={(_, value) => onChange(value as number)}
        />
        <Typography variant="h6" component={"h6"} fontWeight={"bold"}>
          {selectedValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default SliderFormGroup;
