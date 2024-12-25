import AppUtils from "../../utils/AppUtils";

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
  
  export const column: any = [
    {
      field: "dept",
      headerName: "DEPT",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
    },
    {
      field: "department",
      headerName: "Department",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
    },
    {
        field: "name",
        headerName: "Contact Person",
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
        headerName: "Phone",
        headerClass: "table-header",
        valueFormatter: (params: { value?: string | null }): string =>
          AppUtils.formatContactNumber(params),
        width: 120,
      },
    ]

export const columnsView = [
    { label: "DEPT", key: "department", isCapitalize: true },
    { label: "Department", key: "department", isCapitalize: true },
    { label: "Contact Person", key: "name", isCapitalize: true },
    { label: "Email", key: "email", isCapitalize: true },
    { label: "Phone", key: "contact", isCapitalize: true },
]
     
