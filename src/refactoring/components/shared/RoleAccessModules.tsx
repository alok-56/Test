export const moduleAccess = [
    {
      role: "admin",
      allowedModules: [
        "dashboard",
        "thinkai",
        "it_terminology",
        "submissions",
        "users",
        "clients",
        "vendors",
        "hiring",
        "recruiters",
        "interview",
        "interview_preparation",
        "resume_analyzer",
        "hotlist",
        "recruitment",
        "resources",
        "training",
      ],
    },
    {
      role: "user",
      allowedModules: [
        "submissions",
        "it_terminology",
        "clients",
        "vendors",
        "recruiters",
        "interview",
        "interview_preparation",
        "resources",
        "training",
      ],
    },
    {
      role: "sourcing_manager",
      allowedModules: ["recruitment",],
    },
    {
      role: "training_manager",
      allowedModules: ["interview_preparation"],
    },
  ];