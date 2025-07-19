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
import {
  AddOutlined,
  DeleteOutline,
  VisibilityOffOutlined,
  VisibilityOutlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import FormGroup from "@/ui/resume_builder/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addCertification,
  removeCertification,
  toggleVisible
} from "@/store/slices/resume/certificationsSlice";
import TextEditorGroup from "@/ui/resume_builder/TextEditorGroup";

const CertificationsSection = () => {
  const dispatch = useDispatch();
  const { data: certifications, visible } = useSelector(
    (state: RootState) => state.certifications
  );

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    link: "",
    description: "",
  });

  const isFormIncomplete =
    !formData.title || !formData.issuer || !formData.date || !formData.link;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (formData.title.trim() === "") return;
    dispatch(addCertification(formData));
    setFormData({
      title: "",
      issuer: "",
      date: "",
      link: "",
      description: "",
    });
  };

  const handleRemove = (index: number) => {
    dispatch(removeCertification(index));
  };

  return (
    <Box className="certifications-section flex flex-col gap-6">
      <Box component={"div"} className="flex items-center justify-between">
        <SectionHeading
          Icon={WorkspacePremiumOutlined}
          heading="Certifications"
        />

        <IconButton onClick={() => dispatch(toggleVisible())}>
          {visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
        </IconButton>
      </Box>
      <Box className="section-form space-y-4">
        <Box className="flex  gap-2">
          <FormGroup
            id="certificate-title"
            label="Title"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("title", e.target.value)
            }
          />
          <FormGroup
            id="certificate-issuer"
            label="Issuer"
            value={formData.issuer}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("issuer", e.target.value)
            }
          />
        </Box>

        <Box className="flex gap-2">
          <FormGroup
            id="certificate-date"
            label="Date Issued"
            value={formData.date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("date", e.target.value)
            }
          />
          <FormGroup
            id="certificate-link"
            label="Link"
            value={formData.link}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("link", e.target.value)
            }
          />
        </Box>

        <TextEditorGroup
          id="certificate-description"
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
          Add Certification
        </Button>
      </Box>

      <List className="space-y-3" sx={{ width: "100%" }}>
        {certifications.map((cert, index) => (
          <ListItem
            key={index}
            className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
            disablePadding
          >
            <Box className="flex-1 flex flex-col gap-1">
              <Typography variant="h6" fontWeight="bold">
                {cert.title} - {cert.issuer}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {cert.link}
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

export default CertificationsSection;
