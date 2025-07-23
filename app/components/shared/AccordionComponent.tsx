import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

interface AccordionProps {
  question: string;
  answer: string;
}

const AccordionComponent = ({ question, answer }: AccordionProps) => {
  return (
    <Accordion
      elevation={2}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        "&:before": { display: "none" },
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMore sx={{ color: "#1e40af", fontSize: "1.5rem" }} />
        }
        sx={{
          p: 2,
          borderRadius: 4,
          "& .MuiTypography-root": {
            fontWeight: 600,
            fontSize: "1.125rem",
            color: "#1f2937",
            lineHeight: "1.5",
          },
        }}
      >
        <Typography component="h6">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: 4,
          py: 3,
          backgroundColor: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
          "& p": { fontSize: "1rem", color: "#4b5563" },
        }}
      >
        <Typography component="p" variant="body2" className="text-gray-700">
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
