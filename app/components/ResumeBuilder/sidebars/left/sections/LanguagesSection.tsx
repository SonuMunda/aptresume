import {
  AddOutlined,
  DeleteOutline,
  TranslateOutlined,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addLanguage,
  removeLanguage,
} from "@/store/slices/resume/languagesSlice";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import SliderFormGroup from "@/ui/resume_builder/SliderFormGroup";
import FormGroup from "@/ui/resume_builder/FormGroup";

const LanguagesSection = () => {
  const dispatch = useDispatch();
  const { data: languages } = useSelector(
    (state: RootState) => state.languages
  );

  const [formData, setFormData] = useState({
    title: "",
    level: 1,
  });

  const isFormIncomplete = !formData.title;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.title.trim() === "") return;
    dispatch(addLanguage(formData));
    setFormData({
      title: "",
      level: 1,
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeLanguage(index));
  };

  return (
    <Box className="language-section flex flex-col gap-6">
      <SectionHeading Icon={TranslateOutlined} heading="Languages Known" />

      <Box className="section-form space-y-4">
        <FormGroup
          id="language-title"
          label="Title"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("title", e.target.value)
          }
        />

        <SliderFormGroup
          id="language-level"
          min={0}
          max={5}
          selectedValue={formData.level}
          step={1}
          label="Level"
          onChange={(value: number) => handleInputChange("level", value)}
        />

        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          fullWidth
          disabled={isFormIncomplete}
          onClick={handleAdd}
        >
          Add Language
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {languages.map((lang, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {lang.title}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Level {lang.level}/5
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

export default LanguagesSection;
