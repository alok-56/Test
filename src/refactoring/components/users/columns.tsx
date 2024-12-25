import AppUtils from "../../utils/AppUtils";
import { CustomCompanyNameComponent, CustomWAAuthComponent } from "../../utils/CustomButton";
import AppConstants from "../shared/constants";
import { FieldConfig } from "../shared/Form";
import CustomForm from "../Signup/CustomForm";
import UploadAttachment from "../submission/Submissions/documentUpload";

const valueFormatter = (params: any) => {
  try {
    if (params.value && params.value.includes("@")) {
      return params.value;
    }

    if (typeof params.value === "string") {
      return AppUtils.capitalizeFirstLetter(params.value) || "-";
    } else {
      return params.value || "-";
    }
  } catch {
    console.error("Invalid value");
  }
};

export const columns: any =[
  // Profile Information
  {
    field: "profile.firstName",
    headerName: "First Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 145,
  },
  {
    field: "profile.lastName",
    headerName: "Last Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 145 ,
  },
  {
    field: "profile.email",
    headerName: "Email",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "profile.mobile",
    headerName: "Mobile",
    headerClass: "table-header",
    valueFormatter: (params: { value?: string | null }): string =>
      AppUtils.formatContactNumber(params),
    width : 165,
  },
  {
    field: "profile.currentLocation",
    headerName: "Current Location",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 165,
  },
  {
    field: "primaryTechnology",
    headerName: "Primary Technology",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
    width: 120,
  },
  {
    field: "personalInfo.visaStatus",
    headerName: "Visa Status",
    headerClass: "table-header",
    cellRenderer: CustomWAAuthComponent,
    width: 120,
  },
  {
    field: "personalInfo.visaStartDate",
    headerName: "Visa Start Date",
    headerClass: "table-header",
    valueFormatter: (params:any) => AppUtils.unixToDate(params.value),
    width: 120,
  },
  {
    field: "personalInfo.referredBy",
    headerName: "Referred By",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    flex: 1,
    minWidth: 200,
  },
];

export const columnsView = [
  { label: "First Name", key: "profile.firstName", isCapitalize: true },
  { label: "Middle Name", key: "profile.MiddleName", isCapitalize: true },
  { label: "Last Name", key: "profile.LastName", isCapitalize: true },
  { label: "Email", key: "profile.email", isCapitalize: true },
  { label: "Mobile", key: "profile.mobile", isCapitalize: true },
  {
    label: "Active",
    key: "profile.active",
    isCapitalize: true,
    render: (value: boolean) => (value ? "True" : "False"),
  },
  { label: "Auth Role", key: "profile.authRole", isCapitalize: true },
  {
    label: "Current Location",
    key: "profile.currentLocation",
    isCapitalize: true,
  },
  { label: "Gender", key: "profile.gender", isCapitalize: true },
  { label: "Country", key: "profile.address.country", isCapitalize: true },
  { label: "State", key: "profile.address.state", isCapitalize: true },
  { label: "City", key: "profile.address.city", isCapitalize: true },
  {
    label: "AddressLine 1",
    key: "profile.address.addressLine1",
    isCapitalize: true,
  },
  { label: "Zip Code", key: "profile.address.zipCode", isCapitalize: true },
  //personal Information
  { label: "LinkedIn ID", key: "personalInfo.linkedinID", isCapitalize: true },
  {
    label: "Passport Number",
    key: "personalInfo.passportNo",
    isCapitalize: true,
  },
  { label: "DL Number", key: "personalInfo.dlNumber", isCapitalize: true },
  { label: "Visa Status", key: "personalInfo.visaStatus", isCapitalize: true },
  {
    label: "Visa Start Date",
    key: "personalInfo.visaStartDate",
    isCapitalize: true,
    type: "date",
  },
  {
    label: "States Entry Date",
    key: "personalInfo.statesEntryDate",
    isCapitalize: true,
    type: "date",
  },
  { label: "Referred By", key: "personalInfo.referredBy", isCapitalize: true },
  {
    label: "Date of Birth",
    key: "personalInfo.dob",
    isCapitalize: true,
    type: "date",
  },
  { label: "Primary Technology", key: "primaryTechnology", isCapitalize: true },
  {
    label: "Secondary Technology",
    key: "secondaryTechnology",
    isCapitalize: true,
  },
  {
    label: "Marketing Start Date",
    key: "marketingStartDate",
    isCapitalize: true,
  },
  { label: "Guest House Date", key: "guestHouseDate", isCapitalize: true },
  {
    label: "Created Date",
    key: "auditInfo.createdDate",
    isCapitalize: false,
    type: "date",
  },
  {
    label: "Created By",
    key: "auditInfo.createdUserName",
    isCapitalize: true,
  },
  {
    label: "Updated Date",
    key: "auditInfo.updatedDate",
    isCapitalize: false,
    type: "date",
  },
  {
    label: "Updated By",
    key: "auditInfo.updatedUserName",
    isCapitalize: true,
  },
];

