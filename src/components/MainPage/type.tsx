export interface RecruiterDetails {
  name: string;
  contact: string;
  email: string;
}

export interface VendorDetails {
  name: string;
  recruiter: RecruiterDetails;
}

export interface JobDetails {
  role: string;
  description: string;
  workLocation: string;
}

export interface SubmissionDetails {
  user_id: string;
  clientName: string;
  ipartner: string;
  primeVendor: VendorDetails;
  vendor: VendorDetails;
  salesPerson: string;
  status: string;
  job: JobDetails;
  interviewRounds: number;
  comments: string;
}

export interface MetaInfo {
  createdUser: string;
  updatedUser: string;
  createdDate: string;
  updatedDate: string;
}

export interface EmployeeDetails {
  _id: string;
  userId: string;
  clientName: string;
  implementationPartnerName: string;
  primeVendorName: string;
  primeVendorRecruiterName: string;
  primeVendorRecruiterPhoneNumber: string;
  primeVendorRecruiterEmail: string;
  vendorName: string;
  vendorRecruiterName: string;
  vendorRecruiterPhoneNumber: string;
  vendorRecruiterEmail: string;
  salesPerson: string;
  status: string;
  jobRole: string;
  jobDescription: string;
  jobWorkLocation: string;
  interviewRounds: number;
  comments: string;
  createdUser: string;
  updatedUser: string;
  createdDate: string;
  updatedDate: string;
}

export interface ExpandedEmployeeDetails {
  _id: string;
  subDetails: SubmissionDetails;
  metaInfo: MetaInfo;
}
