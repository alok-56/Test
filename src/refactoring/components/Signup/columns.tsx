import AppConstants from "../shared/constants";
import { FieldConfig } from "../shared/Form";
import UploadAttachment from "../submission/Submissions/documentUpload";
import UploadHiring from "./signupDocument";

export const addPersonalInformation: FieldConfig[] = [
  {
    label: "First Name",
    key: "firstName",
    type: "text",
    placeholder: "Enter First Name",
    required: true,
  },
  {
    label: "Middle Name",
    key: "middleName",
    type: "text",
    placeholder: "Enter Middle Name",
    required: false,
  },
  {
    label: "Last Name",
    key: "lastName",
    type: "text",
    placeholder: "Enter Last Name",
    required: true,
  },
  {
    label: "Date of Birth",
    key: "dob",
    type: "datepicker",
    placeholder: "Select Date of Birth",
    required: true,
    includeTime: false,
  },
  {
    label: "Email",
    key: "email",
    type: "text",
    placeholder: "Enter Email",
    required: true,
  },
  {
    label: "Contact",
    key: "mobile",
    type: "contact",
    placeholder: "Enter Contact Number",
    required: true,
  },
  {
    label: "Current Location(City,State)",
    key: "address",
    type: "text",
    placeholder: "Enter State and City",
    required: true,
  },
  {
    label: "Gender",
    key: "gender",
    type: "dropdown",
    placeholder: "Select Gender",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
];

export const addAdditionalInformation: FieldConfig[] = [
  // Personal Information

  {
    label: "PassportNo",
    key: "passportNo",
    type: "text",
    placeholder: "Enter Passport ID",
    required: true,
  },
  {
    label: "DL Number",
    key: "dlNumber",
    type: "text",
    placeholder: "Enter DL Number",
    required: true,
  },
  {
    label: "Visa Status",
    key: "visaStatus",
    type: "dropdown",
    placeholder: "Select Visa Status",
    required: true,
    options: AppConstants.visaStatus,
  },
  {
    label: "Visa Start Date",
    key: "visaStartDate",
    type: "datepicker",
    placeholder: "Select Visa Start Date",
    required: true,
    includeTime: false,
  },
  {
    label: "Referred By",
    key: "referredBy",
    type: "text",
    placeholder: "Enter Referred By",
    required: true,
  },

  // Additional Information
  {
    label: "Preferred Technology",
    key: "primaryTechnology",
    type: "text",
    placeholder: "Enter Primary Technology",
    required: true,
  },
  {
    label: "LinkedIn ID",
    key: "linkedinID",
    type: "text",
    placeholder: "Enter LinkedIn ID",
    required: false,
  },
  {
    label: "Relocate to our office locations",
    key: "relocateToOffice",
    type: "Switch",
    placeholder: "Select",
    options: AppConstants.relocateToOffice,
    required: false,
  },
  {
    label: "Any USA Location",
    key: "anyUSALocation",
    type: "Switch",
    placeholder: "Select",
    required: false,
  },
  {
    label: "Comments",
    key: "userComments",
    type: "textarea",
    placeholder: "Enter Your Comments",
    required: false,
  },


];
export const resumeUpload:FieldConfig[]=[
  {
    label: "Resume",
    key: "uploads",
    type: "file",
    required: false,
    fileComponent: (key, field, form) => (
      <UploadHiring key={key} field={field} form={form} />
    ),
  },
]

export const resumeUpdateUpload:FieldConfig[]=[
  {
    label: "Resume",
    key: "uploads",
    type: "file",
    required: false,
    fileComponent: (key, field, form) => (
      <UploadAttachment key={key} field={field} form={form} />
    ),
  },
]

export const addAdditionalInformation1: FieldConfig[] = [
  // Personal Information

  {
    label: "PassportNo",
    key: "passportNo",
    type: "text",
    placeholder: "Enter Passport ID",
    required: true,
  },
  {
    label: "DL Number",
    key: "dlNumber",
    type: "text",
    placeholder: "Enter DL Number",
    required: true,
  },
  {
    label: "Visa Status",
    key: "visaStatus",
    type: "dropdown",
    placeholder: "Select Visa Status",
    required: true,
    options: AppConstants.visaStatus,
  },
  {
    label: "Visa Start Date",
    key: "visaStartDate",
    type: "datepicker",
    placeholder: "Select Visa Start Date",
    required: true,
    includeTime: false,
  },
  {
    label: "Referred By",
    key: "referredBy",
    type: "text",
    placeholder: "Enter Referred By",
    required: true,
  },

  // Additional Information
  {
    label: "Preferred Technology",
    key: "primaryTechnology",
    type: "text",
    placeholder: "Enter Primary Technology",
    required: true,
  },
  {
    label: "LinkedIn ID",
    key: "linkedinID",
    type: "text",
    placeholder: "Enter LinkedIn ID",
    required: false,
  },
  {
    label: "Relocate to our office locations",
    key: "relocateToOffice",
    type: "Switch",
    placeholder: "Select",
    options: AppConstants.relocateToOffice,
    required: false,
  },
  {
    label: "Any USA Location",
    key: "anyUSALocation",
    type: "Switch",

    required: false,
  },
  {
    label: "Review Status",
    key: "reviewStatus",
    type: "dropdown",
    placeholder: "Select Review Status",
    required: true,
    options: AppConstants.status,
  },
  {
    label: "Comments",
    key: "userComments",
    type: "textarea",
    placeholder: "Enter Your Comments",
    required: false,
  },
  {
    label: "Admin Comments",
    key: "adminComments",
    type: "textarea",
    placeholder: "Enter Your Comments",
    required: false,
  },
];


export const addEducationDetails: FieldConfig[] = [

      {
        label: " Master's University",
        key: "mastersUniversity",
        type: "text",
        placeholder: "Enter University",
        required: false,
      },
      {
        label: "Master's Specialization",
        key: "mastersSpecialization",
        type: "text",
        placeholder: "Enter Specialization",
        required: false,
      },
      {
        label: "Master's Graduation Date",
        key: "mastersGraduationDate",
        type: "datepicker",
        placeholder: "Select Graduation Date",
        required: false,
        includeTime: false,
      },
      {
        label: " Bachelor's University",
        key: "bachelorUniversity",
        type: "text",
        placeholder: "Enter University",
        required: true,
      },
      {
        label: "Bachelor's Specialization",
        key: "bachelorSpecialization",
        type: "text",
        placeholder: "Enter Specialization",
        required: true,
      },
      {
        label: "Bachelor's Graduation Date",
        key: "bachelorGraduationDate",
        type: "datepicker",
        placeholder: "Select Graduation Date",
        required: true,
        includeTime: false,
      },
];

export const workExperience: FieldConfig[] = [
  {
    label: "Recent Employer Name",
    key: "employerName",
    type: "text",
    placeholder: "Enter Employer Name",
    required: false,
  },
  {
    label: "Start Date",
    key: "startDate",
    type: "datepicker",
    placeholder: "Select Start Date",
    required: false,
    includeTime: false,
  },
  {
    label: "End Date",
    key: "endDate",
    type: "datepicker",
    placeholder: "Select End Date",
    required: false,
    includeTime: false,
  },
  {
    label:"Total Year's Of Experience",
    key: "yearsOfExperience",
    type: "number",
    placeholder: "Enter Years Of Experience",
    required: false,
  },
];
