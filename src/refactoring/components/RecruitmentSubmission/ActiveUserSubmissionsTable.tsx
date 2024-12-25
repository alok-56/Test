import { GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button, Drawer, Spin, Typography } from "antd";
import React, { useCallback, useRef, useState } from "react";
import useGet from "../../hooks/useGet";
import Loader from "../../../components/Loader/Loader";

import { EyeOutlined } from "@ant-design/icons";
import RecruitmentSubmissionService from "../../services/RecruitmentSubmissionService";
import { activeUserSubmission, ResumeRenderer } from "./columns";
const { Text } = Typography;
interface ActiveUserSubmissionsTableProps {
  props: any;
  data: any;
}
const pageSize = 20;
const recruitmentSubmission = new RecruitmentSubmissionService();
const ActiveUserSubmissionssTable: React.FC<ActiveUserSubmissionsTableProps> = (
  props
) => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const { fetchData, loading } = useGet();
  const [isActiveUserSubmissionsVisible, setIsActiveUserSubmissionsVisible] =
    useState<boolean>(false);

  const getRows = async (params: any) => {
    try {
      const {
        request: { startRow },
      } = params || {};
      const page = startRow / pageSize + 1;
      const { data } = await fetchData(
        recruitmentSubmission.getActiveUserSubmission(
          page,
          pageSize,
          props.data.email
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

    //api.showLoadingOverlay();
  };

  const handleModal = async (e: any) => {
    e.stopPropagation();
    setIsActiveUserSubmissionsVisible(true);
  };

  const handleCancel = () => {
    setIsActiveUserSubmissionsVisible(false);
  };

  const onRowClicked = useCallback((_: any) => {}, []);
  // Flatten function to prepare data for Ag-Grid

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button        
          style={{ color: "#15B5D4" }}
          icon={<EyeOutlined />}
          ghost
          ref={(ref) => {
            if (!ref) return;

            ref.onclick = (e) => {
              handleModal(e);
            };
          }}
        />
        <Text>{ResumeRenderer(props)}</Text>
      </div>
      <Drawer
        title="Submission Table"
        onClose={handleCancel}
        open={isActiveUserSubmissionsVisible}
        width="60%"
        footer={null}
      >
        <div style={{ width: "100%", minHeight: "500px" }}>
          <Spin spinning={loading}>
            <div className="test-container">
              <div
                className="ag-theme-quartz"
                style={{ height: "calc(100vh - 165px)" }}
              >
                <AgGridReact
                  ref={gridRef}
                  columnDefs={activeUserSubmission}
                  onGridReady={onGridReady}
                  sideBar={{
                    toolPanels: ["columns"],
                  }}
                  rowModelType={"serverSide"}
                  pagination={true}
                  paginationPageSize={pageSize}
                  defaultColDef={{ filter: true }}
                  onRowClicked={onRowClicked}
                  reactiveCustomComponents={true}
                  loadingOverlayComponent={() => <Loader />}
                  rowSelection="single"
                  getRowId={(params) => params.data._id} 
                />
              </div>
            </div>
          </Spin>
        </div>
      </Drawer>
    </div>
  );
};

export default ActiveUserSubmissionssTable;