export const addProfileInfo: FieldConfig[] = [
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
    placeholder: "Enter lastName",
    required: true,
  },

  {
    label: "Email",
    key: "email",
    type: "text",
    placeholder: "Enter Name",
    required: true,
  },

  {
    label: "Mobile",
    key: "mobile",
    type: "contact",
    placeholder: "Enter Contact Number",
    required: true,
  },
  {
    label: "Whatsapp Number",
    key: "whatsappNo",
    type: "contact",
    placeholder: "Enter Whatsapp Number",
    required: true,
  },
  {
    label: "Auth Role",
    key: "authRole",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: AppConstants.authRole
  },
  {
    label: "Gender",
    key: "gender",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    label: "Current Location",
    key: "currentLocation",
    type: "text",
    placeholder: "Enter current location",
    required: true,
  },
  {
    label: "AddressLine 1",
    key: "addressLine1",
    type: "text",
    placeholder: "Enter addressline1",
    required: true,
  },
  {
    label: "AddressLine 2",
    key: "addressLine2",
    type: "text",
    placeholder: "Enter addressline2",
    required: false,
  },
  {
    label: "ZipCode",
    key: "zipCode",
    type: "text",
    placeholder: "Enter ZipCode",
    required: true,
  },
  {
    label: "Country",
    key: "country",
    type: "dropdown",
    placeholder: "Enter country",
    required: true,
    options:[],
    labelKey:"label",
    valueKey:"label"
  },
  {
    label: "State",
    key: "state",
    type: "dropdown",
    placeholder: "Enter state",
    required: true,
    options:[],
    labelKey:"label",
    valueKey:"label"
  },
  {
    label: "City",
    key: "city",
    type: "dropdown",
    placeholder: "Enter city",
    required: true,
    options:[],
    labelKey:"label",
    valueKey:"label"
  },
  {
    label: "Job Role",
    key: "jobRole",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "hr", label: "HR" },
      { value: "consultant", label: "Consultant" },
      { value: "recruiter", label: "Recruiter" },
      { value: "tech", label: "Tech" },
      { value: "lead", label: "Lead" },
      { value: "rm", label: "RM" },
    ],
  },
  {
    label: "Password",
    key: "password",
    type: "text",
    placeholder: "Enter Password",
    required: true,
  },
  {
    label: "Active",
    key: "active",
    type: "Switch",
    required: true,
    disabled: true,
  },
];

export const addProfileInfoUpdate: FieldConfig[] = [
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
    placeholder: "Enter lastName",
    required: true,
  },

  {
    label: "Email",
    key: "email",
    type: "text",
    placeholder: "Enter Name",
    required: true,
  },

  {
    label: "Mobile",
    key: "mobile",
    type: "contact",
    placeholder: "Enter Contact Number",
    required: true,
  },
  {
    label: "Whatsapp Number",
    key: "whatsappNo",
    type: "contact",
    placeholder: "Enter Whatsapp Number",
    required: true,
  },
  {
    label: "Auth Role",
    key: "authRole",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: AppConstants.authRole
  },
  {
    label: "Gender",
    key: "gender",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    label: "Current Location",
    key: "currentLocation",
    type: "text",
    placeholder: "Enter current location",
    required: true,
  },
  {
    label: "AddressLine 1",
    key: "addressLine1",
    type: "text",
    placeholder: "Enter addressline1",
    required: true,
  },
  {
    label: "AddressLine 2",
    key: "addressLine2",
    type: "text",
    placeholder: "Enter addressline2",
    required: false,
  },
  {
    label: "ZipCode",
    key: "zipCode",
    type: "text",
    placeholder: "Enter ZipCode",
    required: true,
  },
  {
    label: "Country",
    key: "country",
    type: "dropdown",
    placeholder: "Enter country",
    required: true,
    options:[],
    labelKey:"label",
    valueKey:"label"
  },
  {
    label: "State",
    key: "state",
    type: "dropdown",
    placeholder: "Enter state",
    required: true,
    options:[],
    labelKey:"label",
    valueKey:"label"
  },
  {
    label: "City",
    key: "city",
    type: "dropdown",
    placeholder: "Enter city",
    required: true,
    options:[],
    labelKey:"label",
    valueKey:"label"
  },
  {
    label: "Job Role",
    key: "jobRole",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "hr", label: "HR" },
      { value: "consultant", label: "Consultant" },
      { value: "recruiter", label: "Recruiter" },
      { value: "tech", label: "Tech" },
      { value: "lead", label: "Lead" },
      { value: "rm", label: "RM" },
    ],
  },
  {
    label: "Active",
    key: "active",
    type: "Switch",
    required: true,
    disabled: false,
  },
];


