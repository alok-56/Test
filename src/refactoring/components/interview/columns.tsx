import AppUtils from "../../utils/AppUtils";
import { FieldConfig } from "../shared/Form";
import InterviewPanel from "./InterviewPanel";




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
    field: "subDetails.profile.name",
    headerName: "Name",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  // ]
  // : []),
  {
    field: "status",
    headerName: "Status",
    headerClass: "table-header",
  },
  {
    field: "start_time",
    headerName: "StartTime",
    headerClass: "table-header",
    valueFormatter: (params: any) => {
      const createdDate = new Date(params.value * 1000);
      const formattedDate = createdDate
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",

          hour12: true,
        })
        .replace(/\//g, "-");
      return formattedDate || "-";
    },
  },
  {
    field: "end_time",
    headerName: "EndTime",
    headerClass: "table-header",
    valueFormatter: (params: any) => {
      const createdDate = new Date(params.value * 1000);
      const formattedDate = createdDate
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",

          hour12: true,
        })
        .replace(/\//g, "-");
      return formattedDate || "-";
    },
  },
  {
    field: "subDetails.client.name",
    headerName: "Client",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "subDetails.vendor.name",
    headerName: "Vendor",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "mode",
    headerName: "Mode",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "subDetails.salesRecruiter",
    headerName: "Recruiter",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
  {
    field: "inviteReceived",
    headerName: "Invite Received",
    headerClass: "table-header",
  },
  {
    field: "interviewStatus",
    headerName: "Interview Status",
    headerClass: "table-header",
  },
  {
    field: "subDetails.jobRole",
    headerName: "Technology",
    headerClass: "table-header",
    valueFormatter:valueFormatter
  },
  {
    field: "comments",
    headerName: "Comments",
    headerClass: "table-header",
    valueFormatter: valueFormatter,
  },
];

export const columnsView = [
  {
    label: "Name",
    key: "subDetails.profile.name",
    isCapitalize: false,
  },
  {
    label: "Client",
    key: "subDetails.client.name",
    isCapitalize: true,
  },
  {
    label: "Vendor",
    key: "subDetails.vendor.name",
    isCapitalize: false,
  },
  {
    label: "Recruiter",
    key: "subDetails.salesRecruiter",
    isCapitalize: true,
  },
  {
    label: "Start Time",
    key: "start_time",
    isCapitalize: false,
    type: "date",
  },
  {
    label: "End Time",
    key: "end_time",
    isCapitalize: true,
    type: "date",
  },
  {
    label: "Mode",
    key: "mode",
    isCapitalize: true,
  },
  {
    label: "Status",
    key: "status",
    isCapitalize: true,
  },
  {
    label: "Invite Received",
    key: "inviteReceived",
    isCapitalize: false,
    render: (value: any) => {
      if(value.inviteReceived===true){
        return "Received"
      }else{
        return "Not Received"
      }
    }
  },
  {
    label: "Interview Status",
    key: "interviewStatus",
    isCapitalize: false,
    render: (value:any) => {
      if (!value.interviewStatus ) {
        return "----";
      }else{
        return value.interviewStatus
      }
    }
    
  },
  {
    label: "Interview Panel",
    key: "panel",
    isCapitalize: false,   
    render: (value: any) =><InterviewPanel panel={value.panel} />,
    isFullRow: true
  },
  
  {
    label: "Comments",
    key: "comments",
    isCapitalize: true,
    isFullRow: true
  },
  {
    label: "Questions Asked",
    key: "interviewQuestions",
    isCapitalize: true,
    isFullRow: true,
    singleFieldInRow: true,
  },
  // {
  //   label: "Created Date",
  //   key: "auditInfo.createdDate",
  //   isCapitalize: false,
  //   type: "date",
  // },
  // {
  //   label: "Created By",
  //   key: "auditInfo.createdUserName",
  //   isCapitalize: true,
  // },
  // {
  //   label: "Updated Date",
  //   key: "auditInfo.updatedDate",
  //   isCapitalize: false,
  //   type: "date",
  // },
  // {
  //   label: "Updated By",
  //   key: "auditInfo.updatedUserName",
  //   isCapitalize: true,
  // },
];

export const addInterviewFields: FieldConfig[] = [
  {
    label: "Status",
    key: "status",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "Comments", label: "Comments" },
      { value: "Direct Client Interview", label: "Direct Client Interview" },
      { value: "Implementer Interview", label: "Implementer Interview" },

      { value: "First Round", label: "First Round" },
      { value: "No Response", label: "No Response" },
      {
        value: "Vendor Technical Screening",
        label: "Vendor Technical Screening",
      },
      { value: "Written Test", label: "Written Test" },
      { value: "Coding Test", label: "Coding Test" },
      { value: "Rejected", label: "Rejected" },
      { value: "Applied", label: "Applied" },
    ],
  },
  {
    label: "Start Time",
    key: "startTime",
    type: "datepicker",
    placeholder: "Select start time",
    required: true,
    includeTime: false,
  },
  {
    label: "End Time",
    key: "endTime",
    type: "datepicker",
    placeholder: "Select end time",
    required: true,
    includeTime: true,
  },
  {
    label: "Interview Panel",
    key: "interviewPanel",
    required: true,
    type: "array",
    fields: [
      {
        label: "Name",
        key: "name",
        type: "text",
        placeholder: "Enter Name",
        required: true,
      },
      {
        label: "Mail ID",
        key: "mailID",
        type: "text",
        placeholder: "Enter Mail ID",
        required: true,
      },
      {
        label: "Linkedin ID",
        key: "linkedinID",
        type: "linkedin",
        placeholder: "Enter Linkedin ID",
        required: true,
      },
    ],
  },
  {
    label: "Mode",
    key: "mode",
    type: "dropdown",
    placeholder: "Select",
    required: true,
    options: [
      { value: "video", label: "Video" },
      { value: "onlineTest", label: "Online Test" },
      { value: "Video+Coding", label: "Video+Coding" },
    ],
  },
  {
    label: "Invite Received",
    key: "inviteReceived",
    required: true,
  },
  {
    label: "Interview Status",
    key: "interviewStatus",
    required: true,
  },
  {
    label: "Comments",
    key: "comments",
    required: true,
    type: "text",
  },
];
