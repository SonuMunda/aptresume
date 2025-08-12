import { themesColor } from "@/data/resume_builder/data";
import {
  setBackgroundColor,
  setPrimaryColor,
  setTextColor,
} from "@/store/slices/resume/formatSlice";
import { RootState } from "@/store/store";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import { PaletteOutlined } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";

const ThemeSection = () => {
  const { primaryColor, textColor, backgroundColor } = useSelector(
    (state: RootState) => state.format.data
  );
  const dispatch = useDispatch();

  const [primaryColorPicker, setPrimaryColorPicker] = useState(false);
  const [bgColorPicker, setBgColorPicker] = useState(false);
  const [textColorPicker, setTextColorPicker] = useState(false);

  const pclrpikrRef = useRef<HTMLDivElement>(null);
  const bgclrpikrRef = useRef<HTMLDivElement>(null);
  const txtclrpikrRef = useRef<HTMLDivElement>(null);

  // Shared click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pclrpikrRef.current &&
        !pclrpikrRef.current.contains(event.target as Node)
      )
        setPrimaryColorPicker(false);

      if (
        bgclrpikrRef.current &&
        !bgclrpikrRef.current.contains(event.target as Node)
      )
        setBgColorPicker(false);

      if (
        txtclrpikrRef.current &&
        !txtclrpikrRef.current.contains(event.target as Node)
      )
        setTextColorPicker(false);
    };

    if (primaryColorPicker || bgColorPicker || textColorPicker) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [primaryColorPicker, bgColorPicker, textColorPicker]);

  const handleChangePrimaryColor = (color: string) => {
    dispatch(setPrimaryColor(color));
  };

  const handleChangeBgColor = (color: string) => {
    dispatch(setBackgroundColor(color));
  };

  const handleChangeTextColor = (color: string) => {
    dispatch(setTextColor(color));
  };

  return (
    <Box className="theme flex flex-col gap-6 relative">
      <SectionHeading Icon={PaletteOutlined} heading="Theme" />

      {/* Primary Color Section */}
      <Box className="primary-color flex flex-col gap-4">
        <Box component={"div"} className="default-colors flex flex-wrap gap-2">
          {themesColor.map((item, index) => {
            return (
              <Box
                component={"div"}
                className="min-w-8 min-h-8 rounded-full cursor-pointer"
                sx={{
                  backgroundColor: item.color,
                }}
                onClick={() => dispatch(setPrimaryColor(item.color))}
                key={index}
              ></Box>
            );
          })}
        </Box>
        <Box className="selected-color">
          <Box component="h6" className="text-sm font-bold">
            Primary Color
          </Box>
          <Box className="flex items-center gap-4">
            <Box
              className="min-w-8 min-h-8 rounded-full cursor-pointer"
              sx={{
                bgcolor: primaryColor,
                border: 1,
                borderColor: "black",
              }}
              onClick={() => setPrimaryColorPicker(true)}
            />
            <Box
              ref={pclrpikrRef}
              className={`absolute top-0 z-2 ${
                primaryColorPicker ? "block" : "hidden"
              }`}
            >
              <HexColorPicker
                color={primaryColor}
                onChange={handleChangePrimaryColor}
              />
            </Box>
            <TextField
              value={primaryColor}
              onChange={(e) => handleChangePrimaryColor(e.target.value)}
              fullWidth
              slotProps={{
                htmlInput: {
                  style: {
                    height: "0.5rem",
                    fontSize: "medium",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Background Color Section */}
      <Box className="background-color">
        <Box className="selected-color">
          <Box component="h6" className="text-sm font-bold">
            Background Color
          </Box>
          <Box className="flex items-center gap-4">
            <Box
              className="min-w-8 min-h-8 rounded-full cursor-pointer"
              sx={{
                bgcolor: backgroundColor,
                border: 1,
                borderColor: "black",
              }}
              onClick={() => setBgColorPicker(true)}
            />
            <Box
              ref={bgclrpikrRef}
              className={`absolute top-0 z-2 ${
                bgColorPicker ? "block" : "hidden"
              }`}
            >
              <HexColorPicker
                color={backgroundColor}
                onChange={handleChangeBgColor}
              />
            </Box>
            <TextField
              value={backgroundColor}
              onChange={(e) => handleChangeBgColor(e.target.value)}
              slotProps={{
                htmlInput: {
                  style: {
                    height: "0.5rem",
                    fontSize: "medium",
                  },
                },
              }}
              fullWidth
            />
          </Box>
        </Box>
      </Box>

      {/* Text Color Section */}
      <Box className="text-color">
        <Box className="selected-color">
          <Box component="h6" className="text-sm font-bold">
            Text Color
          </Box>
          <Box className="flex items-center gap-4">
            <Box
              className="min-w-8 min-h-8 rounded-full cursor-pointer"
              sx={{
                bgcolor: textColor,
                border: 1,
                borderColor: "black",
              }}
              onClick={() => setTextColorPicker(true)}
            />
            <Box
              ref={txtclrpikrRef}
              className={`absolute top-0 z-2 ${
                textColorPicker ? "block" : "hidden"
              }`}
            >
              <HexColorPicker
                color={textColor}
                onChange={handleChangeTextColor}
              />
            </Box>
            <TextField
              value={textColor}
              onChange={(e) => handleChangeTextColor(e.target.value)}
              fullWidth
              slotProps={{
                htmlInput: {
                  style: {
                    height: "0.5rem",
                    fontSize: "medium",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThemeSection;
