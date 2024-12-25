import { Typography } from "antd";
import AppUtils from "../../utils/AppUtils";
import {
  CustomCompanyNameComponent,
  CustomRecruitmentComponent,
  CustomRecruitmentSubmissionComponent,
} from "../../utils/CustomButton";
import AddRecruitmentSubmission from "../RecruitmentSubmission/AddRecruitmentSubmission";
import { FieldConfig } from "../shared/Form";
import AppConstants from "../shared/constants";
import UploadAttachment from "../submission/Submissions/documentUpload";

import ActiveUserSubmissionssTable from "../RecruitmentSubmission/ActiveUserSubmissionsTable";
const { Text, Link } = Typography;
const valueFormatter = (params: { value?: string | null }): string => {
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
export const LinkRenderer = (value: string | null) => {
  if (!value) return <Text type="secondary">----</Text>;

  const isValidLink = /^(http:\/\/|https:\/\/|www\.)/.test(value);

  if (isValidLink) {
    return (
      <Link
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={(ref) => {
          if (!ref) return;
          ref.onclick = (e) => {
            e.stopPropagation();
          };
        }}
        href={value.startsWith("www") ? `http://${value}` : value}
        target="_blank"
      >
        Linked In
      </Link>
    );
  }

  return <Text>{valueFormatter({ value })}</Text>;
};
export const columns: any = [
  {
    field: "createDate",
    headerName: "Released Date",
    headerClass: "table-header",
    valueFormatter: (params: any) =>
    AppUtils.unixToDate(params.value, "MM-DD-YYYY"),
    width : 150,
  },
  {
    field: "profileName",
    headerName: "Name",
    headerClass: "table-header",

    valueFormatter: valueFormatter,
  },
  {
    field: "projectStatus",
    headerName: "Status",
    headerClass: "table-header",
    cellRenderer: CustomRecruitmentComponent,
    width : 95,
  },
  {
    field: "clientName",
    headerName: "Client",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 140,
  },
  {
    field: "requisitionId",
    headerName: "ID",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 90,
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer:CustomCompanyNameComponent
  },
  {
    field: "address",
    headerName: "Location",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 170,
  },
  {
    field: "c2cRate",
    headerName: "Rate($)",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 100,
  },
  {
    field: "submittedTo",
    headerName: "Submitted To",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 170,
  },
  {
    field: "email",
    headerName: "Email",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    
  },
  {
    field: "positionType",
    headerName: "Position Type",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 140,
  },
  {
    field: "positionsCount",
    headerName: "Count",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 90,
  },
  {
    field: "activeSubmissionCount",
    headerName: "Active Submission Count",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "Action",
    cellRenderer: AddRecruitmentSubmission,
    suppressAutoSize: true,
    suppressColumnsToolPanel: true,
    suppressHeaderMenuButton: true,
    suppressMovable: true,
    sortable: false,
    width: 70,
    pinned: "right",
  },
];

export const columnsView: any = [
  { label: "Basic Details", type: "header" },
  {
    key: "submittedTo",
    label: "Submitted To",
    isCapitalize: true,
  },
  {
    key: "email",
    label: "Email",
    isCapitalize: true,
  },
  {
    key: "phone",
    label: "Phone",
    isCapitalize: true,
  },
  {
    key: "createDate",
    label: "Create Date",
    isCapitalize: true,
    type: "date",
  },
  {
    key: "c2cRate",
    label: "C2C Rate",
    isCapitalize: true,
  },
  {
    key: "backgroundCheck",
    label: "Background Check",
    isCapitalize: true,
    render: (value: boolean) => (value ? "True" : "False"),
  },
  {
    key: "f2fInterview",
    label: "Face to Face Interview",
    isCapitalize: true,
    render: (value: boolean) => (value ? "True" : "False"),
  },
  {
    key: "priority",
    label: "Priority",
    isCapitalize: true,
    render: (value: boolean) => (value ? "True" : "False"),
  },
  {
    key: "workLocation",
    label: "WorkLocation",
    isCapitalize: true,
  },
  {
    key: "locationType",
    label: "Location Type",
    isCapitalize: true,
  },
  { label: "Job Information", type: "header" },
  {
    key: "jobTitle",
    label: "Job Title",
    isCapitalize: true,
  },
  {
    key: "jobDescription",
    label: "Job Description",
    isCapitalize: true,
    isFullRow: true,
  },
  { label: "Other Details", type: "header" },
  {
    key: "positionType",
    label: "Position Type",
    isCapitalize: true,
  },
  {
    key: "positionsCount",
    label: "Positions Count",
    isCapitalize: true,
  },
  {
    key: "remainingPositions",
    label: "Remaining Positions",
    isCapitalize: true,
  },
  {
    key: "primarySkillSet",
    label: "Primary Skill Set",
    isCapitalize: true,
  },
  {
    key: "secondarySkillSet",
    label: "Secondary Skill Set",
    isCapitalize: true,
  },
  {
    key: "requisitionId",
    label: "Requisition ID",
    isCapitalize: true,
  },
  {
    key: "status",
    label: "Status",
    isCapitalize: true,
  },
  {
    label: "Attachments",
    key: "uploads",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    key: "notes",
    label: "Notes",
    isCapitalize: true,
    isFullRow: true,
  },
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

export const addRecruitmentFieldsStepOne: FieldConfig[] = [
  {
    label: "Profile ID",
    key: "profileId",
    placeholder: "Select Profile Name",
    type: "select",
    required: true,
    options: [],
    labelKey: "profile.firstName",
    valueKey: "profile._id",
  },
  {
    label: "Submitted To",
    key: "submittedTo",
    placeholder: "Select Submitted To",
    type: "text",
    required: true,
  },
  {
    label: "Client",
    key: "customerId",
    placeholder: "Enter Customer",
    type: "select",
    required: true,
    options: [],
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "Email",
    key: "email",
    placeholder: "Enter Email",
    type: "text",
    required: true,
  },
  {
    label: "Phone",
    key: "phone",
    placeholder: "Enter Phone",
    type: "contact",
    required: true,
  },
  {
    label: "Create Date",
    key: "createDate",
    placeholder: "Select Create Date",
    type: "datepicker",
    required: true,
  },
  {
    label: "Background Check",
    key: "backgroundCheck",
    placeholder: "Background Check",
    type: "Switch",
    required: true,
  },
  {
    label: "Face to Face Interview",
    key: "f2fInterview",
    placeholder: "Face to Face Interview",
    type: "Switch",
    required: false,
  },
  {
    label: "Priority",
    key: "priority",
    placeholder: "Priority",
    type: "Switch",
    required: false,
  },
  {
    label: "Location",
    key: "workLocation",
    placeholder: "Location",
    type: "text",
    required: true,
  },
  {
    label: "Location Type",
    key: "locationType",
    placeholder: "Select Location Type",
    type: "dropdown",
    required: true,
    disabled: false,
    options: AppConstants.LocationType,
  },
];

export const addRecruitmentFieldsStepTwo: FieldConfig[] = [
  {
    label: "C2C Rate($)",
    key: "c2cRate",
    placeholder: "Enter C2C Rate",
    type: "number",
    required: true,
  },
  {
    label: "Job Title",
    key: "jobTitle",
    placeholder: "Enter Job Title",
    type: "text",
    required: true,
  },
  {
    label: "Position Type",
    key: "positionType",
    placeholder: "Select Position Type",
    type: "dropdown",
    required: true,
    disabled: true,
    options: AppConstants.RecruitmentPositionType,
  },
  {
    label: "Positions Count",
    key: "positionsCount",
    placeholder: "Enter Positions Count",
    type: "number",
    required: true,
  },
  {
    label: "Primary Skill Set",
    key: "primarySkillSet",
    placeholder: "Enter Primary Skill Set",
    type: "text",
    required: true,
  },
  {
    label: "Secondary Skill Set",
    key: "secondarySkillSet",
    placeholder: "Enter Secondary Skill Set",
    type: "text",
    required: false,
  },
  {
    label: "Status",
    key: "status",
    placeholder: "Select Status",
    type: "dropdown",
    required: true,
    options: AppConstants.RecruitmentStatus,
  },
  {
    label: "Attacthment",
    key: "uploads",
    type: "file",
    required: false,
    fileComponent: (key, field, form) => (
      <UploadAttachment key={key} field={field} form={form} />
    ),
  },
  {
    label: "Job Description",
    key: "jobDescription",
    placeholder: "Enter Job Description",
    type: "textarea",
    required: true,
    singleFieldInRow: true,
    fullRowWidth: true,
  },
  {
    label: "Notes",
    key: "notes",
    placeholder: "Enter Notes",
    type: "textarea",
    required: true,
    singleFieldInRow: true,
    fullRowWidth: true,
  },
];

export const activeSubmissionColumns: any = [
  {
    field: "date",
    headerName: "Date",
    headerClass: "table-header1",
    valueFormatter: ({ value }: any) => AppUtils.unixToDate(value),
    width : 110,
  },
  {
    field: "submittedBy",
    headerName: "Submitted By",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 140,
  },
  {
    field: "referredBy",
    headerName: "Referred By",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 130,
  },
  {
    field: "technology",
    headerName: "Technology",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
    width : 125,
  },
  {
    field: "candidateName",
    headerName: "Candidate Name",
    headerClass: "table-header1",
    cellRenderer: ActiveUserSubmissionssTable,
    valueFormatter: valueFormatter,
    width : 190,
  },
  {
    field: "status",
    headerName: "Status",
    headerClass: "table-header1",
    cellRenderer: CustomRecruitmentSubmissionComponent,
    valueFormatter: valueFormatter,
    width : 95,
  },
  {
    field: "phone",
    headerName: "Phone",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 120,
  },
  {
    field: "email",
    headerName: "Email",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
   //width : 190,
  },
  {
    field: "visa",
    headerName: "Visa",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 80,
  },
  {
    field: "location",
    headerName: "Location",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 105,
  },
  {
    field: "userStatus",
    headerName: "Open To Work",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 145,
  },
  {
    field: "employer",
    headerName: "Employer",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 110,
  },
  {
    field: "linkedIn",
    headerName: "Linked In",
    headerClass: "table-header1",
    cellRenderer: ({ value }: any) => LinkRenderer(value),
    width : 110,
  },
  {
    field: "comments",
    headerName: "Comments",
    headerClass: "table-header1",
    valueFormatter: valueFormatter,
    width : 120,
  },
  {
    headerName: "Actions",
    colId: "action",
    headerClass: "table-header1",
    cellRenderer: "clonedEditButtonRenderer",
    sorting: false,
    editable: false,
    width: 90,
    maxWidth: 150,
    pinned: "right",
  },
];

