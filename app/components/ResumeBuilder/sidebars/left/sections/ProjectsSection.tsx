import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import {
  AddOutlined,
  AssignmentOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import FormGroup from "@/ui/resume_builder/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addProject, removeProject } from "@/store/slices/resume/projectsSlice";
import TextEditorGroup from "@/ui/resume_builder/TextEditorGroup";

const ProjectsSection = () => {
  const dispatch = useDispatch();
  const { data: projects } = useSelector((state: RootState) => state.projects);

  const [formData, setFormData] = useState({
    title: "",

    duration: "",
    link: "",
    keywords: "",
    description: "",
  });

  const isFormIncomplete =
    !formData.title ||
    !formData.duration ||
    !formData.link ||
    !formData.keywords ||
    !formData.description;
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.title.trim() === "") return;
    dispatch(addProject(formData));
    setFormData({
      title: "",
      duration: "",
      link: "",
      keywords: "",
      description: "",
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeProject(index));
  };

  return (
    <Box className="projects-section flex flex-col gap-6">
      <SectionHeading Icon={AssignmentOutlined} heading="Projects" />

      <Box className="section-form space-y-4">
        <FormGroup
          id="project-title"
          label="Project Title"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("title", e.target.value)
          }
        />

        <Box className="flex  gap-2">
          <FormGroup
            id="start-end-date"
            label="Duration"
            value={formData.duration}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("duration", e.target.value)
            }
          />
          <FormGroup
            id="project-link"
            label="Website"
            value={formData.link}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("link", e.target.value)
            }
          />
        </Box>

        <FormGroup
          id="project-keywords"
          label="Keywords"
          value={formData.keywords}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("keywords", e.target.value)
          }
        />

        <TextEditorGroup
          id="project-description"
          label="Description"
          value={formData.description}
          onChange={(newValue) => handleInputChange("description", newValue)}
        />

        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          fullWidth
          disabled={isFormIncomplete}
          onClick={handleAdd}
        >
          Add Project
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {projects.map((project, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {project.title} - {project.duration}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {project.link}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {project.keywords}
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

export default ProjectsSection;
