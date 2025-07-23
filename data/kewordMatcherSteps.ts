import {
  ArticleOutlined,
  InsightsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";

export interface KeywordMatcherStep {
  Icon: SvgIconComponent;
  iconBgColor: string;
  title: string;
  description: string;
}

const keywordMatcherSteps: KeywordMatcherStep[] = [
  {
    Icon: ArticleOutlined,
    iconBgColor: "bg-orange-600",
    title: "Paste Job Description",
    description: "Copy any job listing and paste it into our tool.",
  },
  {
    Icon: InsightsOutlined,
    iconBgColor: "bg-green-600",
    title: "Analyze with AI",
    description: "Our AI analyzes the content and extracts relevant keywords.",
  },
  {
    Icon: WorkOutline,
    iconBgColor: "bg-blue-600",
    title: "Match & Apply",
    description: "Use those keywords in your resume and improve your chances!",
  },
];

export default keywordMatcherSteps;
