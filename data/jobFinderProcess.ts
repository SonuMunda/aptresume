import {
  UploadFileOutlined,
  SettingsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { ElementType } from "react";

interface Process {
  icon: ElementType;
  bgColor: string;
  title: string;
  description: string;
}

const processes: Process[] = [
  {
    icon: UploadFileOutlined,
    bgColor: "pink",
    title: "1. Upload Your Resume",
    description:
      "Upload your resume in PDF or Word format. Our system supports multiple file types for a seamless experience.",
  },
  {
    icon: SettingsOutlined,
    bgColor: "green",
    title: "2. Smart Analysis",
    description:
      "Our advanced algorithms analyze your skills, experience, and qualifications to find the best job matches.",
  },
  {
    icon: WorkOutline,
    bgColor: "blue",
    title: "3. Get Job Recommendations",
    description:
      "Receive personalized job listings tailored to your profile, with direct links to apply.",
  },
];

export default processes;
