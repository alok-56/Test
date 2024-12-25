export interface ClientCompanyData {
  _id: string;
  tags: string[];
  company_id: string;
  name: string;
  auditInfo: {
    createdUserID: string;
    createdUserName: string;
    updatedUserid: string | null;
    updatedUserName: string | null;
    createdDate: string | null;
    updatedDate: string | null;
  };
}

export interface RecruiterData {
  _id: string;
  tags: string[];
  company_id: string;
  type: string;
  company_name: string;
  rec_id: string;
  name: string;
  email: string;
  contact: string;
  auditInfo: {
    createdUserID: string;
    createdUserName: string;
    updatedUserid: string | null;
    updatedUserName: string | null;
    createdDate: string | null;
    updatedDate: string | null;
  };
}

export interface VendorCompanyData {
  _id: string;
  tags: string[];
  company_id: string;
  name: string;
  auditInfo: {
    createdUserID: string;
    createdUserName: string;
    updatedUserid: string | null;
    updatedUserName: string | null;
    createdDate: string | null;
    updatedDate: string | null;
  };
}

export interface InterviewData {
  submission_id: string;
  status: string;
  comments: string;
  start_time: number;
  end_time: number;
  mode: string;
  inviteReceived: boolean;
  interviewQuestions: string;
  panel: [
    {
      name: string;
      mailID: string;
      linkedinID: string;
    }
  ];
}
export interface ISubmissionData {
  _id: string;
  tags: string[];
  subDetails: {
    profile: {
      _id: string;
      name: string;
    };
    client: {
      company_id: string;
      name: string;
      recruiter: {
        rec_id: string;
        name: string;
        email: string;
        contact: string;
      };
    };
    vendor: {
      company_id: string;
      name: string;
      recruiter: {
        rec_id: string;
        name: string;
        email: string;
        contact: string;
      };
    };
    primeVendor: {
      company_id: string;
      name: string;
      recruiter: {
        rec_id: string;
        name: string;
        email: string;
        contact: string;
      };
    };
    date: string;
    jobRole: string;
    jobDescription: string;
    salesRecruiter: string;
    status: string;
    workLocation: string;
    uploads:any
    comments: string;
  };
  addOns: Record<string, unknown>;
  auditInfo: {
    createdUserID: string;
    createdUserName: string;
    updatedUserid: string;
    updatedUserName: string;
    createdDate: string;
    updatedDate: string;
  };
}

export interface UserData {
  addOns: any;
  attachment: any;
  guestHouseDate: number;
  marketingStartDate: number;
  auditInfo: {
    createdDate: number;
    createdUserID: string;
    createdUserName: string;
    updatedDate: number;
    updatedUserName: string;
    updatedUserid: string;
  };
uploads:any
  credentials: {
    password: string;
  };

  educationDetails: [
    {
      degree: string;
      graduationDate: string;
      specialization: string;
      university: string;
    }
  ];

  jobInfo: [
    {
      employerBusiness: string;
      employerName: string;
      employerType: string;
      endDate: number;
      jobDuties: string;
      jobTitle: string;
      skills: string;
      startDate: string;
    }
  ];

  personalInfo: {
    dlNumber: string;
    dob: string;
    linkedinID: string;
    passportNo: string;
    referredBy: string;
    statesEntryDate: string;
    visaStartDate: string;
    visaStatus: string;
  };

  primaryTechnology: string;

  profile: {
    _id: string;
    active: string;
    address: {
      addressLine1: string;
      city: string;
      country: string;
      sddressLine2: string;
      state: string;
      type: string;
      zipCode: string;
    };
    authRole: string;
    currentLocation: string;
    email: string;
    firstName: string;
    gender: string;
    jobRole: string;
    lastName: string;
    middleName: string;
    mobile: string;
  };

  secondaryTechnology: string;
  tags: string[];
}

export interface Education {
  degree: string;
  graduationDate: string;
  specialization: string;
  university: string;
}
export interface Job {
  employerName: string;
  employerType: string;
  employerBusiness: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobDuties: string;
  skills: string;
}

export interface HotListData {
  date: string;
  users: [
    {
      priority: string;
      userID: string;
      salesPerson: string;
      comments: string;
    }
  ];
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const localIp = 3000;

export const localHost = "4.227.152.107";
