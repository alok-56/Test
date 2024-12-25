import AppUtils from "../../utils/AppUtils";
import { FieldConfig } from "../shared/Form";
import {
  CustomCompanyNameComponent,
  CustomRecruiterTypeComponent,
} from "../../utils/CustomButton";
import { Typography } from "antd";

const { Link, Text } = Typography;
const valueFormatter = (params: { value?: string | null }): string => {
  if (params?.value && params?.value.includes("@")) {
    return params.value;
  }

  if (typeof params.value === "string") {
    return AppUtils.capitalizeFirstLetter(params.value) || "-";
  } else {
    return params.value || "-";
  }
};

export const LinkRenderer = (value: string | null) => {
  if (!value) return <Text type="secondary">----</Text>;

  // Check if the value starts with "http://", "https://", or "www"
  const isValidLink = /^(http:\/\/|Http:\/\/|https:\/\/|Https:\/\/|www\.|WWW\.)/.test(value);

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
        href={value.startsWith('www') ? `http://${value}` : value} // Prefix 'www' with 'http://'
        target="_blank"
      >
        Linked In
      </Link>
    );
  }

  // If not a valid link, render the text
  return <Text>{valueFormatter({value})}</Text>;
};


export const columns: any = [
  {
    field: "rec_id",
    headerName: "Recruiter ID",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
  },
  {
    field: "name",
    headerName: "Recruiter Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
  },
  {
    field: "email",
    headerName: "Email",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "contact",
    headerName: "Contact",
    headerClass: "table-header",
    valueFormatter: (params: { value?: string | null }): string =>
      AppUtils.formatContactNumber(params),
    width: 120,
  },
  {
    field: "company_name",
    headerName: "Company Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
  },
  {
    field: "technology",
    headerName: "Technology",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
  },
  {
    field: "type",
    headerName: "Type",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer: CustomRecruiterTypeComponent,
    width: 120,
  },
  {
    field: "linked_in",
    headerName: "Linked In",
    headerClass: "table-header",
    cellRenderer: ({ value }: any) => LinkRenderer(value),
    width: 120,
    valueFormatter:valueFormatter
  },
];

export const columnsView = [
  { label: "Company Name", key: "company_name", isCapitalize: true },
  { label: "Type", key: "type", isCapitalize: true },
  { label: "Recruiter Name", key: "name", isCapitalize: true },
  { label: "Email", key: "email", isCapitalize: true },
  { label: "Contact", key: "contact", isCapitalize: true },
  {
    label: "Technology",
    key: "technology",
    isCapitalize: true,
  },
  {
    label: "Linkedin",
    key: "linked_in",
    render: ({ linked_in }: any) => LinkRenderer(linked_in),
  },

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

export const addRecruiterFields: FieldConfig[] = [
  {
    label: "Recruiter Type",
    key: "type",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "vendor", label: "Vendor" },
      { value: "client", label: "Client" },
    ],
  },
  {
    label: "Company ID",
    key: "company_id",
    type: "text",
    disabled: true,
    placeholder: "Enter Company ID",
  },
  {
    label: "Company Name",
    key: "company_name",
    type: "autocomplete",
    placeholder: "Enter Company Name",
    required: true,
    labelKey: "name",
    valueKey: "name",
  },
  {
    label: "Name",
    key: "name",
    type: "text",
    placeholder: "Enter Name",
    required: true,
    // options: [],
    // labelKey: "name",
    // valueKey: "rec_id",
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
    key: "contact",
    type: "contact",
    placeholder: "Enter Contact",
    required: true,
  },
  {
    label: "Linkedin",
    key: "linked_in",
    type: "linkedin",
    placeholder: "Enter Linkedin",
    required: true,
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
];
