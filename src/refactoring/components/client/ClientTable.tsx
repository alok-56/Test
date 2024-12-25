import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ClientCompanyData } from "../../../utils";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import ClientService from "../../services/ClientService";
import TableHeader from "../shared/TableHeader";
import ViewClient from "./ViewClient";
import AddClient from "./AddClient";
import useGet from "../../hooks/useGet";

const clientService = new ClientService();

const ClientTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<ClientCompanyData>>(null);
  const { fetchData, data } = useGet();

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] =
    useState<ClientCompanyData | null>(null);

  const getClientData = async () => {
    await fetchData(clientService.getSubmissionClients());
  };

  useEffect(() => {
    getClientData();
  }, []);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
  };

  const onClientAdded = () => {
    getClientData();
  };

  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
  }, []);

  const onRowClicked = (event: any) => {
    const selectedVendorData = event.data;
    setSelectedClient(selectedVendorData);
    showViewModal();
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Clients</title>
      <TableHeader
        title="Clients"
        onAddClick={showAddModal}
        btnText="Add Client"
        centerComponent={null}
      />
      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)", }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columns}
            onGridReady={onGridReady as any}
            sideBar={{
              toolPanels: ["columns"],
            }}
            pagination={true}
            paginationPageSize={20}
            reactiveCustomComponents={true}
            defaultColDef={{ flex: 1, filter: true }}
            loadingOverlayComponent={() => <Loader />}
            onRowClicked={onRowClicked}
            rowSelection="single"
          />
        </div>
      </div>
      {isViewModalVisible && (
        <ViewClient
          selectedClient={selectedClient}
          handleCancel={handleCancel}
        />
      )}

      {isAddModalVisible && (
        <AddClient
          handleCancel={handleCancel}
          onClientAdded={onClientAdded}
          clientData={data}
        />
      )}
    </div>
  );
};

export default ClientTable;
