import AppUtils from "../../utils/AppUtils";
import { FieldConfig } from "../shared/Form";
import {
  CustomCompanyNameComponent,
  CustomDobComponent,
  CustomWAAuthComponent,
} from "../../utils/CustomButton";
import { CustomCellEditor } from "./CustomComponent";
import { LinkRenderer } from "../recruiter/columns";

const valueFormatter = (params: { value?: string | number | null }): string => {
  if (typeof params.value === "number" && Number.isInteger(params.value)) {
    return params.value.toString();
  }

  if (params.value && typeof params.value === "string" && params.value.includes("@")) {
    return params.value;
  }

  if (typeof params.value === "string") {
    return AppUtils.capitalizeFirstLetter(params.value) || "-";
  } else {
    return params.value?.toString() || "-";
  }
};


export const columns: any = [
  {
    field: "firstName",
    headerName: "First Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 140,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 140,
  },
  // {
  //   field: "priority",
  //   headerName: "Priority",
  //   headerClass: "table-header",
  //   filter: true,
  //   sort: "asc",
  //   valueFormatter: valueFormatter,
  //   cellRenderer: CustomPriorityComponent,
  //   width: 120,
  // },
  {
    field: "company",
    headerName: "Company",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    cellRenderer:CustomCompanyNameComponent,
    width : 120,
  },
  {
    field: "technology",
    headerName: "Technology",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
    width: 155,
  },
  {
    field: "dob",
    headerName: "DOB",
    headerClass: "table-header",
    filter: true,
    cellRenderer: CustomDobComponent,
    width: 100,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    headerClass: "table-header",
    filter: true,
    valueFormatter: (params: { value?: string | null }): string =>
      AppUtils.formatContactNumber(params),
    width : 150,
  },
  {
    field: "location",
    headerName: "Location",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width: 150,
  },
  {
    field: "rate",
    headerName: "Rate",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    width : 80,
  },
  {
    field: "visaStatus",
    headerName: "WA Auth",
    headerClass: "table-header",
    filter: true,
    cellRenderer: CustomWAAuthComponent,
    width: 120,
  },
  {
    field: "marketingStartDate",
    headerName: "Marketing Start Date",
    headerClass: "table-header",
    filter: true,
    valueFormatter: ({ value }: any) =>
      value ? AppUtils.formatDate(value, "MM-DD-YYYY") : "--",
    width: 120,
  },

  {
    field: "salesPerson",
    headerName: "Sales Recruiter",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
  },
  {
    field: "linkedIn",
    headerName: "LinkedIn",
    headerClass: "table-header",
    filter: true,
    cellRenderer: ({ value }: any) => LinkRenderer(value),
    //valueFormatter: valueFormatter,
    width : 120,
  },
  {
    field: "comments",
    headerName: "Comments",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
    flex: 1,
    minWidth: 200,
  },
];

export const cloneColumns: any = [
  {
    field: "firstName",
    headerName: "Name",
    headerClass: "table-header",
    filter: true,
    cellEditor: CustomCellEditor,
    cellEditorParams: (params: any) => {
      const users = params.context.users || [];
      const formattedOptions = users.map((option: any) => ({
        value: option.profile._id, // Using _id as the value
        label:  `${option.profile.firstName} ${option.profile.lastName} (${option.profile._id})`, // Using firstName as the label
      }));
      return {
        values: formattedOptions,
        valueListMaxHeight: 200,
        valueListMaxWidth: 150,
        placeholder: "Select User",
        labelKey: "label",
        valueKey: "value",
      };
    },
    valueFormatter: (params: any) => {
      const users = params.context.users || [];
      const matchingUser = users.find(
        (user: any) => user.profile._id === params.value
      );
      return matchingUser
        ? `${matchingUser.profile.firstName} ${matchingUser.profile.lastName}`
        : `${params.value} ${params?.data?.lastName|| ''}`;
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    headerClass: "table-header",
    filter: true,
    cellEditor: CustomCellEditor,
    cellEditorParams: {
      values: [
        { label: "P1", value: "P1" },
        { label: "P2", value: "P2" },
        { label: "P3", value: "P3" },
        { label: "H1BT", value: "H1BT" },
      ],
      customLabel: false,
      placeholder: "Select Priority",
    },
    valueFormatter: valueFormatter,
  },

  {
    field: "salesPerson",
    headerName: "Sales Person",
    headerClass: "table-header",
    filter: true,

    cellEditor: CustomCellEditor,
    cellEditorParams: (params: any) => {
      const recruiters = params.context.recruiters || [];
      return {
        values: recruiters,
        customLabel: false,
        placeholder: "Select Sales Person",
        valueListMaxHeight: 200,
        valueListMaxWidth: 150,
      };
    },
    valueFormatter: valueFormatter,
  },
  {
    field: "rate",
    headerName: "Rate/hr",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,

  },
  {
    field: "comments",
    headerName: "Comments",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
  },
  {
    headerName: "Actions",
    colId: "action",
    cellRenderer: "cloneButtonRenderer",
    sorting: false,
    editable: false,
    width: 100,
    maxWidth: 150,
  },
];

export const columnsView = [
  {
    key: "firstName",
    label: "Name",

    isCapitalize: true,
  },
  {
    key: "mobile",
    label: "Mobile",
    isCapitalize: true,
  },
  {
    key: "company",
    label: "Company",
    isCapitalize: true,
  },
  {
    key: "priority",
    label: "Priority",
    isCapitalize: true,
  },
  {
    key: "dob",
    label: "Date of Birth",
    isCapitalize: true,
    type: "date",
  },
  {
    key: "technology",
    label: "Technology",
    isCapitalize: true,
  },
  {
    key: "location",
    label: "Location",
    isCapitalize: true,
  },
  {
    key: "visaStatus",
    label: "WA Auth",
    isCapitalize: true,
  },
  {
    key: "marketingStartDate",
    label: "Marketing Start Date",
    isCapitalize: true,
    type: "date",
  },
  {
    key: "date",
    label: "Date",
    isCapitalize: true,
    type: "date",
  },
  {
    key: "salesPerson",
    label: "Sales Recruiter",
    isCapitalize: true,
  },

  {
    key: "comments",
    label: "Comments",
    isCapitalize: true,
    valueFormatter: valueFormatter,
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

export const addHotListFields: FieldConfig[] = [
  {
    label: "Date",
    key: "date",
    type: "datepicker",
    placeholder: "Please Select Date",
    required: true,
    includeTime: false,
  },
  {
    label: "Priority",
    key: "priority",
    placeholder: "Select",
    required: true,
    type: "dropdown",
    options: [
      { value: "P1", label: "P1" },
      { value: "P2", label: "P2" },
      { value: "P3", label: "P3" },
      { value: "H1BT", label: "H1BT" },
    ],
  },
  {
    label: "User ID",
    key: "userID",
    type: "text",
    required: true,
    placeholder: "Please Enter User ID",
  },
  {
    label: "Sales Person",
    key: "salesPerson",
    placeholder: "Please Enter Sales Person",
    required: true,
  },
  {
    label: "Comments",
    key: "comments",
    placeholder: "Please Enter Comments",
    required: true,
  },
];
