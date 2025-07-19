import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import FormGroup from "@/ui/resume_builder/FormGroup";
import {
  AddOutlined,
  DeleteOutline,
  VisibilityOffOutlined,
  VisibilityOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addExperience,
  removeExperience,
  toggleVisible,
} from "@/store/slices/resume/experienceSlice";
import TextEditorGroup from "@/ui/resume_builder/TextEditorGroup";

const ExperienceSection = () => {
  const dispatch = useDispatch();
  const { data: experiences, visible } = useSelector(
    (state: RootState) => state.experience
  );

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    date: "",
    description: "",
  });

  const isFormIncomplte =
    !formData.company ||
    !formData.position ||
    !formData.date ||
    !formData.description;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.company.trim() === "") return;
    dispatch(addExperience(formData));
    setFormData({
      company: "",
      position: "",
      location: "",
      date: "",
      description: "",
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeExperience(index));
  };

  return (
    <Box className="experience-section flex flex-col gap-6">
      <Box component={"div"} className="flex justify-between items-center">
        <SectionHeading Icon={WorkOutline} heading="Experience" />

        <IconButton onClick={() => dispatch(toggleVisible())}>
          {visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
        </IconButton>
      </Box>
      <Box className="section-form space-y-4">
        <FormGroup
          id="experience-company"
          label="Company"
          value={formData.company}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("company", e.target.value)
          }
        />

        <Box className="flex gap-2">
          <FormGroup
            id="experience-position"
            label="Position"
            value={formData.position}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("position", e.target.value)
            }
          />
          <FormGroup
            id="experience-location"
            label="Location"
            value={formData.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("location", e.target.value)
            }
          />
        </Box>

        <FormGroup
          id="experience-date"
          label="Date Range"
          placeholder="May 2020 - Aug 2020"
          value={formData.date}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("date", e.target.value)
          }
        />

        <TextEditorGroup
          id="experience-description"
          label="Description"
          value={formData.description}
          onChange={(newValue) => handleInputChange("description", newValue)}
        />

        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={handleAdd}
          fullWidth
          disabled={isFormIncomplte}
        >
          Add Experience
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {experiences.map((exp, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {exp.company || "Untitled Company"} - {exp.position}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {exp.location && `  ${exp.location}`}
                {exp.date && ` - ${exp.date}`}
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

export default ExperienceSection;
