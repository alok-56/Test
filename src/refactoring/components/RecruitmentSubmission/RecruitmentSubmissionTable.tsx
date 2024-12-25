import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Row, Spin } from "antd";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import useGet from "../../hooks/useGet";
import AddRecruitmentSubmission from "./AddRecruitmentSubmission";
import ViewRecruitmentSubmissions from "./ViewRecruitmentSubmission";
import RecruitmentSubmissionFilter from "./RecruitmentSubmissionFilters";
import RecruitmentSubmissionService from "../../services/RecruitmentSubmissionService";
import TableHeader from "../shared/TableHeader";
import AppConstants from "../shared/constants";
import UserService from "../../services/UserService";

const recruitmentSubmissionService = new RecruitmentSubmissionService();
const usersService = new UserService();
const pageSize = 20;
const initialFilters = {
  candidateName: undefined,
  employer: undefined,
  visa: undefined,
};

const RecruitmentSubmissionTable = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const { fetchData, loading } = useGet();
  const { fetchData: fetchCandidateNames, data: candidateNames } = useGet();
  const { fetchData: fetchEmployers, data: employers } = useGet();
  const { fetchData: fetchTecnology, data: technology } = useGet();
  const { fetchData: fetchSelectedRecruitment } = useGet();
  const { fetchData: fetchRequisitionIds, data: requisitionId } = useGet();
  const { fetchData: fetchUsersData, data: users } = useGet();

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] = useState<any | null>(
    null
  );
  const [filters, setFilters] = useState<any>(initialFilters);

  const getRequisitionIds = async () => {
    await fetchRequisitionIds(recruitmentSubmissionService.getRequesitionIds());
  };

  const getUsersData = async () => {
    await fetchUsersData(usersService.getAdminsSourcingMangagerOnlyByProject());
  };
  const getCandidateNames = async () => {
    await fetchCandidateNames(
      recruitmentSubmissionService.getCandidatesNames()
    );
  };

  const getTechnology = async () => {
    await fetchTecnology(recruitmentSubmissionService.getTechnology());
  };

  const getEmployers = async () => {
    await fetchEmployers(recruitmentSubmissionService.getEmployees());
  };

  const getRecruitmentSelected = async (id: string) => {
    const res = await fetchSelectedRecruitment(
      recruitmentSubmissionService.getSelectedRecruitment(id)
    );
    setSelectedRecruitment(res.data);
  };

  const handleQuestionsRefresh = async () => {
    const api = gridRef.current?.api;
    if (api) {
      api.refreshServerSide();
    }
    getCandidateNames();
    getEmployers();
    getTechnology();
  };

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    handleQuestionsRefresh();
  }, [filters]);

  useEffect(() => {
    if (isAddModalVisible) {
      getRequisitionIds();
    }
  }, [isAddModalVisible]);

  // const showViewModal = () => {
  //   setIsViewModalVisible(true);
  // };

  const showAddModal = () => {
    setSelectedRecruitment(null);
    setIsAddModalVisible(true);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
  };

  const handleEdit = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(true);
  };
  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  const getRows = async (params: any) => {
    try {
      const {
        request: { startRow },
        context: { filters },
      } = params || {};
      const page = startRow / pageSize + 1;
      const { data } = await fetchData(
        recruitmentSubmissionService.getMainRecruitmentSubmission(
          filters,
          page,
          pageSize
        )
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
  const onRowClicked = useCallback((event: any) => {
    getRecruitmentSelected(event.data._id);
    //showViewModal();
    setIsAddModalVisible(true);
  }, []);
  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Recruitment Submission</title>
      <TableHeader
        title="Recruitment Submissions"
        onAddClick={showAddModal}
        btnText="Add Submission"
        centerComponent={
          <Row
            justify="end"
            align="middle"
            gutter={4}
          >
            <RecruitmentSubmissionFilter
              filters={filters}
              setFilters={setFilters}
              onClearFilter={handleClearFilter}
              visa={AppConstants.visaStatus}
              candidateNames={candidateNames}
              employers={employers}
              technology={technology}
              status={AppConstants.RecruitmentSubmissionStatus}
              userStatus={AppConstants.SourcingType}
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
              rowModelType={"serverSide"}
              pagination={true}
              paginationPageSize={pageSize}
              cacheBlockSize={pageSize}
              reactiveCustomComponents={true}
              //defaultColDef={{ filter: true }}
              loadingOverlayComponent={() => <Loader />}
              onRowClicked={onRowClicked}
              context={{ filters }}
              rowSelection="single"
              getRowId={(params) => params.data._id}
            />
          </div>
        </div>
      </Spin>
      {isViewModalVisible && (
        <ViewRecruitmentSubmissions
          selectedRecruitment={selectedRecruitment}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
        />
      )}

      {isAddModalVisible && (
        <AddRecruitmentSubmission
          handleCancel={handleCancel}
          selected={selectedRecruitment}
          onRecruitmentAdded={handleQuestionsRefresh}
          requisitionIdsData={requisitionId}
          isAddModalVisible={isAddModalVisible}
          usersData={users}
        />
      )}
    </div>
  );
};

export default RecruitmentSubmissionTable;
