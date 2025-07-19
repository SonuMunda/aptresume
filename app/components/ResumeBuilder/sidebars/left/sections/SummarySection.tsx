"use client";

import { Box, IconButton } from "@mui/material";
import React from "react";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import {
  ArticleOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import FormGroup from "@/ui/resume_builder/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSummary, toggleVisible } from "@/store/slices/resume/summarySlice";

const SummarySection = () => {
  const dispatch = useDispatch();
  const { data: summary, visible } = useSelector(
    (state: RootState) => state.summary
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setSummary(e.target.value));
  };

  return (
    <Box className="summary-section flex flex-col gap-6">
      <Box component={"div"} className="flex items-center justify-between">
        <SectionHeading Icon={ArticleOutlined} heading="Summary" />
        <IconButton onClick={() => dispatch(toggleVisible())}>
          {visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
        </IconButton>
      </Box>
      <Box component="div" className="section-form">
        <FormGroup
          label="Summary"
          id="summary"
          value={summary}
          onChange={handleChange}
          multiline
          rows={6}
        />
      </Box>
    </Box>
  );
};

export default SummarySection;
