import AppUtils from "../../utils/AppUtils";
import {  CustomTechnology } from "../../utils/CustomButton";
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
    field: "key",
    headerName: "Keyword",
    headerClass: "table-header",   
    width:150,
    valueFormatter: valueFormatter,
  },

  {
    field: "description",
    headerName: "Description",
    headerClass: "table-header",
    wrapText: true,
    autoHeight: true,
    width:950,
    cellStyle: { lineHeight: '2' },
    valueFormatter: valueFormatter,
  },
  {
    field: "tags",
    headerName: "Tags",
    headerClass: "table-header",
    flex:1,
    valueFormatter: valueFormatter,
    cellRenderer:CustomTechnology
  },
];

export const columnsView = [
  { label: "Keyword", key: "key", isCapitalize: true },
  {
    label: "Description",
    key: "description",
    isCapitalize: true,
    isFullRow: true,
  },
  {
    label: "Technology",
    key: "technology",
    isCapitalize: true,
    isFullRow: true,
  },
  { label: "Tags", key: "tags", isCapitalize: true, isFullRow: true },
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
    valueFormatter: valueFormatter,
  },
];

export const addKeywordFields: FieldConfig[] = [
  {
    label: "Keyword",
    key: "key",
    type: "text",
    placeholder: "Please Enter keyword",
    required: true,
    singleFieldInRow:true,
  },
  {
    label: "Tags",
    key: "tags",
    type: "tag",
    required: true,
    singleFieldInRow:true,
    tooltip:"To add a tag, hit Enter"
  },
  {
    label: "Description",
    key: "description",
    type: "textarea",
    placeholder: "Please Enter Description",
    required: true,
    fullRowWidth:true
  },
  {
    label: "Technology",
    key: "technology",
    type: "textarea",
    placeholder: "Please Enter Description",
    required: true,
  },
];
