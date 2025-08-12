import SectionHeading from "@/ui/resume_builder/SectionHeading";
import { FontDownloadOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { fonts } from "@/data/resume_builder/data";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setFont,
  setFontSize,
  setLineHeight,
} from "@/store/slices/resume/formatSlice";
import SliderFormGroup from "@/ui/resume_builder/SliderFormGroup";

const TypographySection = () => {
  const dispatch = useDispatch();
  const { font, fontSize, lineHeight } = useSelector(
    (state: RootState) => state.format.data
  );

  const changeFontSize = (value: number) => {
    dispatch(setFontSize(value));
  };

  const changeLineHeight = (value: number) => {
    dispatch(setLineHeight(value));
  };

  return (
    <Box component="div" className="typography flex flex-col gap-6">
      {/* Heading */}
      <SectionHeading Icon={FontDownloadOutlined} heading="Typography" />

      {/* Available Fonts */}
      <Box component={"div"}>
        <Box component={"h6"} className="text-sm font-semibold">
          Available Fonts
        </Box>
        <Box
          component="div"
          className="available-fonts grid grid-cols-2 gap-2"
          id="fonts"
        >
          {fonts.map((item, index) => {
            return (
              <Button
                variant="text"
                sx={{
                  color: "text.secondary",
                  border: `2px solid ${
                    item.font_name === font ? "blue" : "gray"
                  }`,
                  backgroundColor:
                    item.font_name === font
                      ? "rgba(0, 0, 255, 0.1)"
                      : "transparent",
                  fontFamily: `${item.font_name}, sans-serif`,
                  textTransform: "none",
                  padding: "0.5rem",
                }}
                key={index}
                onClick={() => dispatch(setFont(item.font_name))}
              >
                {item.font_name}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Font Size */}
      <Box component="div" className="flex flex-col">
        <SliderFormGroup
          id="font-size"
          label="Font Size"
          min={10}
          max={36}
          step={1}
          selectedValue={fontSize}
          onChange={(value: number) => changeFontSize(value)}
        />
      </Box>

      {/* Line Height */}
      <SliderFormGroup
        id="line-height"
        label="Line Height"
        min={1}
        max={3}
        step={0.1}
        selectedValue={lineHeight}
        onChange={(value: number) => changeLineHeight(value)}
      />
    </Box>
  );
};

export default TypographySection;
