import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import useGet from "../../hooks/useGet";
import {  Row,  Spin,  } from "antd";

import InterviewPreparationService from "../../services/InterviewQuestions";

import ViewInterviewPreparation from "./ViewInterviewPreparation";
import AddInterviewPreparation from "./AddInterviewPreparation";
import ClientService from "../../services/ClientService";
import VendorService from "../../services/VendorService";
import InterviewQuestionsFilter from "./interviewQuestionsFilters";
import TableHeader from "../shared/TableHeader";


const pageSize = 20;

const interviewPrepationService = new InterviewPreparationService();

const initialFilters = {
  client: undefined,
  vendor: undefined,
  tags: undefined,
  round: undefined,
  position: undefined,
};

const InterviewPreparationTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const { fetchData, data, loading } = useGet();
  const { fetchData: fetchSelectedData, loading: selectedLoading } = useGet();
  const { fetchData: fetchClientData, data: clients } = useGet();
  const { fetchData: fetchVendorsData, data: vendors } = useGet();
  const { fetchData: fetchTagsData, data: tagsData } = useGet();
  const { fetchData: fetchPositionsData, data: positionsData } = useGet();
  const [filters, setFilters] = useState<any>(initialFilters);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedInterviewPreparation, setSelectedInterviewPreparation] =
    useState<any | null>(null);

  const getSelectedQuestion = async (id: string) => {
    const res = await fetchSelectedData(
      interviewPrepationService.getInterviewPreparationsById(id)
    );
    setSelectedInterviewPreparation(res);
  };

  const getTagsList = async () => {
    await fetchTagsData(interviewPrepationService.getTagsInterviewQuestions());
  };

  const getPosition = async () => {
    await fetchPositionsData(interviewPrepationService.getPositions());
  };

  const getClientsData = async () => {
    await fetchClientData(new ClientService().getSubmissionClients());
  };

  const getVendorsData = async () => {
    await fetchVendorsData(new VendorService().getSubmissionVendors());
  };

  useEffect(() => {
    getClientsData();
    getVendorsData();
    getTagsList();
  }, []);

  const handleQuestionsRefresh = async () => {
    const api = gridRef.current?.api;
    if (api) {
      api.refreshServerSide();
    }
    getPosition();
  };

  const handleEdit = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(true);
  };

  useEffect(() => {
    handleQuestionsRefresh();
  }, [filters]);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const showAddModal = () => {
    setSelectedInterviewPreparation(null);
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
  };

  const getRows = async (params: any) => {
    try {
      const {
        request: { startRow },
        context: { filters },
      } = params || {};
      const page = startRow / pageSize + 1;
      const { data, total } = await fetchData(
        interviewPrepationService.getUserInterviews(filters, page, pageSize)
      );

      params.success({
        rowData: data,
        rowCount: total,
      });
    } catch (error) {
      params.fail();
    }
  };

  const onGridReady = (params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.setGridOption("serverSideDatasource", { getRows });
  };

  const onRowClicked = useCallback((event: any) => {
    getSelectedQuestion(event.data._id);
    showViewModal();
  }, []);

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive -Interviews Preparation</title>

      <TableHeader
        title="Interview Preparation"
        btnText={"Add Questions "}
        onAddClick={showAddModal}
        centerComponent={
          <Row justify="end" align="middle" gutter={4}>
            <InterviewQuestionsFilter
              filters={filters}
              setFilters={setFilters}
              onClearFilter={handleClearFilter}
              tags={tagsData ? tagsData.tags : []}
              clientsData={clients}
              vendorsData={vendors}
              positionsData={positionsData}
            />
          </Row>
        }
      />

      <Spin spinning={loading}>
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 205px)" }}
        >
          <AgGridReact
            ref={gridRef}
            columnDefs={columns}
            onGridReady={onGridReady}
            sideBar={{
              toolPanels: ["columns"],
            }}
            rowModelType={"serverSide"}
            pagination={true}
            paginationPageSize={pageSize}
            cacheBlockSize={pageSize}
            reactiveCustomComponents={true}
            defaultColDef={{ flex: 1 }}
            loadingOverlayComponent={() => <Loader />}
            onRowClicked={onRowClicked}
            context={{ filters }}
            rowSelection="single"
            getRowId={(params) => params.data._id}
          />
        </div>
      </Spin>

      {isAddModalVisible && (
        <AddInterviewPreparation
          handleCancel={handleCancel}
          onInterviewPraparationAdded={handleQuestionsRefresh}
          InterviewPreparationData={data}
          clientsData={clients}
          vendorsData={vendors}
          tagsRefresh={getTagsList}
          selected={selectedInterviewPreparation}
        />
      )}
      {isViewModalVisible && (
        <ViewInterviewPreparation
          selectedInterview={selectedInterviewPreparation}
          onInterviewPraparationAdded={handleQuestionsRefresh}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          loading={selectedLoading}
        />
      )}
    </div>
  );
};

export default InterviewPreparationTable;
