import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { RecruiterData } from "../../../utils";
import { columns } from "./columns";
import Loader from "../../../components/Loader/Loader";
import TableHeader from "../shared/TableHeader";
import RecruiterService from "../../services/RecruiterService";
import RecruiterFilter from "./RecruiterFilter";
import AddRecruiter from "./AddRecruiter";
import ViewRecruiter from "./ViewRecruiter";
import useGet from "../../hooks/useGet";


const recruiterService = new RecruiterService();

const initialFilters = {
  company_name: undefined,
  technology: undefined,
};

const RecruiterTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<RecruiterData>>(null);
   const { fetchData,  } = useGet();
   const { fetchData: fetchCompanies, data: company_name } = useGet();
  const { fetchData: fetchTechnologies, data: technology } = useGet();
  const { fetchData: fetchFilters,  } = useGet();


  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] =
    useState<RecruiterData | null>(null);
const [recruitersData, setRecruitersData] =useState<any[]>([])
  const [filters, setFilters] = useState<any>(initialFilters);


  const getCompaniesData = async () => {
    await fetchCompanies(recruiterService.getCompanies());
   };

   const getTechnologiesData = async () => {
    await fetchTechnologies(recruiterService.getTechnologies());
  };

  const getFetchFilters = async () => {
    const res=await fetchFilters(recruiterService.getfiltersRecruiters(filters));
    setRecruitersData(res)
  }
   


  const getRecruiterData = async () => {
    const res=await fetchData(recruiterService.getRecruiters());
    setRecruitersData(res)
  };

  useEffect(() => {
    getRecruiterData();
    getCompaniesData();
    getTechnologiesData();
  }, []);

  useEffect(() => {
    getFetchFilters();
  }, [filters]);

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

  const onRecruiterAdded = () => {
    getRecruiterData();
  };

  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
  }, []);

  const onRowClicked = (event: any) => {
    const selectedVendorData = event.data;
    setSelectedRecruiter(selectedVendorData);
    showViewModal();
  };
  
  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Recruiter</title>
      <TableHeader
        title="Recruiter"
        onAddClick={showAddModal}
        btnText="Add recruiter"
        centerComponent={      <RecruiterFilter
          companies={company_name} 
          technologies={technology} 
          filters={filters}
          setFilters={setFilters}
          onClearFilter={handleClearFilter}
        />}
      />

      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={recruitersData}
            columnDefs={columns}
            onGridReady={onGridReady as any}
            sideBar={{
              toolPanels: ["columns"],
            }}
            pagination={true}
            paginationPageSize={20}
            reactiveCustomComponents={true}
            defaultColDef={{ filter: true, flex: 1 }}
            loadingOverlayComponent={() => <Loader />}
            onRowClicked={onRowClicked}
            rowSelection="single"
          />
        </div>
      </div>
      {isViewModalVisible && (
        <ViewRecruiter
          selectedRecruiter={selectedRecruiter}
          handleCancel={handleCancel}
        />
      )}
      {isAddModalVisible && (
        <AddRecruiter
          handleCancel={handleCancel}
          onRecruiterAdded={onRecruiterAdded}

        />
      )}
    </div>
  );
};

export default RecruiterTable;
