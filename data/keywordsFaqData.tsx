type FAQItem = {
    question: string;
    answer: string;
  };
  
  const keywordsFaqData: FAQItem[] = [
    {
      question: "What does the keyword extraction tool do?",
      answer:
        "Our keyword extraction tool analyzes job descriptions you provide and identifies the most relevant keywords, such as skills, qualifications, and industry terms, to help you optimize your resume for Applicant Tracking Systems (ATS) and increase your chances of getting noticed by recruiters.",
    },
    {
      question: "How do I use the extracted keywords in my resume?",
      answer:
        "Incorporate the extracted keywords naturally into your resume’s sections, such as work experience, skills, and summary. Ensure they align with the job description while maintaining clarity and authenticity to improve ATS compatibility and recruiter appeal.",
    },
    {
      question: "Can the tool extract keywords from any job description?",
      answer:
        "Yes, the tool can process job descriptions in plain text format from any source, such as job boards, company websites, or PDFs (after text extraction). Simply paste the job description into the input field to get started.",
    },
    {
      question: "How accurate are the extracted keywords?",
      answer:
        "Our tool uses advanced natural language processing to identify keywords with high relevance to the job description. While highly accurate, we recommend reviewing the keywords to ensure they fit the specific role and your qualifications.",
    },
    {
      question: "Is my job description data secure?",
      answer:
        "Absolutely, your job description data is processed securely and only used for keyword extraction. We store data temporarily to improve our services and do not share it with third parties unless required by law.",
    },
  ];
  
  export default keywordsFaqData;