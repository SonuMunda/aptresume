"use client";

import { Box} from "@mui/material";
import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
// import ImageUpload from "./components/ImageUpload";
import FormGroup from "@/ui/resume_builder/FormGroup";
import {
  updateField,
} from "@/store/slices/resume/basicsSlice";
import { Person2Outlined } from "@mui/icons-material";
import SectionHeading from "@/ui/resume_builder/SectionHeading";

type BasicsTextField =
  | "fullname"
  | "headline"
  | "email"
  | "phone"
  | "location"
  | "portfolio";

const BasicSection = () => {
  const dispatch = useDispatch();
  const basics = useSelector((state: RootState) => state.basics);

  const handleChange = (field: BasicsTextField, value: string) => {
    dispatch(updateField({ field, value }));
  };

  // const handleImageUpload = (imageDataUrl: string) => {
  //   dispatch(setImage(imageDataUrl));
  // };


  return (
    <Box className="basic-section flex flex-col gap-4">
      <SectionHeading Icon={Person2Outlined} heading="Basic Information" />

      {/* <ImageUpload onChange={handleImageUpload} imagePreview={basics.image} /> */}

      <FormGroup
        id="fullname"
        label="Full Name"
        value={basics.fullname}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("fullname", e.target.value)
        }
      />

      <FormGroup
        id="headline"
        label="Headline"
        value={basics.headline}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("headline", e.target.value)
        }
      />

      <Box className="form-group flex gap-2">
        <FormGroup
          id="email"
          label="Email"
          value={basics.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("email", e.target.value)
          }
        />
        <FormGroup
          id="phone"
          label="Phone"
          value={basics.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("phone", e.target.value)
          }
        />
      </Box>

      <Box className="form-group flex gap-2">
        <FormGroup
          id="location"
          label="Location"
          value={basics.location}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("location", e.target.value)
          }
        />
        <FormGroup
          id="portfolio"
          label="Portfolio"
          value={basics.portfolio}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("portfolio", e.target.value)
          }
        />
      </Box>
    </Box>
  );
};

export default BasicSection;
