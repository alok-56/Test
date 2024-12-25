import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import useGet from "../../hooks/useGet";
import ViewHiring from "./ViewHiring";
import { Row, Spin } from "antd";
import HiringService from "../../services/HiringService";
import { useNavigate } from "react-router-dom";
import TableHeader from "../shared/TableHeader";
import InviteMail from "../InviteMail/InviteMail";
import HiringsFilter from "./HiringFilters";
import AppConstants from "../shared/constants";

const pageSize = 20;
const hiring = new HiringService();

const initialFilters = {
  fname: undefined,
  lname: undefined,
  visa: undefined,
  dob: null,
};

const HiringTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const navigate = useNavigate();
  const { fetchData, loading } = useGet();

  const { fetchData: fetchSelectedHiring } = useGet();
  const { fetchData: fetchProjectData, data: projectData } = useGet();
  const [isInviteVisible, setIsInviteVisible] = useState<boolean>(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedHiring, setSelectedHiring] = useState<any | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const projectedNames = projectData?.data?.data;
  const getProjectNamesData = async () => {
    await fetchProjectData(hiring.getHotlistByProject());
  };

  const getHiringSelected = async (id: string) => {
    const res = await fetchSelectedHiring(hiring.getSelectedHiring(id));
    setSelectedHiring(res.data);
  };

  const handleQuestionsRefresh = async () => {
    const api = gridRef.current?.api;
    if (api) {
      api.refreshServerSide();
    }
  };

  useEffect(() => {
    if (selectedHiring) {
      handleEdit(); // Call handleEdit only when selectedHiring is updated
    }
  }, [selectedHiring]);

  useEffect(() => {
    getProjectNamesData();
  }, []);

  useEffect(() => {
    handleQuestionsRefresh();
  }, [filters]);

  const handleInvite = () => {
    setIsInviteVisible(true);
  };

  const handleCancel = () => {
    setIsInviteVisible(false);
    setIsViewModalVisible(false);
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  const getRows = async (params: any) => {
    try {
      const {
        request: { startRow },
        context: { filters, projectedNames },
      } = params || {};
      const page = startRow / pageSize + 1;
      const { data } = await fetchData(
        hiring.getMainHiring(page, pageSize, filters, projectedNames)
      );
      params.success({
        rowData: data.data,
        rowCount: data.totalCount,
      });
    } catch (error) {
      params.fail();
    }
  };

  const onGridReady = (params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.setGridOption("serverSideDatasource", { getRows });
    //api.showLoadingOverlay()
  };
  const handleEdit = () => {
    setIsAddModalVisible(true);
    const updatedDisabledPassword = true;
    navigate("/v1/hiring-form", {
      state: { selectedHiring, updatedDisabledPassword, isAddModalVisible },
    });
  };

  const onRowClicked = useCallback((event: any) => {
    getHiringSelected(event.data._id);
    setIsAddModalVisible(true);
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Hiring</title>
      <TableHeader
        title="Hiring"
        onAddClick={handleInvite}
        btnText="Invite"
        centerComponent={
          <Row justify="end" align="middle" gutter={4}>
            <HiringsFilter
              filters={filters}
              setFilters={setFilters}
              visa={AppConstants.visaStatus}
              users={projectedNames}
              onClearFilter={handleClearFilter}
            />
          </Row>
        }
      />

      {isViewModalVisible ? (
        <ViewHiring
          selectedHiring={selectedHiring}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
        />
      ) : (
        <>
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
                  //defaultColDef={{ flex:1 }}
                  loadingOverlayComponent={() => <Loader />}
                  onRowClicked={onRowClicked}
                  context={{ filters, projectedNames }}
                  suppressCellFocus
                  getRowId={(params) => params.data._id}
                />
              </div>
            </div>
          </Spin>
          {isInviteVisible && <InviteMail handleCancel={handleCancel} />}
        </>
      )}
    </div>
  );
};

export default HiringTable;
