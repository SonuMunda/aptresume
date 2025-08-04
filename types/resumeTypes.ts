export interface ResumeBuilderData {
  basics: {
    fullname: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    visible: boolean;
  };

  summary: {
    summary: string;
    visible: boolean;
  };

  profiles: {
    items: { network: string; username: string; url: string }[];
  };

  experience: {
    items: {
      company: string;
      position: string;
      date: string;
      location: string;
      description: string;
    }[];
    visible: boolean;
  };

  education: {
    items: {
      institute: string;
      course: string;
      date: string;
      coursetype: string;
      score: string;
    }[];
    visible: boolean;
  };

  skills: {
    items: {
      name: string;
      keywords?: string[];
    }[];
    visible: boolean;
  };

  certifications: {
    items: {
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }[];
    visible: boolean;
  };

  languages: {
    items: {
      language: string;
      fluency: string;
    }[];
    visible: boolean;
  };

  hobbies: {
    items: {
      name: string;
      keywords: string;
    }[];
    visible: boolean;
  };

  projects: {
    items: {
      name: string;
      description: string;
      url?: string;
      date?: string;
      technologies?: string[];
    }[];
    visible: boolean;
  };
}
