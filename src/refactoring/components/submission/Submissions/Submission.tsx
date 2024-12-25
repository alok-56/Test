import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ISubmissionData } from "../../../../utils";
import { columns } from "./columns";
import Loader from "../../../../components/Loader/Loader";
import SubmissionService from "../../../services/SubmissionService";
import AddSubmission from "./AddSubmission";
import ViewSubmissions from "./ViewSubmission";
import useGet from "../../../hooks/useGet";
import { Row, Spin } from "antd";
import SubmissionFilter from "./SubmissionFilter";

import UserService from "../../../services/UserService";
import { useUser } from "../../../../context/UserContext";
import TableHeader from "../../shared/TableHeader";

const submissionService = new SubmissionService();
const userService = new UserService();

const initialFilters = {
  recruiter: undefined,
  name: undefined,
  status: undefined,
  fromDate: undefined,
  toDate: undefined,
};

const SubmissionsTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<ISubmissionData>>(null);
  const { isAdmin, user } = useUser();
  const { fetchData, data, loading } = useGet();
  const { fetchData: fetchUser, data: users } = useGet();

  const [filters, setFilters] = useState<any>(initialFilters);

  const [submissionData, setSubmissionData] = useState<ISubmissionData[]>([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ISubmissionData | null>(null);

  const getUserData = async () => {
    await fetchUser(userService.getUsersOnlyByProject());
  };

  const getSubmissionData = async (filters: any, users: any) => {
    const res = await fetchData(
      submissionService.getSubmissions(filters, users)
    );
    setSubmissionData(res);
  };

  useEffect(() => {
    if (isAdmin) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    getSubmissionData(filters, users);
  }, [filters]);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const showAddModal = () => {
    setSelectedSubmission(null);
    setIsAddModalVisible(true);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
  };

  const handleRefreshSubmission = () => {
    getSubmissionData(filters, users);
  };

  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.addEventListener("rowClicked", onRowClicked);
  }, []);

  const onRowClicked = (event: any) => {
    const selectedSubmissionData = event.data;
    setSelectedSubmission(selectedSubmissionData);
    showViewModal();
  };

  const handleEdit = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(true);
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Submissions</title>
      {/* <Space direction="vertical" style={{ width: "100%" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0, padding: "12px 0" }}>
              Submissions
            </Title>
          </Col>
          <Col>
            <Row justify="space-between" gutter={4}>
              <Col span={4}>
                <Button
                  loading={loading}
                  type="primary"
                  onClick={showAddModal}
                  icon={<PlusOutlined />}
                >
                  Submission
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="end" align="middle" gutter={4}>
          <SubmissionFilter
            filters={filters}
            setFilters={setFilters}
            users={users}
            onClearFilter={handleClearFilter}
            isAdmin={isAdmin}
          />
        </Row>

        <Spin spinning={loading}>
          <div className="test-container">
            <div
              className="ag-theme-quartz"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={data ? [...submissionData].reverse() : []}
                columnDefs={columns}
                onGridReady={onGridReady as any}
                sideBar={{
                  toolPanels: ["columns"],
                }}
                pagination={true}
                paginationPageSize={20}
                reactiveCustomComponents={true}
                defaultColDef={{ filter: true }}
                loadingOverlayComponent={() => <Loader />}
                onRowClicked={onRowClicked}
                rowSelection="single"
              />
            </div>
          </div>
        </Spin>
      </Space> */}
      <TableHeader
        title="Submissions"
        onAddClick={showAddModal}
        btnText="Add Submissions"
        centerComponent={
          <Row justify="end" align="middle" gutter={4}>
            <SubmissionFilter
              filters={filters}
              setFilters={setFilters}
              users={users}
              onClearFilter={handleClearFilter}
              isAdmin={isAdmin}
            />
          </Row>
        }
      />
      <Spin spinning={loading}>
        <div className="test-container">
          <div
            className="ag-theme-quartz"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={data ? [...submissionData].reverse() : []}
              columnDefs={columns}
              onGridReady={onGridReady as any}
              sideBar={{
                toolPanels: ["columns"],
              }}
              pagination={true}
              paginationPageSize={20}
              reactiveCustomComponents={true}
              defaultColDef={{ filter: true }}
              loadingOverlayComponent={() => <Loader />}
              onRowClicked={onRowClicked}
              rowSelection="single"
            />
          </div>
        </div>
      </Spin>
      {isViewModalVisible && (
        <ViewSubmissions
          selectedSubmission={selectedSubmission}
          handleCancel={handleCancel}
          onSubmissionDeleted={handleRefreshSubmission}
          handleEdit={handleEdit}
          isViewModalVisible={isViewModalVisible}
        />
      )}

      {isAddModalVisible && (
        <AddSubmission
          handleCancel={handleCancel}
          onSubmissionAdded={handleRefreshSubmission}
          selected={selectedSubmission}
          showAddModal={showAddModal}
          users={isAdmin ? users : [user]}
        />
      )}
    </div>
  );
};

export default SubmissionsTable;
