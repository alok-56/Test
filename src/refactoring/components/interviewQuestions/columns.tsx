import { RobotOutlined, UserOutlined } from "@ant-design/icons";
import AppUtils from "../../utils/AppUtils";
import { CustomCompanyNameComponent } from "../../utils/CustomButton";
import { FieldConfig } from "../shared/Form";
import AppConstants from "../shared/constants";
import CustomQuestions from "./CustomQuestions";

const valueFormatter = (params: { value?: string | null }): string => {
  if (Array.isArray(params.value)) {
    return params.value.length.toString();
  }
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
    field: "auditInfo.createdDate",
    headerName: "Date",
    headerClass: "table-header",
    valueFormatter: ({ value }: any) => {
      if (!value) {
        return "---";
      }
      return AppUtils.unixToDate(value, "MM-DD-YYYY");
    },
  },
  {
    field: "client",
    headerName: "Client",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
    cellRenderer: CustomCompanyNameComponent,
  },
  {
    field: "vendor",
    headerName: "Vendor",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "round",
    headerName: "Round",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "position",
    headerName: "Position",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },

  {
    field: "questions",
    headerName: "Questions Count",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
];

export const columnsView = [
  { label: "Client", key: "client", isCapitalize: true },
  { label: "Vendor", key: "vendor", isCapitalize: true },
  { label: "Position", key: "position", isCapitalize: true },
  { label: "Round", key: "round", isCapitalize: true },

  {
    label: "Questions",
    key: "questions",
    isCapitalize: true,
    isFullRow: true,
  },

];

export const addInterviewTypeFields: FieldConfig[] = [
  {
    label: "Difficulty Level",
    key: "difficultyLevel",
    required: true,
    type: "radio",
    options: [
      { value: "Easy", label: "Easy" },
      { value: "Medium", label: "Medium" },
      { value: "Hard", label: "Hard" },
    ],
  },
  {
    label: "Tags",
    key: "tags",
    required: true,
    type: "tag",
    singleFieldInRow: true,
    tooltip:"To add a tag, hit Enter"
  },
  {
    label: "",
    key: "questions",
    type: "dynamic",
    dynamicComponent: (key: string, field: any, form: any) => (
      <CustomQuestions key={key} field={field} form={form} />
    ),
    dynamicFields: [
      {
        label: "Question",
        key: "text",
        type: "textarea",
        placeholder: "Enter question...",
        required: true,
      },
      {
        label: "Answered By",
        key: "promptBy",
        type: "dropdown",
        required: true,
        dynamicOtions: [
          { label: "AI Assistant", value: 0, icon: <RobotOutlined /> },
          { label: "You", value: 1, icon: <UserOutlined /> },
        ],
      },
      {
        label: "",
        key: "answer",
        type: "textarea",
        placeholder: "Enter Answer...",
        required: true,
      },
    ],
    singleFieldInRow: true,
    fullRowWidth: true,
  },
  {
    label: "Notes",
    key: "notes",
    type: "textarea",
    required: true,
    placeholder: "Got any tips to help other to prepare better?",
    singleFieldInRow: true,
    fullRowWidth: true,
  },
];

export const addInterviewPreparationFields: FieldConfig[] = [
  {
    label: "Client",
    key: "client",
    type: "autocomplete",
    placeholder: "Select",
    required: true,
    valueKey: "name",
    labelKey: "name",
    options: [],
  },
  {
    label: "Vendor",
    key: "vendor",
    type: "autocomplete",
    placeholder: "Select",
    required: true,
    valueKey: "name",
    labelKey: "name",
    options: [],
  },

  {
    label: "Position",
    key: "position",
    type: "autocomplete",
    placeholder: "Enter Position",
    required: true,
    options: [
      {
        value: "Software Development Engineer",
        label: "Software Development Engineer",
      },
      { value: "Software Engineer", label: "Software Engineer" },
      { value: "Frontend Developer", label: "Frontend Developer" },
      { value: "Backend Developer", label: "Backend Developer" },
      { value: "Full Stack Developer", label: "Full Stack Developer" },
      { value: "DevOps Engineer", label: "DevOps Engineer" },
      {
        value: "Quality Assurance Engineer",
        label: "Quality Assurance Engineer",
      },
      { value: "Data Engineer", label: "Data Engineer" },
      { value: "Data Scientist", label: "Data Scientist" },
      { value: "UI/UX Designer", label: "UI/UX Designer" },
      { value: "Others", label: "Others" },
    ],
  },
  {
    label: "Round",
    key: "round",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: AppConstants.StatusList,
  },
  ...addInterviewTypeFields,
];
