export interface ATSReport {
  ats_resume_score: number;
  overall_assessment: string;
  breakdown_by_category: {
    tailoring: {
      score: number;
      max_score: number;
      feedback: string;
      matched_keywords: string[];
      missing_keywords: string[];
    };
    content: {
      score: number;
      max_score: number;
      feedback: string;
      skills_matched: string[];
      skills_missing: string[];
      achievements_identified: string[];
      experience_analysis: {
        years_found: number;
        seniority_level: string;
        feedback: string;
      };
      education_analysis: {
        degrees_identified: string[];
        feedback: string;
      };
      certifications: {
        found: string[];
        feedback: string;
      };
    };
    format: {
      score: number;
      max_score: number;
      feedback: string;
      file_size: string;
      file_type: string;
      is_readable_by_ats: boolean;
    };
    sections: {
      score: number;
      max_score: number;
      feedback: string;
      required_sections_present: string[];
      missing_sections: string[];
    };
    style: {
      score: number;
      max_score: number;
      feedback: string;
      font_consistency: boolean;
      bullet_points_used: boolean;
      tense_consistency: boolean;
      readability_feedback: {
        readability_score: number | null;
        sentence_complexity: string;
        passive_voice_usage: string;
        recommendations: string[];
      };
    };
    overall_score: {
      score: number;
      max_score: number;
      summary: string;
    };
  };
  recommendations_for_ats_optimization: string[];
  final_verdict: string;
}
