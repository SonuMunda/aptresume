import {
  AddOutlined,
  DeleteOutline,
  EmojiEventsOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addAchievement,
  removeAchievement,
  toggleVisible
} from "@/store/slices/resume/achievementsSlice";
import TextEditorGroup from "@/ui/resume_builder/TextEditorGroup";

const AchievementSection = () => {
  const dispatch = useDispatch();
  const { data: achievements, visible } = useSelector(
    (state: RootState) => state.achievements
  );

  const [formData, setFormData] = useState({
    title: "",
    awarder: "",
    date: "",
    position: "",
    description: "",
  });

  const isFormIncomplete =
    !formData.title ||
    !formData.awarder ||
    !formData.date ||
    !formData.position;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.title.trim() === "") return;
    dispatch(addAchievement(formData));
    setFormData({
      title: "",
      awarder: "",
      date: "",
      position: "",
      description: "",
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeAchievement(index));
  };

  return (
    <Box className="achievements-section flex flex-col gap-6">
      <Box component={"div"} className="flex items-center justify-between">
        <SectionHeading Icon={EmojiEventsOutlined} heading="Achievements" />
        <IconButton onClick={() => dispatch(toggleVisible())}>
          {visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
        </IconButton>
      </Box>
      <Box className="section-form space-y-4">
        <Box className="flex  gap-2">
          <FormGroup
            id="achievement-title"
            label="Title"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("title", e.target.value)
            }
          />
          <FormGroup
            id="achievement-awarder"
            label="Awarder"
            value={formData.awarder}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("awarder", e.target.value)
            }
          />
        </Box>

        <Box className="flex gap-2">
          <FormGroup
            id="achievement-date"
            label="Date"
            value={formData.date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("date", e.target.value)
            }
          />
          <FormGroup
            id="achievement-position"
            label="Rank"
            value={formData.position}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("position", e.target.value)
            }
          />
        </Box>

        <TextEditorGroup
          id="achievement-description"
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
          Add Achievement
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {achievements.map((ach, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {ach.title} - {ach.position}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {ach.awarder} - {ach.date}
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

export default AchievementSection;
