import AppUtils from "../../utils/AppUtils";
import { CustomCompanyNameComponent, CustomReviewComponent, CustomWAAuthComponent } from "../../utils/CustomButton";
import AppConstants from "../shared/constants";
import { FieldConfig } from "../shared/Form";

export const valueFormatter = (params: { value?: string | null }): string => {
  if (params.value === "string" && params.value.includes("@")) {
    return params.value;
  }
  if (typeof params.value === "number") {
    return String(params.value);
  }

  if (typeof params.value === "string") {
    return AppUtils.capitalizeFirstLetter(params.value) || "-";
  } else {
    return params.value || "-";
  }
};

export const columns: any = [
  {
    field: "createdDate",
    headerName: "Date",
    headerClass: "table-header",
    filter: true,
    valueFormatter: (params: any) =>
      AppUtils.unixToDate(params.value, "MM-DD-YYYY"),
    width: 120,
  },
  //Profile Information
  {
    field: "firstName",
    headerName: "First Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width: 120,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width: 120,
  },

  // {
  //   field: "profile._id",
  //   headerName: "User ID",
  //   headerClass: "table-header",
  //   valueFormatter: valueFormatter,
  // },
  {
    field: "dobStr",
    headerName: "DOB",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width: 105,
  },
  // {
  //   field: "profile.mobile",
  //   headerName: "Mobile",
  //   headerClass: "table-header",
  //   valueFormatter: valueFormatter,
  // },

  {
    field: "address",
    headerName: "Location",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width: 140,
  },

  // {
  //   field: "profile.active",
  //   headerName: "Active",
  //   headerClass: "table-header",
  //   valueFormatter: valueFormatter,
  // },

  {
    field: "visaStatus",
    headerName: "Visa Status",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer: CustomWAAuthComponent,
    width: 120,
  },
  {
    field: "yearsOfExperience",
    headerName: "Experience",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width:100
  },
  {
    field: "reviewStatus",
    headerName: "Status",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer:CustomReviewComponent,
    width:150
  },
  
  {
    field: "referredBy",
    headerName: "Referred By",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width: 150,
  },

  // // Additional Information
  {
    field: "primaryTechnology",
    headerName: "Technology",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
    width: 150,
  },
  {
    field: "adminComments",
    headerName: "Admin Comments",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width:150,
  },
];

export const columnsView = [
  { label: "Basic Details", type: "header" },
  { label: "First Name", key: "hiringUser.firstName", isCapitalize: true },
  { label: "Middle Name", key: "hiringUser.middleName", isCapitalize: true },
  { label: "Last Name", key: "hiringUser.lastName", isCapitalize: true },
  { label: "Email", key: "hiringUser.email", isCapitalize: true },
  { label: "Mobile", key: "hiringUser.mobile", isCapitalize: true },
  { label: "Current Location", key: "address", isCapitalize: true },
  { label: "Gender", key: "hiringUser.gender", isCapitalize: true },
  { label: "Created Date", key: "createdDate", isCapitalize: true,type:"date" },
  // { label: "Country", key: "address.country", isCapitalize: true },
  // { label: "State", key: "address.state", isCapitalize: true },
  // { label: "City", key: "address.city", isCapitalize: true },
  // { label: "AddressLine 1", key: "address.addressLine1", isCapitalize: true },
  // { label: "AddressLine 2", key: "address.addressLine2", isCapitalize: true },
  //{ label: "Address Type", key: "address", isCapitalize: true },
  //{ label: "Zip Code", key: "address.zipCode", isCapitalize: true },
  // Personal Information
  { label: "Education Information", type: "header" },
  { label: "Education Information", key: "educationDetails", isCapitalize: true },
  { label: "Job Information", type: "header" },
{
    label: "Job Information",
    key: "jobInfo",
    isCapitalize: true,
  },
  {
    label: "Years Of Experience",
    key: "personalInfo.yearsOfExperience",
    isCapitalize: true,
    render: (value: any) => {
      if(typeof value?.personalInfo?.yearsOfExperience==="number"){
        return value?.personalInfo?.yearsOfExperience
      }else{
        return 0
      }
    }
  },

  { label: "Personal Information", type: "header" },
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
  { label: "Referred By", key: "personalInfo.referredBy", isCapitalize: true },
  {
    label: "Date of Birth",
    key: "personalInfo.dob",
    isCapitalize: true,
    type: "date",
  },
  {
    label: "Relocate To Office",
    key: "hiringUser.relocateToOffice",
    isCapitalize: true,
    render: (value: any) => {
      if(value?.hiringUser?.relocateToOffice==="true"){
        return "Yes"
      }else{
        return "No"
      }
    }
  },
  {
    label: "Primary Technology",
    key: "hiringUser.primaryTechnology",
    isCapitalize: true,
  },
  // {
  //   label: "Secondary Technology",
  //   key: "hiringUser.secondaryTechnology",
  //   isCapitalize: true,
  // },
  {
    label: "Attachments",
    key: "uploads",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    label: "User Comments",
    key: "hiringUser.userComments",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    label: "Admin Comments",
    key: "hiringUser.AdminComments",
    isCapitalize: true,
    isFullRow: true,
  },
];

export const addingUser: FieldConfig[] = [
  {
    label: "Password",
    key: "password",
    type: "text",
    placeholder: "Enter Password",
    required: true,
  },
  // {
  //   label: "Active",
  //   key: "active",
  //   type: "Switch",
  //   placeholder: "Enter active",
  //   required: true,
  //   disabled:true
  // },
  {
    label: "Auth Role",
    key: "authRole",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: AppConstants.authRole,
  },
  {
    label: "Job Role",
    key: "jobRole",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: AppConstants.jobRole,
  },

];
