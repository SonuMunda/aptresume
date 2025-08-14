import { setPageMargin, setPageSize } from "@/store/slices/resume/formatSlice";
import { RootState } from "@/store/store";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import SliderFormGroup from "@/ui/resume_builder/SliderFormGroup";
import { ArticleOutlined } from "@mui/icons-material";
import { Box, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PageFormattingSection = () => {
  const { pageMargin, pageSize } = useSelector(
    (state: RootState) => state?.format.data
  );
  const dispatch = useDispatch();

  const changePageSize = (value: string) => {
    dispatch(setPageSize(value));
  };

  const changePageMargin = (value: number) => {
    dispatch(setPageMargin(value));
  };

  return (
    <Box component={"div"} className="format flex flex-col gap-6 relative">
      {/* Heading */}
      <SectionHeading Icon={ArticleOutlined} heading={"Page Formatting"} />

      {/* Page Size */}
      <Box component={"div"} className="font-size-group">
        <Box component={"label"} className="text-sm font-bold">
          Page Size
        </Box>
        <Select
          variant="outlined"
          value={pageSize}
          defaultValue={pageSize}
          onChange={(e) => changePageSize(e.target.value)}
          fullWidth
          sx={{
            height: 40,
            fontSize: "medium",
          }}
        >
          <MenuItem value={"A4"} selected>
            A4
          </MenuItem>
          <MenuItem value={"LETTER"}>Letter</MenuItem>
        </Select>
      </Box>

      {/* margin */}
      <Box component={"div"} className="flex flex-col">
        <SliderFormGroup
          id="page-margin"
          label="Page Margin"
          min={1}
          max={40}
          step={1}
          selectedValue={pageMargin}
          onChange={(value: number) => changePageMargin(value)}
        />
      </Box>
    </Box>
  );
};

export default PageFormattingSection;
