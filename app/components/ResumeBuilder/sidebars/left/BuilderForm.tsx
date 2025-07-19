"use client";

import { Box, Divider } from "@mui/material";
import BasicSection from "./sections/BasicSection";
import SummarySection from "./sections/SummarySection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProfileSection from "./sections/ProfileSection";
import AchievementSection from "./sections/AchievementSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificationsSection from "./sections/CertificationsSection";
import SkillsSection from "./sections/SkillsSection";
import HobbiesSection from "./sections/HobbiesSection";
import LanguagesSection from "./sections/LanguagesSection";
const ResumeBuilderForm = () => {
  return (
    <Box
      component={"aside"}
      className="sidebar-left relative h-screen w-full sm:w-sm max-w-sm p-4 border-r border-gray-300  overflow-y-auto"
    >
      <Box component={"div"} className="builder-form flex flex-col gap-10">
        <BasicSection />
        <Divider />
        <ProfileSection />
        <Divider />
        <SummarySection />
        <Divider />
        <EducationSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <AchievementSection />
        <Divider />
        <CertificationsSection />
        <Divider />
        <SkillsSection />
        <Divider />
        <LanguagesSection />
        <Divider />
        <HobbiesSection />
      </Box>
    </Box>
  );
};

export default ResumeBuilderForm;
