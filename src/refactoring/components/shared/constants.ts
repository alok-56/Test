class AppConstants {
  static salesRecruiterList = [
    { value: "Tarun Gundu", label: "Tarun Gundu" },
    { value: "Dileep Kumar Bodeddu", label: "Dileep Kumar Bodeddu" },
    { value: "Vamsi Krishna", label: "Vamsi Krishna" },
    { value: "Pushpak Kumar", label: "Pushpak Kumar" },
    { value: "Sai Uttej Ponnada", label: "Sai Uttej Ponnada" },
    { value: "Sam", label: "Sam" },
    { value: "Self", label: "Self" },
    { value: "Others", label: "Others" },
  ];

  static StatusList = [
    {
      value: "Direct Client Interview",
      label: "Direct Client Interview",
      color: "orange",
    },
    {
      value: "Implementer Interview",
      label: "Implementer Interview",
      color: "geekblue",
    },
    {
      value: "Position Confirmed",
      label: "Position Confirmed",
      color: "green",
    },
    { value: "First Round", label: "First Round", color: "gold" },
    { value: "No Response", label: "No Response", color: "purple" },
    {
      value: "Vendor Technical Screening",
      label: "Vendor Technical Screening",
      color: "blue",
    },
    {
      value: "Interview Scheduled",
      label: "Interview Scheduled",
      color: "volcano",
    },
    { value: "Rejected", label: "Rejected", color: "red" },
    { value: "Comments", label: "Comments", color: "magenta" },
    { value: "Written Test", label: "Written Test", color: "cyan" },
    { value: "Coding Test", label: "Coding Test", color: "geekblue" },
    { value: "Applied", label: "Applied", color: "volcano" },
    { value: "FAQ", label: "FAQ", color: "yellow" },
  ];

  static Days = [
    { value: 1, label: "Last Day" },
    { value: 7, label: "Last 7 Days" },
    { value: 10, label: "Last 10 Days" },
    { value: 20, label: "Last 20 Days" },
    { value: 30, label: "Last 30 Days" },
    { value: "custom", label: "custom" },
  ];

  static RecruitmentStatus = [
    { value: "Open", label: "Open" },
    { value: "Hold", label: "Hold" },
    { value: "Closed", label: "Closed" },
  ];
  static RecruitmentSubmissionStatus = [
    { value: "Sourcing", label: "Sourcing" },
    { value: "Submitted", label: "Submitted" },
    { value: "Interview Requested", label: "Interview Requested" },
    { value: "Position Offered", label: "Position Offered" },
    { value: "Database", label: "Database" },
  ];

  static RecruitmentPositionType = [
    // { value: "Contract", label: "Contract" },
    // { value: "Full Time", label: "Full Time" },
    // { value: "W2", label: "W2" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  static LocationType = [
    { value: "Remote", label: "Remote" },
    { value: "On-site", label: "On-site" },
    { value: "Hybrid", label: "Hybrid" },
  ];
  static SourcingType = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "Looking for Better Job", label: "Looking for Better Job" },
    { value: "Unkown", label: "Unkown" },
  ];

  static addressType=[
    { value: "Office", label: "Office" },
    { value: "Home", label: "Home" },
  ]


  static Users = [
    { value: "onlyUsers", label: "Active Users" },
    { value: "inactiveUsers", label: "InActive Users" },
    { value: "onlyAdmins", label: "Admins" },
    { value: "", label: "All" },
  ];

  static Priority = [
    { label: "P1", value: "P1" },
    { label: "P2", value: "P2" },
    { label: "P3", value: "P3" },
    { label: "H1BT", value: "H1BT" },
    { value: "", label: "All" },
  ];

  static visaStatus = [
    { value: "CPT", label: "CPT" },
    { value: "OPT N", label: "STEM OPT" },
    { value: "OPT E", label: "OPT/OPT E" },
    { value: "H1B", label: "H1B" },
    { value: "H1B T", label: "H1B T" },
    { value: "H4", label: "H4" },
    { value: "GC", label: "GC" },
  ];

  static colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
    "pink",
  ];

  static interviewStatus = [
    { value: "Pass", label: "Pass" },
    { value: "TBD", label: "TBD" },
    { value: "Awaiting", label: "Awaiting" },
    { value: "Rejected", label: "Rejected" },
  ];
  static  authRole = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "sourcing_manager", label: "Sourcing Manager" },
    { value: "training_manager", label: "Training Manager" },
  ];
  static jobRole= [
    { value: "HR", label: "HR" },
    { value: "Consultant", label: "Consultant" },
    { value: "Recruiter", label: "Recruiter" },
    { value: "Tech", label: "Tech" },
    { value: "Lead", label: "Lead" },
    { value: "RM", label: "RM" },
  ]


  static relocateToOffice= [
    { value: "YES", label: "YES" },
    { value: "No", label: "No" },
  ]
  static anyUSALocation= [
    { value: "YES", label: "YES" },
    { value: "No", label: "No" },
  ]
  static status = [
    { value: "Yet to Review ", label: "Yet to Review " },
    { value: "On Hold", label: "On Hold" },
    { value: "Added To Portal", label: "Added To Portal" },
  ] 
}

export default AppConstants;
