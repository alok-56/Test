import AppUtils from "../../utils/AppUtils";
import { FieldConfig } from "../shared/Form";

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
    field: "company_id",
    headerName: "Vendor ID",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
  },
  {
    field: "name",
    headerName: "Vendor Name",
    headerClass: "table-header",
    filter: true,
    valueFormatter: valueFormatter,
  },
  {
    field: "auditInfo.createdDate",
    headerName: "Date",
    headerClass: "table-header",
    valueFormatter: (params: any) =>  AppUtils.unixToDate(params.value,"MM-DD-YYYY")||"--",
  },


  {
    field: "auditInfo.createdUserName",
    headerName: "Created By",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },

];

export const columnsView = [
  { label: "Vendor Name", key: "name", isCapitalize: true },
  // { lxabel: "Client ID", key: "company_id", isCapitalize: false },
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

export const addVendorFields: FieldConfig[] = [
  {
    label: "Vendor Name",
    key: "name",
    type: "autocomplete",
    placeholder: "Select",
    required: true,
    valueKey: "name",
    labelKey: "name",
    options: [],
  },
];
