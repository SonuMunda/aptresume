import {
  AddOutlined,
  DeleteOutline,
  VideogameAssetOutlined,
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
import SectionHeading from "../../../../../../ui/resume_builder/SectionHeading";
import FormGroup from "../../../../../../ui/resume_builder/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addHobby, removeHobby } from "@/store/slices/resume/hobbiesSlice";

const HobbiesSection = () => {
  const dispatch = useDispatch();
  const { data: hobbies } = useSelector((state: RootState) => state.hobbies);

  const [formData, setFormData] = useState({
    title: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.title.trim() === "") return;
    dispatch(addHobby(formData));
    setFormData({
      title: "",
    });
  };

  const isFormIncomplete = !formData.title;

  const handleRemove = (index: number) => {
    dispatch(removeHobby(index));
  };

  return (
    <Box className="summary-section flex flex-col gap-6">
      <SectionHeading Icon={VideogameAssetOutlined} heading="Hobbies" />

      <Box className="section-form space-y-4">
        <FormGroup
          id="hobby-title"
          label="Title"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("title", e.target.value)
          }
        />

        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          fullWidth
          disabled={isFormIncomplete}
          onClick={handleAdd}
        >
          Add Certification
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {hobbies.map((hobby, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {hobby.title}
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

export default HobbiesSection;
