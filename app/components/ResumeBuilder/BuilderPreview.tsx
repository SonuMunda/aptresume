"use client";

import React from "react";
import JakesResume from "./ResumeTemplates/JakesResume";
import MattysResume from "./ResumeTemplates/MattysResume";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const BuilderPreview = () => {
  const { template } = useSelector((state: RootState) => state.format.data);

  return (
    <>
      {template === "template01" && <JakesResume />}
      {template === "template02" && <MattysResume />}
    </>
  );
};

export default BuilderPreview;
