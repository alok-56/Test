import InterviewColumn from "../../../../components/Submission/InterviewColumn";
import AppUtils from "../../../utils/AppUtils";
import {
  CustomCompanyNameComponent,
  CustomStatusInterviewComponent,
} from "../../../utils/CustomButton";
import { FieldConfig } from "../../shared/Form";
import AppConstants from "../../shared/constants";




const valueFormatter = (params: { value?: string | null }): string => {
  if (params.value && params.value.includes("@")) {
    return params.value;
  }

  if (typeof params.value === "string") {
    return AppUtils.capitalizeFirstLetter(params.value) || "-";
  } else {
    return params.value || "-";
  }
};

export const columns: any = [
  {
    field: "subDetails.date",
    headerName: "Date",
    headerClass: "table-header",
    valueFormatter: ({ value }: any) =>
      AppUtils.unixToDate(value, "MM-DD-YYYY"),
    width: 120,
  },
  {
    field: "subDetails.profile.firstName",
    headerName: "First Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width: 150,
  },
  {
    field: "subDetails.profile.lastName",
    headerName: "Last Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width: 130,
  },
  {
    field: "subDetails.jobRole",
    headerName: "Job Title",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "subDetails.status",
    headerName: "Status",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    cellRenderer: CustomStatusInterviewComponent,
  },
  {
    field: "subDetails.salesRecruiter",
    headerName: "Submitted By",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 185,
  },
  {
    field: "subDetails.client.name",
    headerName: "Client Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
    width : 150,
  },

  {
    field: "subDetails.vendor.name",
    headerName: "Vendor Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 185,
  },
  {
    field: "subDetails.primeVendor.name",
    headerName: "Prime Vendor Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "Action",
    cellRenderer: InterviewColumn,
    suppressAutoSize: true,
    suppressColumnsToolPanel: true,
    suppressHeaderMenuButton: true,
    suppressMovable: true,
    sortable: false,
    width: 70,
    pinned: "right",
  },
];

export const columnsView = [
  { label: "User Name", key: "subDetails.profile.firstName", isCapitalize: true },

  { label: "Vendor", type: "header" },
  {
    label: "Name",
    key: "subDetails.vendor.name",
    isCapitalize: true,
  },

  {
    label: "Recruiter Name",
    key: "subDetails.vendor.recruiter.name",
    isCapitalize: true,
  },
  {
    label: "Recruiter ID",
    key: "subDetails.vendor.recruiter.rec_id",
    isCapitalize: true,
  },
  {
    label: "Recruiter Email",
    key: "subDetails.vendor.recruiter.email",
    isCapitalize: true,
  },
  {
    label: "Recruiter Contact",
    key: "subDetails.vendor.recruiter.contact",
    isCapitalize: true,
  },

  { label: "Prime Vendor", type: "header" },
  {
    label: "Name",
    key: "subDetails.primeVendor.name",
    isCapitalize: true,
  },
  {
    label: "Recruiter Name",
    key: "subDetails.primeVendor.recruiter.name",
    isCapitalize: true,
  },
  {
    label: "Recruiter ID",
    key: "subDetails.primeVendor.recruiter.rec_id",
    isCapitalize: true,
  },
  {
    label: "Recruiter Email",
    key: "subDetails.primeVendor.recruiter.email",
    isCapitalize: true,
  },
  {
    label: "Recruiter Contact",
    key: "subDetails.primeVendor.recruiter.contact",
    isCapitalize: true,
  },

  { label: "Client", type: "header" },
  { label: "Name", key: "subDetails.client.name", isCapitalize: true },
  {
    label: "Recruiter Name",
    key: "subDetails.client.recruiter.name",
    isCapitalize: true,
  },
  {
    label: "Recruiter ID",
    key: "subDetails.client.recruiter.rec_id",
    isCapitalize: true,
  },
  {
    label: "Recruiter Email",
    key: "subDetails.client.recruiter.email",
    isCapitalize: true,
  },
  {
    label: "Recruiter Contact",
    key: "subDetails.client.recruiter.contact",
    isCapitalize: true,
  },

  { label: "Job Description", type: "header" },
  { label: "Role", key: "subDetails.jobRole", isCapitalize: true },
  {
    label: "Status",
    key: "subDetails.status",
    isCapitalize: true,
    render: (value: boolean) => (value ? "Applied" : "Not Applied"),
  },
  { label: "Date", key: "subDetails.date", isCapitalize: true, type: "date" },
  {
    label: "Sales Recruiter",
    key: "subDetails.salesRecruiter",
    isCapitalize: true,
  },
  {
    label: "Work Location",
    key: "subDetails.workLocation",
    isCapitalize: true,
  },
  {
    label: "Description",
    key: "subDetails.jobDescription",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    label: "Comments",
    key: "subDetails.comments",
    isCapitalize: true,
    isFullRow: true,
  },
  // {
  //   label: "Attachments",
  //   key: "subDetails.uploads",
  //   isCapitalize: true,
  //   isFullRow: true,
  // },

  { label: "Audit Info", type: "header" },
  {
    label: "Created Date",
    key: "auditInfo.createdDate",
    isCapitalize: true,
    type: "date",
  },
  {
    label: "Updated Date",
    key: "auditInfo.updatedDate",
    isCapitalize: true,
    type: "date",
  },
  { label: "Created By", key: "auditInfo.createdUserName", isCapitalize: true },
  { label: "Updated By", key: "auditInfo.updatedUserName", isCapitalize: true },
];

