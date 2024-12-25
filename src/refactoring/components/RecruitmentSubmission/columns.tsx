import { FileOutlined } from "@ant-design/icons";
import AppUtils from "../../utils/AppUtils";
import {
  CustomCompanyNameComponent,
  CustomRecruitmentComponent,
  CustomRecruitmentSubmissionComponent,
} from "../../utils/CustomButton";
import { FieldConfig } from "../shared/Form";

import { Typography } from "antd";
import AppConstants from "../shared/constants";
import UploadAttachment from "../submission/Submissions/documentUpload";
import CustomReferences from "./CustomReferences";
import ViewFiles from "../shared/ViewFiles";
import ViewRecruitment from "../Recruitment/ViewRecruitment";
import ActiveUserSubmissionssTable from "./ActiveUserSubmissionsTable";

const { Text, Link } = Typography;
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

export const ResumeRenderer = (params: any) => {
  const name = params.data.candidateName;
  if (params.data.uploads && params.data.uploads.length > 0) {
    const { url } = params.data.uploads[0];

    return (
      <div>
        <Text>
          {AppUtils.capitalizeFirstLetter(name)}{" "}
          <span style={{ fontWeight: "bold" }}>@</span>
        </Text>
        <Link
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          ref={(ref: any) => {
            if (!ref) return;
            ref.onclick = (e: any) => {
              e.stopPropagation();
            };
          }}
          href={url}
        >
          <FileOutlined />
        </Link>
      </div>
    );
  } else {
    return <span>{AppUtils.capitalizeFirstLetter(name)}</span>;
  }
};
export const LinkRenderer = (value: string | null) => {
  if (!value) return <Text type="secondary">----</Text>;

  // Check if the value starts with "http://", "https://", or "www"
  const isValidLink = /^(http:\/\/|https:\/\/|www\.)/.test(value);

  if (isValidLink) {
    // If it's a valid link, render it as a clickable link
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
        href={value.startsWith("www") ? `http://${value}` : value} // Prefix 'www' with 'http://'
        target="_blank"
      >
        Linked In
      </Link>
    );
  }

  // If not a valid link, render the text
  return <Text>---</Text>;
};
export const columns: any = [
  {
    field: "requisitionId",
    headerName: "ID",
    headerClass: "table-header",
    cellRenderer: ViewRecruitment,
    valueFormatter: valueFormatter,
    width : 90,
  },
  {
    field: "date",
    headerName: "Date",
    headerClass: "table-header",
    valueFormatter: ({ value }: any) => AppUtils.unixToDate(value),
    width : 120,
  },
  {
    field: "submittedBy",
    headerName: "Submitted By",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "referredBy",
    headerName: "Referred By",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "technology",
    headerName: "Technology",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
    width : 165,
  },
  {
    field: "candidateName",
    headerName: "Candidate Name",
    headerClass: "table-header",
    cellRenderer:  ActiveUserSubmissionssTable,
    valueFormatter: valueFormatter,
    width : 250,
  },
  {
    field: "status",
    headerName: "Status",
    headerClass: "table-header",
    cellRenderer: CustomRecruitmentSubmissionComponent,
    valueFormatter: valueFormatter,
    width : 110,
  },
  {
    field: "phone",
    headerName: "Phone",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 130,
  },
  {
    field: "email",
    headerName: "Email",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    
  },
  {
    field: "visa",
    headerName: "Visa",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 120,
  },
  {
    field: "location",
    headerName: "Location",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 170,
  },
  {
    field: "userStatus",
    headerName: "Open To Work",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    width : 150,
  },
  {
    field: "employer",
    headerName: "Employer",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "linkedIn",
    headerName: "Linked In",
    headerClass: "table-header",
    cellRenderer: ({ value }: any) => LinkRenderer(value),
    width : 120,
  },

  {
    field: "comments",
    headerName: "Comments",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
];


export const activeUserSubmission = [
  {

    headerName: "Released Date",
    headerClass: "table-header",
    valueFormatter: (params: any) =>
    AppUtils.unixToDate(params.data.requisitions?.[0]?.createDate, "MM-DD-YYYY"),
    width : 150,
  },
  {
    headerName: "Req ID",
    headerClass: "table-header",
    valueGetter: (params:any) => params.data.requisitions?.[0]?.requisitionId || "",
    valueFormatter: valueFormatter,
    width:100
  },
  {
    headerName: "Status",
    headerClass: "table-header",
    valueGetter: (params:any) => params.data.requisitions?.[0]?.status || "",
    valueFormatter: valueFormatter,
    cellRenderer: CustomRecruitmentComponent,
    width:120
  },
  {
    field: "_id",
    headerName: "Email",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    headerName: "Job Title",
    headerClass: "table-header",
    valueGetter: (params:any) => params.data.requisitions?.[0]?.jobTitle || "",
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
  },
  {
    headerName: "Rate($)",
    headerClass: "table-header",
    valueGetter: (params:any) => String(params.data.requisitions?.[0]?.c2cRate) || "",
    valueFormatter: valueFormatter,
    width : 100,
  },
];


export const columnsView: any = [
  { label: "Basic Details", type: "header" },
  {
    label: "Candidate Name",
    key: "candidateName",
    isCapitalize: true,
  },
  {
    key: "submittedBy",
    label: "Submitted By",
    isCapitalize: true,
  },
  {
    label: "Requisition ID",
    key: "requisitionId",
    isCapitalize: true,
  },
  {
    label: "Referred By",
    key: "referredBy",
    isCapitalize: true,
  },
  {
    label: "Phone",
    key: "phone",
    isCapitalize: true,
  },
  {
    label: "Email",
    key: "email",
    isCapitalize: true,
  },
  {
    label: "Date",
    key: "date",
    isCapitalize: true,
    type: "date",
  },
  {
    label: "Location",
    key: "location",
    isCapitalize: true,
  },
  {
    label: "Employer",
    key: "employer",
    isCapitalize: true,
  },
  {
    label: "Visa",
    key: "visa",
    isCapitalize: true,
  },
  {
    label: "Technology",
    key: "technology",
    isCapitalize: true,
  },
  {
    key: "c2cPayRate",
    label: "C2C Rate",
    isCapitalize: true,
  },
  {
    key: "billRate",
    label: "Bill Rate",
    
  },
  {
    label: "Status",
    key: "status",
    isCapitalize: true,
  },
  {
    label: "Open To Work ",
    key: "userStatus",
    isCapitalize: true,
  },
  {
    label: "Attachments",
    key: "uploads",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    label: "Linkedin",
    key: "linkedIn",
    render: (params: any) => LinkRenderer(params?.linkedIn),
    isFullRow: true,
  },
  {
    label: "Comments",
    key: "comments",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    label: "References",
    key: "references",
    isCapitalize: false,   
    render: (value: any) =><ViewFiles references={value?.references} />,
    isFullRow: true
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

export const addRecruitmentSubmissionFieldsStepOne: FieldConfig[] = [
  {
    label: "Candidate Name",
    key: "candidateName",
    type: "text",
    placeholder: "Enter Candidate Name",
    required: true,
  },
  {
    label: "Submitted By",
    key: "submittedBy",
    placeholder: "Select Submitted By",
    type: "select",
    required: true,
    options: [],
    labelKey: "profile.firstName",
    valueKey: "profile._id",
  },
  {
    label: "Phone",
    key: "phone",
    type: "contact",
    placeholder: "Enter Phone",
    required: true,
  },
  {
    label: "Email",
    key: "email",
    type: "text",
    placeholder: "Enter Email",
    required: true,
  },
  {
    label: "Location",
    key: "location",
    type: "text",
    placeholder: "Enter Location",
    required: true,
  },
  {
    label: "Requisition ID",
    key: "requisitionId",
    type: "select",
    placeholder: "Enter Req ID",
    required: true,
    options: [],
    labelKey: "id",
    valueKey: "id",
  },
  {
    label: "Employer",
    key: "employer",
    type: "text",
    placeholder: "Enter Employee Name",
    required: true,
  },
  {
    label: "Referred By",
    key: "referredBy",
    type: "text",
    placeholder: "SelectReferred By",
    required: true,
  },
  {
    label: "Date",
    key: "date",
    type: "datepicker",
    placeholder: "Select Work Start Date",
    required: true,
    includeTime: false,
  },
  {
    label: "Status",
    key: "status",
    type: "dropdown",
    placeholder: "Select Status",
    required: true,
    options: AppConstants.RecruitmentSubmissionStatus,
  },
];

export const addRecruitmentSubmissionFieldsStepTwo: FieldConfig[] = [
  {
    label: "C2C Rate($)",
    key: "c2cPayRate",
    placeholder: "Enter C2C Rate",
    type: "number",
    required: true,
  },
  {
    label: "Bill Rate",
    key: "billRate",
    placeholder: "Enter C2C Rate",
    type: "number",
    required: true,
  },
  {
    label: "Visa",
    key: "visa",
    type: "select",
    placeholder: "select visa",
    required: true,
    options: AppConstants.visaStatus,
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
    label: "Linkedin",
    key: "linkedIn",
    type: "text",
    placeholder: "Enter Linkedin",
    required: false,
  },
  {
    label: "Open To Work",
    key: "userStatus",
    placeholder: "Select Open To Work",
    type: "dropdown",
    required: false,
    disabled: false,
    options: AppConstants.SourcingType,
  },
  {
    label: "",
    key: "references",
    type: "dynamic",
    dynamicComponent: (key: string, field: any, form: any) => (
      <CustomReferences key={key} field={field} form={form} />
    ),
    dynamicFields: [
      {
        label: "Name",
        key: "name",
        type: "text",
        placeholder: "Enter Reference name",
        required: false,
      },
      {
        label: "Email",
        key: "email",
        type: "text",
        placeholder: "Enter Reference Email",
        required: false,
      },
      {
        label: "Phone",
        key: "phone",
        type: "contact",
        placeholder: "Enter Reference Phone Number",
        required: false,
      },
      {
        label: "LinkedIn ",
        key: "url",
        type: "text",
        placeholder: "Enter Reference name",
        required: false,
      },
    ],
    singleFieldInRow: true,
    fullRowWidth: true,
  },
  {
    label: "Technology",
    key: "technology",
    type: "textarea",
    disabled: false,
    placeholder: "Enter Technology",
    fullRowWidth: true,
    required: true,
  },
  {
    label: "Comments",
    key: "comments",
    type: "textarea",
    required: true,
    placeholder: "Please Enter comments",
    fullRowWidth: true,
  },
];
