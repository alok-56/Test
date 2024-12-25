import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loader from "../../../components/Loader/Loader";
import TableHeader from "../shared/TableHeader";
import AddInterview from "./AddInterview";
//import ViewInterview from "./ViewInterview";
import { InterviewData } from "../../../utils";
import InterviewService from "../../services/InterviewService";
import { columns } from "./columns";
import useGet from "../../hooks/useGet";

const interviewService = new InterviewService();

const InterviewTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<InterviewData>>(null);

  const { fetchData, data } = useGet();
  // const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // const [selectedInterview, setSelectedInterview] =
  //   useState<InterviewData | null>(null);

  const getInterviewData = async () => {
    await fetchData(interviewService.getInterviews());
  };

  useEffect(() => {
    getInterviewData();
  }, []);

  // const showViewModal = () => {
  //   setIsViewModalVisible(true);
  // };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
    // setIsViewModalVisible(false);
  };

  const onInterviewAdded = () => {
    getInterviewData();
  };

  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
  }, []);

  const onRowClicked = (_: any) => {
    // const selectedInterviewData = event.data;
    // setSelectedInterview(selectedInterviewData);
    //showViewModal();
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Interview</title>
      <TableHeader
        title="Interview"
        onAddClick={showAddModal}
        btnText="Add interview"
        centerComponent={null}

      />
      <div className="test-container">
        <div className="ag-theme-quartz" style={{ height: "calc(100vh - 165px)" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columns}
            onGridReady={onGridReady as any}
            sideBar={{
              toolPanels: ["columns"],
            }}
            pagination={true}
            paginationPageSize={10}
            reactiveCustomComponents={true}
            defaultColDef={{ flex: 1, filter: true }}
            loadingOverlayComponent={() => <Loader />}
            onRowClicked={onRowClicked}
            rowSelection="single"
          />
        </div>
      </div>
      {/* {isViewModalVisible && (
        <ViewInterview
          selectedInterview={selectedInterview}
          handleCancel={handleCancel}
          //onInterviewAdded={onInterviewAdded}
        />
      )} */}
      {isAddModalVisible && (
        <AddInterview
          handleCancel={handleCancel}
          onInterviewAdded={onInterviewAdded}
        />
      )}
    </div>
  );
};

export default InterviewTable;
