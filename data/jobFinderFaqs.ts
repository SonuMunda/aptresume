type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What file formats are supported for resume upload?",
    answer: "Currently, we support only PDF format for resume uploads.",
  },
  {
    question: "How does the AI suggest jobs?",
    answer:
      "The AI analyzes your resume, extracts skills and experiences, and matches them with current job listings from trusted providers.",
  },
  {
    question: "Is my resume data stored or shared?",
    answer:
      "No, your resume data is processed temporarily and not stored or shared with third parties.",
  },
  {
    question: "Can I apply to jobs directly through this platform?",
    answer:
      "We redirect you to trusted job providers like Indeed, Naukri, or LinkedIn where you can apply directly.",
  },
  {
    question: "Can I upload another resume if I made changes?",
    answer:
      "Yes, you can re-upload a new resume at any time to get updated suggestions.",
  },
];

export default faqData;
