type FAQItem = {
    question: string;
    answer: string;
  };
  
  const atsScanFaqData: FAQItem[] = [
    {
      question: "What file formats are supported for resume scanning?",
      answer: "We currently support PDF, DOC, and DOCX formats for resume uploads.",
    },
    {
      question: "How does the ATS scanner evaluate my resume?",
      answer:
        "The AI analyzes your resume against ATS algorithms, checking for keyword relevance, formatting, and structure to provide an optimization score.",
    },
    {
      question: "Is my resume data secure during scanning?",
      answer:
        "Yes, your resume data is processed securely. It is stored for up to 30 days to improve our services and is not shared with third parties unless required by law.",
    },
    {
      question: "What kind of optimization tips will I receive?",
      answer:
        "You’ll get personalized suggestions, such as adding key skills, improving layout, or adjusting keywords to align with ATS requirements.",
    },
    {
      question: "Can I rescan my resume after making changes?",
      answer:
        "Absolutely, you can upload an updated resume anytime to see how your changes impact the ATS score.",
    },
  ];
  
  export default atsScanFaqData;