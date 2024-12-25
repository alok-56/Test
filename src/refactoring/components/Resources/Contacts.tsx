import React, {useCallback, useRef,  } from "react";
import { AgGridReact } from "ag-grid-react";
import {  GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { sampleData } from "./data";
import { column } from "./column";
import Loader from "../../../components/Loader/Loader";
import { Typography } from "antd";
const {Title}=Typography
const Contacts: React.FC = () => {
const gridRef = useRef<AgGridReact<any>>(null)


const onGridReady = useCallback((_: GridReadyEvent): void => {
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Contacts</title>
      <Title level={3}>Contacts</Title>
      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={sampleData}
              columnDefs={column}
              onGridReady={onGridReady as any}
              sideBar={{
                toolPanels: ["columns"],
              }}
              pagination={true}
              paginationPageSize={20}
              reactiveCustomComponents={true}
              defaultColDef={{ filter: true, flex: 1 }}
              loadingOverlayComponent={() => <Loader />}
            rowSelection="single"
          />
        </div>
      </div>
      </div>
  )
};

  export default Contacts;
    