export const addSubmissionFieldsStepOne: FieldConfig[] = [
  {
    label: "Name",
    key: "userName",
    type: "select",
    placeholder: "Enter User Name",
    required: true,
    options: [],
    labelKey: "profile.firstName",
    valueKey: "profile._id",
  },

  {
    label: "User ID",
    key: "_id",
    type: "text",
    disabled: true,
    placeholder: "Enter User ID",
  },
  {
    label: "Vendor Name",
    key: "vendorCompanyName",
    type: "select",
    placeholder: "Enter vendor Name",
    required: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "Recruiter Name",
    key: "vendorRecruiterName",
    type: "select",
    placeholder: "Enter Recruiter Name",
    required: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "",
    key: "sameAsVendor",
    additinalLabel: "Same As Vendor",
    type: "checkbox",
    singleFieldInRow: true,
  },
  {
    label: "Prime Vendor Name",
    key: "primeVendorCompanyName",
    type: "select",
    placeholder: "Enter Prime Vendor Name",
    required: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "Recruiter Name",
    key: "primeVendorRecruiterName",
    type: "select",
    placeholder: "Enter Recruiter Name",
    required: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "Client Name",
    key: "clientCompanyName",
    type: "select",
    placeholder: "Enter Client Name",
    required: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "Recruiter Name",
    key: "clientRecruiterName",
    type: "select",
    placeholder: "Enter Recruiter Name",
    required: true,
    disabled: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
];

export const addSubmissionFiledsStepTwo: FieldConfig[] = [
  {
    label: "Job Role ",
    key: "jobRole",
    required: true,
    placeholder: "Please Enter Job Role",
  },
  {
    label: "Status",
    key: "status",
    type: "dropdown",
    required: true,
    disabled:true,
    placeholder: "Please select status",
    options: AppConstants.StatusList,
  },
  {
    label: "Sales Recruiter",
    key: "salesRecruiter",
    required: true,
    placeholder: "Please Enter Sales Recruiter",
    type: "dropdown",
    options: AppConstants.salesRecruiterList,
  },
  {
    label: "Date",
    key: "date",
    required: true,
    placeholder: "Please Select Date",
    type: "datepicker",
    includeTime: false,
  },
  {
    label: "Work Location",
    key: "workLocation",
    required: true,
    placeholder: "Please Enter Work Location",
    singleFieldInRow:true,
  },
  {
    label: "Job Description",
    key: "jobDescription",
    type: "textarea",
    required: true,
    placeholder: "Please Enter job description",
  },
  {
    label: "Comments",
    key: "comments",
    type: "textarea",
    required: true,
    placeholder: "Please Enter comments",
  },
];
