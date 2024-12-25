import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {VendorCompanyData } from "../../../utils";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import TableHeader from "../shared/TableHeader";
import VendorService from "../../services/VendorService";
import useGet from "../../hooks/useGet";
import ViewVendor from "./ViewVendor";
import AddVendor from "./AddVendor";

const vendorService = new VendorService();

const VendorTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<VendorCompanyData>>(null);
  const { fetchData, data } = useGet();

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] =
    useState<VendorCompanyData | null>(null);

  const getVendorData = async () => {
    await fetchData(vendorService.getSubmissionVendors());
  };

  useEffect(() => {
    getVendorData();
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

  const onVendorAdded = () => {
    getVendorData();
  };
  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
  }, []);

  const onRowClicked = (event: any) => {
    const selectedVendorData = event.data;
    setSelectedVendor(selectedVendorData);
    showViewModal();
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Vendors</title>
      <TableHeader
        title="Vendors"
        onAddClick={showAddModal}
        btnText="Add Vendor"
        centerComponent={null}
      />
      <div className="test-container">
        <div className="ag-theme-quartz" style={{ height: "calc(100vh - 165px)", }}>
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
        <ViewVendor
          selectedVendor={selectedVendor}
          handleCancel={handleCancel}
        />
      )}

      {isAddModalVisible && (
        <AddVendor
          handleCancel={handleCancel}
          onVendorAdded={onVendorAdded}
          vendorData={data}
        />
      )}
    </div>
  );
};

export default VendorTable;
