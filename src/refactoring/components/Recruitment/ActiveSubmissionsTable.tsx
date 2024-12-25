import { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Spin } from "antd";
import { activeSubmissionColumns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import useGet from "../../hooks/useGet";
import RecruitmentSubmissionService from "../../services/RecruitmentSubmissionService";
import ClonedEditButtonRenderer from "./EditSubmission";

const recruitmentSubmissionService = new RecruitmentSubmissionService();

const pageSize = 20;
interface ActiveSubmissionCountTableProps {
  id: string;
  setIsViewTable: (allowed: any) => void;
  setIsEditData: (allowed: any) => void;
  user: any;
}
const ActiveSubmissionCountTable: React.FC<ActiveSubmissionCountTableProps> = ({
  id,
  setIsViewTable,
  setIsEditData,
  user,
}) => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const { fetchData, loading } = useGet();
  const frameworkComponents = {
    clonedEditButtonRenderer: ClonedEditButtonRenderer,
  };
  const handleQuestionsRefresh = async () => {
    const api = gridRef.current?.api;
    if (api) {
      api.refreshServerSide();
    }
  };

  useEffect(() => {
    handleQuestionsRefresh();
  }, []);

  const getRows = async (params: any) => {
    try {
      const {
        request: { startRow },
      } = params || {};
      const page = startRow / pageSize + 1;
      const { data } = await fetchData(
        recruitmentSubmissionService.getActiveSubmissionCount(
          page,
          pageSize,
          id
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

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <Spin spinning={loading}>
        <div className="test-container">
          <div
            className="ag-theme-quartz"
            style={{ height: "calc(100vh - 165px)" }}
          >
            <AgGridReact
              ref={gridRef}
              columnDefs={activeSubmissionColumns}
              components={frameworkComponents}
              onGridReady={onGridReady}
              sideBar={{
                toolPanels: ["columns"],
              }}
              rowModelType={"serverSide"}
              pagination={true}
              paginationPageSize={pageSize}
              cacheBlockSize={pageSize}
              defaultColDef={{ filter: true }}
              reactiveCustomComponents={true}
              context={{ setIsViewTable, setIsEditData, user }}
              loadingOverlayComponent={() => <Loader />}
              rowSelection="single"
              getRowId={(params) => params.data._id} 
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ActiveSubmissionCountTable;
