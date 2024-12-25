import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, SideBarDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./Submission.css";

import { Button, Modal, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getToken, localHost, localIp } from "../../utils";
import "../AgGridHeaderStyle/AgGridHeaderStyle.css";

import { ISubmissionData } from "../../utils";
import Loader from "../Loader/Loader";
import { useUser } from "../../context/UserContext";
import SubmissionFilters from "./SubmissionFilter";
//import SubmissionFilter from "./SubmissionFilter";
import SubmissionModal from "./SubmissionModal";
import InterviewColumn from "./InterviewColumn";
import axiosInstance from "../../refactoring/services/shared/AxiosService";
import {
  CustomCompanyNameComponent,
  CustomStatusInterviewComponent,
} from "../../refactoring/utils/CustomButton";
import AppUtils from "../../refactoring/utils/AppUtils";
declare global {
  interface Window {
    colState: any[];
  }
}

const { Title } = Typography;
const SubmissionTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<ISubmissionData>>(null);
  const containerStyle = useMemo(
    () => ({ width: "100%", minHeight: "500px" }),
    []
  );
  const disabledDate = false;
  //const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<ISubmissionData[]>([]);
  const { isAdmin } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedSubmission, setSelectedSubmission] = useState<any>("");
  const navigate = useNavigate();
  // const valueFormatter = (params: { value?: string | null }): string => {
  //   return params?.value || "-";
  // };

  const capitalizeFirstLetter = (value: string | undefined): string => {
    if (!value) return "";

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const valueFormatter = (params: { value?: string | null }): string => {
    if (params.value && params.value.includes("@")) {
      return params.value;
    }

    if (typeof params.value === "string") {
      return capitalizeFirstLetter(params.value) || "-";
    } else {
      return params.value || "-";
    }
  };

  const [colDefs] = useState<ColDef[]>([
    {
      field: "subDetails.date",
      headerName: "Date",
      headerClass: "table-header",
      valueFormatter: (params: any) =>
        AppUtils.formatDate(params.value, "MM-DD-YYYY"),
      width: 120,
    },

    //{ field: "subDetails.profile._id", headerName: "User ID",headerClass:"table-header",valueFormatter:valueFormatter },

    {
      field: "subDetails.profile.name",
      headerName: "Candidate Name",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
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
    },

    // { field: "subDetails.client.company_id", headerName: "Client Company ID" },
    {
      field: "subDetails.client.name",
      headerName: "Client Name",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
      cellRenderer: CustomCompanyNameComponent,
    },
    // {
    //   field: "subDetails.client.recruiter.rec_id",
    //   headerName: "Client Recruiter ID",
    // },
    // {
    //   field: "subDetails.client.recruiter.name",
    //   headerName: "Client Recruiter Name",
    // },
    // {
    //   field: "subDetails.client.recruiter.email",
    //   headerName: "Client Recruiter Email",
    // },
    // {
    //   field: "subDetails.client.recruiter.contact",
    //   headerName: "Client Recruiter Contact",
    // },
    // { field: "subDetails.vendor.company_id", headerName: "Vendor Company ID" },
    {
      field: "subDetails.vendor.name",
      headerName: "Vendor Name",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
    },
    // {
    //   field: "subDetails.vendor.recruiter.rec_id",
    //   headerName: "Vendor Recruiter ID",
    // },
    // {
    //   field: "subDetails.vendor.recruiter.name",
    //   headerName: "Vendor Recruiter Name",
    // },
    // {
    //   field: "subDetails.vendor.recruiter.email",
    //   headerName: "Vendor Recruiter Email",
    // },
    // {
    //   field: "subDetails.vendor.recruiter.contact",
    //   headerName: "Vendor Recruiter Contact",
    // },
    // {
    //   field: "subDetails.primevendor.company_id",
    //   headerName: "Prime Vendor Company ID",
    // },
    {
      field: "subDetails.primeVendor.name",
      headerName: "Prime Vendor Name",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
    },
    // {
    //   field: "subDetails.primeVendor.recruiter.rec_id",
    //   headerName: "Prime Vendor Recruiter ID",
    // },
    // {
    //   field: "subDetails.primeVendor.recruiter.name",
    //   headerName: "Prime Vendor Recruiter Name",
    // },
    // {
    //   field: "subDetails.primeVendor.recruiter.email",
    //   headerName: "Prime Vendor Recruiter Email",
    // },
    // {
    //   field: "subDetails.primevendor.recruiter.contact",
    //   headerName: "Prime Vendor Recruiter Contact",
    // },

    // { field: "subDetails.jobDescription", headerName: "Job Description" },

    // { field: "subDetails.workLocation", headerName: "Work Location" },
    // { field: "subDetails.comments", headerName: "Comments" },
    // { field: "auditInfo.createdUserID", headerName: "Created User ID" },
    // { field: "auditInfo.createdUserName", headerName: "Created User Name" },
    // { field: "auditInfo.updatedUserid", headerName: "Updated User ID" },
    // { field: "auditInfo.updatedUserName", headerName: "Updated User Name" },
    // {
    //   field: "auditInfo.createdDate",
    //   headerName: "Created Date",
    //   valueFormatter: (params) => {
    //     const createdDate = new Date(params.value);
    //     const formattedDate = createdDate
    //       .toLocaleDateString()
    //       .replace(/\//g, "-");
    //     return formattedDate;
    //   },
    // },
    // {
    //   field: "auditInfo.updatedDate",
    //   headerName: "Updated Date",
    //   valueFormatter: (params) => {
    //     const updatedDate = new Date(params.value);
    //     const formattedDate = updatedDate
    //       .toLocaleDateString()
    //       .replace(/\//g, "-");
    //     return formattedDate;
    //   },
    // },
    {
      // field: "Action",
      cellRenderer: InterviewColumn,
      cellRendererParams: {
        setIsModalVisible: setIsModalVisible,
        selectedSubmission: selectedSubmission,
      },
      suppressAutoSize: true,
      suppressColumnsToolPanel: true,
      suppressHeaderMenuButton: true,
      suppressMovable: true,
      sortable: false,
      width: 70,
      pinned: "right",
    },
  ]);

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: ["columns"],
    };
  }, []);

  const handleDelete = async () => {
    try {
      setIsModalVisible(false);
      await showDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  const showDeleteConfirmation = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this submission?",
      icon: null,
      okText: "OK",
      cancelText: "Cancel",
      onOk: async () => {
        await deleteSubmission();
      },
    });
  };

  const deleteSubmission = async () => {
    try {
      await axiosInstance.delete(
        `http://${localHost}:${localIp}/api/v1/submission/${selectedSubmission._id}`
      );

      setRowData(
        rowData.filter(
          (submission) => submission._id !== selectedSubmission._id
        )
      );
      message.success("Submission Deleted successfully");
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        if (isAdmin) {
          const response = await axiosInstance.get(
            `http://${localHost}:${localIp}/api/v1/submission`,
            {
              headers: {
                Authorization: `access_Token ${getToken()}`,
                "Content-Type": "application/json",
              },
            }
          );
          const submissionDetails = response.data.reverse();

          setRowData(submissionDetails);
        } else {
          const response = await axiosInstance.get(
            `http://${localHost}:${localIp}/api/v1/submission`,
            {
              headers: {
                Authorization: `access_Token ${getToken()}`,
                "Content-Type": "application/json",
              },
            }
          );

          const submissionDetails = response.data;
          setRowData(submissionDetails);
        }
      } catch (error) {
        console.error("Error fetching Submission details:", error);
      }
    };

    fetchSubmissionDetails();
  }, []);

  const onGridReady = useCallback((params: any) => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
    api.addEventListener("rowClicked", onRowClicked);
  }, []);

  const onRowClicked = (event: any) => {
    const selectedUserData = event.data;

    setSelectedSubmission(selectedUserData);
    setIsModalVisible(true);
  };

  const handleFiltersApplied = (filteredData: ISubmissionData[]) => {
    setRowData(filteredData);
  };

  useEffect(() => {}, [disabledDate]);

  const submissionEdit = () => {
    const updatedDisabledDate = true;

    navigate("/update-submission-form", {
      state: { selectedSubmission, updatedDisabledDate },
    });
  };

  return (
    <div style={containerStyle}>
      <title>Thinklusive - Submissions</title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Title level={4} style={{ margin: "10px 0 10px 0" }}>
            Submissions
          </Title>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SubmissionFilters onFiltersApplied={handleFiltersApplied} />

          <Link to="/submission-form">
            <Button
              type="primary"
              style={{
                margin: "10px 0 15px 0",
              }}
            >
              Add Submission
            </Button>
          </Link>
        </div>
      </div>
      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
        >
          {/* The AG Grid component */}
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs as any}
            onGridReady={onGridReady}
            sideBar={sideBar}
            pagination={true}
            paginationPageSize={20}
            reactiveCustomComponents={true}
            loadingOverlayComponent={() => <Loader />}
            defaultColDef={{
              filter: true,
            }}
            rowSelection="single"
          />
        </div>
      </div>
      <Modal
        title="Submission Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Button onClick={submissionEdit}>Edit</Button>
              <Button
                style={{
                  backgroundColor: "#df4949",
                  borderColor: "#df4949",
                  color: "white",
                  marginLeft: "20px",
                }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
            <div>
              <Button key="back" onClick={() => setIsModalVisible(false)}>
                Close
              </Button>
            </div>
          </div>,
        ]}
        width={700}
        centered
      >
        {selectedSubmission && (
          <SubmissionModal selectedSubmission={selectedSubmission} />
        )}
      </Modal>
    </div>
  );
};

export default SubmissionTable;
