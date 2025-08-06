import {
  UploadFile,
  Tune,
  Search,
  Edit,
  Work,
  RocketLaunch,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

type Step = {
  title: string;
  description: string;
  Icon: React.ElementType<SvgIconProps>;
  iconBgColor?: string;
};

const userJourneySteps: Step[] = [
  {
    title: "Upload Your Resume",
    description:
      "Easily upload your existing resume file to start the optimization process.",
    Icon: UploadFile,
  },
  {
    title: "Optimize with AI",
    description:
      "Our AI-powered ATS scanner analyzes and provides personalized tips to refine your resume for maximum impact.",
    Icon: Tune,
  },
  {
    title: "Extract Job Keywords",
    description:
      "Automatically extract and highlight key skills and keywords from job descriptions to tailor your resume.",
    Icon: Search,
  },
  {
    title: "Build Your Resume From Scratch",
    description:
      "Create your resume effortlessly from scratch using our builder with two clean, minimalist templates designed for clarity and professionalism.",
    Icon: Edit,
  },
  {
    title: "Browse Matching Jobs",
    description:
      "Explore curated job listings aggregated from multiple portals, tailored based on your optimized resume.",
    Icon: Work,
  },
  {
    title: "Apply & Get Hired",
    description:
      "Send optimized applications with confidence and accelerate your career growth.",
    Icon: RocketLaunch,
  },
];

export default userJourneySteps;
