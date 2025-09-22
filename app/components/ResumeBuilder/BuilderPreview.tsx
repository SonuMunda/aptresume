"use client";

import React from "react";
import JakesResume from "./ResumeTemplates/JakesResume";
import MattysResume from "./ResumeTemplates/MattysResume";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const BuilderPreview = ({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { template } = useSelector((state: RootState) => state.format.data);

  return (
    <div className="flex items-center justify-center" ref={contentRef}>
      {template === "template01" && <JakesResume />}
      {template === "template02" && <MattysResume />}
    </div>
  );
};

export default BuilderPreview;
