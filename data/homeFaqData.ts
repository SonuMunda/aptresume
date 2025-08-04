type FAQItem = {
    question: string;
    answer: string;
  };
  
  const homeFaqData: FAQItem[] = [
    {
      question: "What is AptResume and how can it help me?",
      answer:
        "AptResume is an all-in-one platform designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS), find relevant keywords from job descriptions, build professional resumes, and search for jobs—all in one place.",
    },
    {
      question: "What file formats are supported for resume scanning?",
      answer:
        "We currently support PDF, DOC, and DOCX formats for resume uploads to ensure compatibility with most applicant tracking systems.",
    },
    {
      question: "How does the ATS scanner evaluate my resume?",
      answer:
        "Our scanner analyzes your resume based on ATS standards—checking for keyword relevance, formatting, and overall structure—then provides a score and actionable suggestions.",
    },
    {
      question: "How does the keyword finder work?",
      answer:
        "It extracts essential skills and keywords from the job description and compares them with your resume to ensure alignment and boost ATS compatibility.",
    },
    {
      question: "How many resume templates are available?",
      answer:
        "Currently, AptResume offers 2 professionally designed templates that are simple, clean, and ATS-friendly.",
    },
    {
      question: "Can I edit my resume later after building it?",
      answer:
        "At the moment, once you generate and download a resume, you cannot make edits to it from scratch within the builder. You’ll need to start a new one if you want to make updates.",
    },
    {
      question: "Are the resume templates optimized for ATS?",
      answer:
        "Yes, all our templates follow formatting best practices to ensure they pass through applicant tracking systems without issues.",
    },
    {
      question: "Can I search for jobs directly through AptResume?",
      answer:
        "Yes. You can explore thousands of real-time job listings based on your role, skills, or location—helping you discover opportunities that match your profile.",
    },
    {
      question: "Is my data safe on AptResume?",
      answer:
        "Yes, your data is securely processed and stored. We never share your personal information with third parties without your consent.",
    },
    {
      question: "Is AptResume free to use?",
      answer:
        "Core features such as resume scanning, keyword matching, and basic resume building are free to use. Premium features may be introduced in the future.",
    },
  ];
  
  export default homeFaqData;
  