export const addPersonalInfo: FieldConfig[] = [
  {
    label: "Linkedin ID",
    key: "linkedinID",
    type: "linkedin",
    placeholder: "Enter Linkedin ID",
    required: false,
  },
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
    placeholder: "Select",
    required: true,
    options: [
      { value: "cpt", label: "CPT" },
      { value: "opt n", label: "OPT N" },
      { value: "opt e", label: "OPT E" },
      { value: "h1b", label: "H1B" },
      { value: "h1b t", label: "H1B T" },
      { value: "h4", label: "H4" },
      { value: "gc", label: "GC" },
    ],
  },
  {
    label: "Visa Start Date",
    key: "visaStartDate",
    type: "datepicker",
    placeholder: "Select Visa Start Date",
    required: true,
    includeTime: false,
  },
  // {
  //   label: "States Entry Date",
  //   key: "statesEntryDate",
  //   type: "datepicker",
  //   placeholder: "Select States Entry Date",
  //   required: true,
  //   includeTime: false,
  // },
  {
    label: "Referred By",
    key: "referredBy",
    type: "text",
    placeholder: "Enter Referred By",
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
];

export const addEducationInfo: FieldConfig[] = [
  {
    label: "",
    key: "educationDetails",
    type: "dynamic",
    dynamicComponent: (key: string, field: any, form: any) => (
      <CustomForm key={key} field={field} form={form} />
    ),
    dynamicFields: [
      {
        label: "University",
        key: "university",
        type: "text",
        placeholder: "Enter University",
        required: false,
      },
      {
        label: "Specialization",
        key: "specialization",
        type: "text",
        placeholder: "Enter Specialization",
        required: false,
      },
      {
        label: "Degree",
        key: "degree",
        type: "text",
        placeholder: "Enter Degree",
        required: false,
      },
      {
        label: "Graduation Date",
        key: "graduationDate",
        type: "datepicker",
        placeholder: "Select Graduation Date",
        required: false,
        includeTime: false,
      },
    ],
  },
];

export const addJobInfo: FieldConfig[] = [
  {
    label: "",
    key: "jobInfo",
    type: "dynamic",
    dynamicComponent: (key: string, field: any, form: any) => (
      <CustomForm key={key} field={field} form={form} />
    ),
    dynamicFields: [
      {
        label: "Employer Name",
        key: "employerName",
        type: "text",
        placeholder: "Enter Employer Name",
        required: false,
      },
      {
        label: "Employer Type",
        key: "employerType",
        type: "dropdown",
        placeholder: "Select Employer Type",
        required: false,
        options: [
          { value: "fulltime", label: "Full Time" },
          { value: "contract", label: "Contract" },
        ],
      },
      {
        label: "Employer Business",
        key: "employerBusiness",
        type: "text",
        placeholder: "Enter Employer Business",
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
        label: "Job Title",
        key: "jobTitle",
        type: "text",
        placeholder: "Enter Job Title",
        required: false,
      },
      {
        label: "Job Duties",
        key: "jobDuties",
        type: "text",
        placeholder: "Enter Job Duties",
        required: false,
      },
      {
        label: "Skills",
        key: "skills",
        type: "textarea",
        placeholder: "Enter Skills",
        required: false,
      },
    ],
  },
];

export const addExtraInfo: FieldConfig[] = [
  {
    label: "Primary Technology",
    key: "primaryTechnology",
    type: "text",
    placeholder: "Enter Primary Technology",
    required: true,
  },
  {
    label: "Secondary Technology",
    key: "secondaryTechnology",
    type: "text",
    placeholder: "Enter Secondary Technology",
    required: false,
  },
  {
    label: "Company Name",
    key: "company",
    type: "autocomplete",
    placeholder: "Enter Company Name",
    options:[
      {label:"Thinklusive Inc",value:"Thinklusive Inc"},
      {label:"ByteMinds",value:"ByteMinds"},
      {label:"Others",value:"Others"},
    ],
    required: true,
  },
  {
    label: "Guest House Date",
    key: "guestHouseDate",
    type: "datepicker",
    placeholder: "Select Guest House Date",
    required: true,
    includeTime: false,
  },
  {
    label: "Marketing Start Date",
    key: "marketingStartDate",
    type: "datepicker",
    placeholder: "Select Marketing Start Date",
    required: true,
    includeTime: false,
  },
  {
    label: "Years Of Experience",
    key: "yearsOfExperience",
    type: "number",
    placeholder: "Enter Years Of Experience",
    required: false,
  },
  {
    label: "Attacthments",
    key: "uploads",
    type: "file",
    required: false,
    fileComponent: (key, field, form) => (
      <UploadAttachment key={key} field={field} form={form} />
    ),
  },
];
