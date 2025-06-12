import {
  ArticleOutlined,
  InsightsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";

export interface KeywordMatcherStep {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

const keywordMatcherSteps: KeywordMatcherStep[] = [
  {
    icon: ArticleOutlined,
    title: "Paste Job Description",
    description: "Copy any job listing and paste it into our tool.",
  },
  {
    icon: InsightsOutlined,
    title: "Analyze with AI",
    description: "Our AI analyzes the content and extracts relevant keywords.",
  },
  {
    icon: WorkOutline,
    title: "Match & Apply",
    description: "Use those keywords in your resume and improve your chances!",
  },
];

export default keywordMatcherSteps;
