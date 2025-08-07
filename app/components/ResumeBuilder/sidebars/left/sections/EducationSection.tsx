import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import FormGroup from "@/ui/resume_builder/FormGroup";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import { DeleteOutline, SchoolOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  addEducation,
  removeEducation,
} from "@/store/slices/resume/educationSlice";

const EducationSection = () => {
  const dispatch = useDispatch();
  const { data: educations } = useSelector(
    (state: RootState) => state.education
  );

  const [formData, setFormData] = useState({
    institute: "",
    title: "",
    area: "",
    score: "",
    date: "",
  });

  const isFormIncomplete =
    !formData.institute || !formData.title || !formData.date;
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.institute.trim() === "") return;
    dispatch(addEducation(formData));
    setFormData({
      institute: "",
      title: "",
      area: "",
      score: "",
      date: "",
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeEducation(index));
  };

  return (
    <Box className="education-section flex flex-col gap-6">
      <SectionHeading heading="Education" Icon={SchoolOutlined} />

      <Box className="section-form space-y-4">
        <Box className="flex  gap-2">
          <FormGroup
            id="education-institute"
            label="Institute"
            value={formData.institute}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("institute", e.target.value)
            }
          />
          <FormGroup
            id="education-title"
            label="Course Title"
            value={formData.title}
            placeholder="B.Tech"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("title", e.target.value)
            }
          />
        </Box>

        <Box className="flex  gap-2">
          <FormGroup
            id="education-area"
            label="Area of Study"
            value={formData.area}
            placeholder="Computer Science"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("area", e.target.value)
            }
          />
          <FormGroup
            id="education-score"
            label="Score"
            value={formData.score}
            placeholder="9.5 CGPA"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("score", e.target.value)
            }
          />
        </Box>

        <FormGroup
          id="education-date"
          label="Date Range"
          placeholder="May, 2025 - Current"
          value={formData.date}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("date", e.target.value)
          }
        />

        <Button
          variant="contained"
          fullWidth
          disabled={isFormIncomplete}
          onClick={handleAdd}
        >
          Add Education
        </Button>
      </Box>

      <List className="space-y-4">
        {educations.map((edu, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography
                fontWeight="extrabold"
                variant="h6"
                className="text-gray-800"
              >
                {edu.institute || "Untitled Institute"}
              </Typography>

              <Typography variant="h6" color="text.secondary">
                {edu.title} — {edu.area}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Score: {edu.score || "N/A"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {edu.date || "Date not specified"}
              </Typography>
            </Box>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleRemove(index)}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EducationSection;
