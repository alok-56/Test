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
import { Modal, message, Row } from "antd";

import "../AgGridHeaderStyle/AgGridHeaderStyle.css";
import Loader from "../Loader/Loader";

import { useUser } from "../../context/UserContext";
import InterviewFilters from "./InterviewFilters";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../refactoring/services/shared/AxiosService";
import AppUtils from "../../refactoring/utils/AppUtils";
import {
  CustomCompanyNameComponent,
  CustomInterviewModeComponent,
  CustomInterviewStatusComponent,
  CustomInviteReceivedComponent,
  CustomStatusInterviewComponent,
} from "../../refactoring/utils/CustomButton";
import ViewInterview from "../../refactoring/components/interview/ViewInterview";
import { REACT_API_URL } from "../../urlConfig";
import ViewSubmissions from "../../refactoring/components/submission/Submissions/ViewSubmission";

import useGet from "../../refactoring/hooks/useGet";
import InterviewService from "../../refactoring/services/InterviewService";
import TableHeader from "../../refactoring/components/shared/TableHeader";

declare global {
  interface Window {
    colState: any[];
  }
}



const initialFilters = {
  fromDate: "",
  toDate: "",
  name: undefined,
};

const interviewService = new InterviewService();
const InterviewTable: React.FC = () => {
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact<any>>(null);
  const containerStyle = useMemo(
    () => ({ width: "100%", minHeight: "500px" }),
    []
  );
  const [disabledDate, setDisabledDate] = useState<any>(false);
  const [rowData, setRowData] = useState<any[]>([]);
  const { isAdmin } = useUser();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any | null>(
    rowData[0] || null
  );
  const [filters, setFilters] = useState(initialFilters);
  const { fetchData, data } = useGet();
  const { fetchData: fetchRecruiters, data: interviewData } = useGet();

  const getInterviewFilters = async (filters: any, interviewData: any) => {
    await fetchData(
      interviewService.getInterviewFilters(filters, interviewData)
    );
  };
  const getInterview = async () => {
    await fetchRecruiters(interviewService.getInterviews());
  };

  useEffect(() => {
    getInterview();
  }, []);

  useEffect(() => {
    getInterviewFilters(filters, interviewData);
  }, [filters]);

  const [colDefs] = useState<ColDef[]>([
    ...(isAdmin
      ? [
          {
            field: "subDetails.profile.name",
            headerName: "Name",
            headerClass: "table-header",
            cellRenderer: ViewSubmissions,
            valueFormatter: AppUtils.valueFormatter,
          },
        ]
      : []),
    {
      field: "status",
      headerName: "Status",
      headerClass: "table-header",
      cellRenderer: CustomStatusInterviewComponent,
    },
    {
      headerName: "Date",
      field: "start_time",
      headerClass: "table-header",
      valueFormatter: (params: any) =>
        AppUtils.unixToDate(params.value, "MM-DD-YYYY"),
      width: 120,
    },
    {
      headerName: "Time",
      headerClass: "table-header",
      valueGetter: AppUtils.formatTimeRange,
    },
    {
      field: "inviteReceived",
      headerName: "Invite Received",
      headerClass: "table-header",
      cellRenderer: CustomInviteReceivedComponent,
      width: 120,
    },
    {
      field: "questionsExist",
      headerName: "Questions Added",
      headerClass: "table-header",
      cellRenderer: CustomInviteReceivedComponent,
      width: 120,
    },
    {
      field: "interviewStatus",
      headerName: "Interview Status",
      headerClass: "table-header",
      cellRenderer: CustomInterviewStatusComponent,
      width: 120,
    },
    {
      field: "subDetails.jobRole",
      headerName: "Technology",
      headerClass: "table-header",
      valueFormatter: AppUtils.valueFormatter,
      cellRenderer: CustomCompanyNameComponent,
    },
    {
      field: "subDetails.client.name",
      headerName: "Client",
      headerClass: "table-header",
      valueFormatter: AppUtils.valueFormatter,
      cellRenderer: CustomCompanyNameComponent,
    },
    {
      field: "subDetails.vendor.name",
      headerName: "Vendor",
      headerClass: "table-header",
      valueFormatter: AppUtils.valueFormatter,
    },
    {
      field: "subDetails.salesRecruiter",
      headerName: "Recruiter",
      headerClass: "table-header",
      valueFormatter: AppUtils.valueFormatter,
    },
    {
      field: "mode",
      headerName: "Mode",
      headerClass: "table-header",
      valueFormatter: AppUtils.valueFormatter,
      cellRenderer: CustomInterviewModeComponent,
      width: 150,
    },
    {
      field: "comments",
      headerName: "Comments",
      headerClass: "table-header",
      valueFormatter: AppUtils.valueFormatter,
      flex: 1,
      minWidth: 200,
    },
  ]);

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: ["columns"],
    };
  }, []);

  const handleDelete = async () => {
    try {
      await showDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  const showDeleteConfirmation = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this Interview?",
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
        `${REACT_API_URL}/interview/${selectedInterview._id}`
      );

      setIsAddModalVisible(false);

      setRowData(
        data.filter((interview: any) => interview._id !== selectedInterview._id)
      );
      getInterviewFilters(filters, interviewData);
      message.success("Interview successfully Deleted");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `${REACT_API_URL}/interview?onlyInterviews=true`
        );

        const res = response.data;
        const interviewsData = res.sort(
          (a: any, b: any) => b.start_time - a.start_time
        );

        const interviewDetails = interviewsData.filter(
          (interview: any) =>
            interview.status !== "Rejected" &&
            interview.status !== "No Response"
        );

        setRowData(interviewDetails);
      } catch (error: any) {
        message.error(error.response.data.message);
      }
    };

    fetchInterviewDetails();
  }, []);

  const onGridReady = useCallback((params: any) => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
    api.addEventListener("rowClicked", onRowClicked);
  }, []);

  const onRowClicked = (event: any) => {
    const selectedInterviewData = event.data;
    setSelectedInterview(selectedInterviewData);

    setIsAddModalVisible(true);
  };

  const handleEditInterview = () => {
    navigate("/update-interview", {
      state: { selectedInterview, disabledDate },
    });
    setDisabledDate(true);
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };
  return (
    <div style={containerStyle}>
      <title>Thinklusive - Interviews</title>

      <TableHeader
        title="Interview"
        centerComponent={
          <Row justify="end" align="middle" gutter={4}>
          <InterviewFilters
            filters={filters}
            setFilters={setFilters}
            onClearFilter={handleClearFilter}
            isAdmin={isAdmin}
            interviewData={data}
          
          />
          </Row>
        }
      />
      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={colDefs as any}
            onGridReady={onGridReady}
            sideBar={sideBar}
            pagination={true}
            reactiveCustomComponents={true}
            paginationPageSize={20}
            defaultColDef={{ filter: true }}
            loadingOverlayComponent={() => <Loader />}
            rowSelection="single"
          />
        </div>
      </div>
      {isAddModalVisible && (
        <ViewInterview
          selectedInterview={selectedInterview}
          handleCancel={handleCancel}
          handleEditInterview={handleEditInterview}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default InterviewTable;
