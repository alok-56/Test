import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import TableHeader from "../shared/TableHeader";

import useGet from "../../hooks/useGet";
import ViewRecruitment from "./ViewRecruitment";
import RecruitmentService from "../../services/RecruitmentService";
import AddRecruitment from "./AddRecruitment";
import UserService from "../../services/UserService";
import { useUser } from "../../../context/UserContext";
import { Row, Spin } from "antd";
import RecruitmentFilter from "./RecruitmentFilters";
import AppConstants from "../shared/constants";
import ClientService from "../../services/ClientService";

const pageSize = 20;
const recruitmentService = new RecruitmentService();
const userService = new UserService();
const clientService = new ClientService();

const initialFilters = {
  status: undefined,
  fromDate: undefined,
  toDate: undefined,
  clientId: undefined,
  profileId: undefined,
};

const RecruitmentTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const { isAdmin } = useUser();
  const { fetchData, data, loading } = useGet();
  const { fetchData: fetchSelectedRecruitment } = useGet();
  const { fetchData: fetchClientData, data: clients } = useGet();
  const { fetchData: fetchUser, data: users } = useGet();

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] = useState<any | null>(
    null
  );
  const [filters, setFilters] = useState<any>(initialFilters);

  const getClientData = async () => {
    await fetchClientData(clientService.getClients());
  };
  const getUserData = async () => {
    await fetchUser(userService.getAdminsSourcingMangagerOnlyByProject());
  };

  const getRecruitmentSelected = async (id: string) => {
    const res = await fetchSelectedRecruitment(
      recruitmentService.getSelectedRecruitment(id)
    );
    setSelectedRecruitment(res.data);
  };

  const handleQuestionsRefresh = async () => {
    const api = gridRef.current?.api;
    if (api) {
      api.refreshServerSide();
    }
  };

  useEffect(() => {
    handleQuestionsRefresh();
  }, [filters]);

  useEffect(() => {
    getClientData();
  }, []);
  useEffect(() => {
    if (isAdmin) {
      getUserData();
    }
  }, []);

  const showAddModal = () => {
    setSelectedRecruitment(null);
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
      const { data } = await fetchData(
        recruitmentService.getMainRecruitment(filters, page, pageSize)
      );
      params.success({
        rowData: data.data,
        rowCount: data.totalCount,
      });
    } catch (error) {
      params.fail();
    }
  };

  const handleEdit = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(true);
  };
  const onGridReady = (params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.setGridOption("serverSideDatasource", { getRows });
    //api.showLoadingOverlay()
  };

  const onRowClicked = useCallback((event: any) => {
    getRecruitmentSelected(event.data._id);
    setIsAddModalVisible(true);
  }, []);

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Recruitment</title>
      <TableHeader
        title="Recruitment"
        onAddClick={showAddModal}
        btnText="Add Job"
        centerComponent={
          <Row justify="end" align="middle" gutter={4} >
            <RecruitmentFilter
              filters={filters}
              setFilters={setFilters}
              onClearFilter={handleClearFilter}
              status={AppConstants.RecruitmentStatus}
              clientsData={clients}
              users={users}
              isAdmin={isAdmin}
            />
          </Row>
        }
      />

      <Spin spinning={loading}>
        <div className="test-container">
          <div
            className="ag-theme-quartz"
            style={{ height: "calc(100vh - 165px)" }}
          >
            <AgGridReact
              ref={gridRef}
              columnDefs={columns}
              onGridReady={onGridReady}
              sideBar={{
                toolPanels: ["columns"],
              }}
              editType="fullRow"
              rowSelection="single"
              rowModelType={"serverSide"}
              suppressClickEdit={true}
              reactiveCustomComponents={true}
              pagination={true}
              paginationPageSize={pageSize}
              cacheBlockSize={pageSize}
              //defaultColDef={{ filter: true }}
              loadingOverlayComponent={() => <Loader />}
              onRowClicked={onRowClicked}
              context={{ filters, users }}
              suppressCellFocus
              getRowId={(params) => params.data._id}
            />
          </div>
        </div>
      </Spin>
      {isViewModalVisible && (
        <ViewRecruitment
          selectedRecruitment={selectedRecruitment}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          isViewModalVisible={isViewModalVisible}
        />
      )}

      {isAddModalVisible && (
        <AddRecruitment
          handleCancel={handleCancel}
          selected={selectedRecruitment}
          onRecruitmentAdded={handleQuestionsRefresh}
          recruitmentData={data}
          usersData={users}
        />
      )}
    </div>
  );
};

export default RecruitmentTable;
