import { Box, Button, IconButton, List, ListItem, Typography } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import SectionHeading from "../../../../../../ui/resume_builder/SectionHeading";
import { AddOutlined, BuildOutlined, DeleteOutline } from "@mui/icons-material";
import FormGroup from "../../../../../../ui/resume_builder/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addSkill, removeSkill } from "@/store/slices/resume/skillsSlice";

const SkillsSection = () => {
  const dispatch = useDispatch();
  const { data: skills } = useSelector((state: RootState) => state.skills);

  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
  });

  const isFormIncomplete = !formData.title || !formData.keywords;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.title.trim() === "") return;
    dispatch(addSkill(formData));
    setFormData({
      title: "",
      keywords: "",
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeSkill(index));
  };

  return (
    <Box className="skills-section flex flex-col gap-6">
      <SectionHeading Icon={BuildOutlined} heading="Skills" />

      <Box className="section-form space-y-4">
        <FormGroup
          id="skill-title"
          label="Skill Title"
          value={formData.title}
          placeholder="Front End"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("title", e.target.value)
          }
        />
        <FormGroup
          id="skill-keywords"
          label="Skill Keywords"
          value={formData.keywords}
          placeholder="React JS, Tailwind etc"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("keywords", e.target.value)
          }
        />

        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          fullWidth
          disabled={isFormIncomplete}
          onClick={handleAdd}
        >
          Add Skill
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {skills.map((skill, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {skill.title}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {skill.keywords}
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

export default SkillsSection;
