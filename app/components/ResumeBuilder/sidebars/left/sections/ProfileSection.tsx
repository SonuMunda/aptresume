"use client";

import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import { DeleteOutline, LinkOutlined } from "@mui/icons-material";
import FormGroup from "@/ui/resume_builder/FormGroup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addProfile, removeProfile } from "@/store/slices/resume/profilesSlice";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.profiles.data);

  const [formData, setFormData] = useState({
    network: "",
    username: "",
    url: "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormIncomplete = !formData.network || !formData.username || !formData.url;

  const handleAddProfile = () => {
    if (formData.network || formData.username || formData.url) {
      dispatch(addProfile(formData));
      setFormData({ network: "", username: "", url: "" });
    }
  };

  const handleRemove = (index: number) => {
    dispatch(removeProfile(index));
  };

  return (
    <Box className="profile-section flex flex-col gap-6">
      <SectionHeading Icon={LinkOutlined} heading="Profiles" />
      <Box component="div" className="section-form flex flex-col gap-4">
        <Box component="div" className="flex items-center gap-2">
          <FormGroup
            id="profile-network"
            label="Network"
            placeholder="LinkedIn"
            value={formData.network}
            onChange={(e) => handleChange("network", e.target.value)}
          />
          <FormGroup
            id="profile-username"
            label="Username"
            placeholder="sonumunda1312"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </Box>
        <FormGroup
          id="profile-link"
          label="Profile Url"
          placeholder="linkedin.com/in/sonumunda1312"
          value={formData.url}
          onChange={(e) => handleChange("url", e.target.value)}
        />
        <Button variant="contained" disabled={isFormIncomplete} onClick={handleAddProfile}>
          Add Profile
        </Button>

        <List className="space-y-3" sx={{ width: "100%" }}>
          {profiles.map((profile, index) => (
            <ListItem
              key={index}
              className="border p-2 rounded  border-gray-300 flex justify-between items-start gap-4"
              disablePadding
            >
              <Box className="flex-1 flex flex-col gap-1">
                <Typography variant="h6" fontWeight="600">
                  {profile.network} - {profile.username}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {profile.url}
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
    </Box>
  );
};

export default ProfileSection;
