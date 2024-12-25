export const formatCreateResume = async (formData: any) => {
  const formattedData = {
    resume_text: formData.resumeText,
    job_description_text: formData.jobDescriptionText,
  };
  return formattedData;
};

interface PayloadType {
  [key: string]: string | string[] | Record<string, number> | undefined;
  Name: string;
  Role: string;
  Email: string;
  Phone: string;
  LinkedIn: string;
  GitHub: string;
  "Educational Information": string;
  "Work Experience": string;
  matching_percentage: string;
  "matched keywords": Record<string, number>;
  "missing keywords": Record<string, number>;
  recommendations: string[];
}


export const formatResumeData = (resumeData: PayloadType) => {
  const basicValidations: {
    key: string;
    value: any;
  }[] = [];
  const recommendations: string[] = [];
  let keywords = {};

  for (const key in resumeData) {
    const value = resumeData[key];
    if (key === "matching_percentage") continue;

    if (key === "recommendations") {
      if (typeof value === "string") {
        const regex = /\.\s*number\s*\((.*?)\)/g;
        const matches = value.match(regex);
        if (matches) {
          matches.forEach(match => {
            const numbers = match.replace(/[\.\snumber\(\)]/g, '').split(',');
            recommendations.push(...numbers);
          });
        }
      } else if (Array.isArray(value)) {
        recommendations.push(...value);
      }
    } else if (["matched_keywords", "missing_keywords"].includes(key) && typeof value === "object") {
      keywords = { ...keywords, ...value };
    } else if (typeof value === "string" || typeof value === "boolean" || typeof value === "number" || value === null) {
      if (key !== "missing_keywords" && key !== "recommendations") {
        basicValidations.push({ key, value });
      }
    }
  }
  return { basicValidations, recommendations, keywords };
};
