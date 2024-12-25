import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loader from "../../../components/Loader/Loader";
import TableHeader from "../shared/TableHeader";
import useGet from "../../hooks/useGet";
import { columns } from "./columns";
import GlossaryService from "../../services/GlossaryService";
import AddKeyword from "./AddGlossary";
import ViewGlossary from "./ViewGlossary";
import { Row } from "antd";
import GlossaryFilter from "./GlossaryFilter";
const limit = 20;
const initialFilters = {
  tags: undefined,
  technology: undefined,
  key: undefined,
};

const glossaryService = new GlossaryService();

const Glossary: React.FC = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const { fetchData, data } = useGet();
  const { fetchData: fetchTags, data: tags } = useGet();
  const { fetchData: fetchTechnologies, data: technologies } = useGet();
  const { fetchData: fetchKeywords, data: keywords } = useGet();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedGlossary, setSelectedGlossary] = useState<any | null>(null);
  const [filters, setFilters] = useState<any>(initialFilters);

  const getTags = async () => {
    await fetchTags(glossaryService.getTagsGlossary());
  };

  const getTechnologies = async () => {
    await fetchTechnologies(glossaryService.getTechnology());
  };

  const getKeywords = async () => {
    await fetchKeywords(glossaryService.getKeywordsGlossary());
  };

  const handleQuestionsRefresh = async () => {
    const api = gridRef.current?.api;
    if (api) {
      api.refreshServerSide();
    }
    getTags();
    getKeywords();
    getTechnologies();
  };

  useEffect(() => {
    handleQuestionsRefresh();
  }, [filters]);

  const showAddModal = () => {
    setSelectedGlossary(null);
    setIsAddModalVisible(true);
  };

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
  };
  const handleEdit = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(true);
  };
  const getRows = async (params: any) => {
    try {
      const {
        request: { startRow },
        context: { filters },
      } = params || {};
      const page = startRow / limit + 1;
      const { data } = await fetchData(
        glossaryService.getMainGlossary(filters, page, limit)
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

  const onRowClicked = useCallback((event: any) => {
    //getGlossarySelected(event.data._id);
    const selectedData = event.data;
    setSelectedGlossary(selectedData);
    showViewModal();
  }, []);

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };
  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - IT Terminology</title>
      <TableHeader
        title="IT Terminology"
        onAddClick={showAddModal}
        btnText="Add Keyword"
        centerComponent={      <Row
          justify="end"
          align="middle"
          gutter={4}
        >
          <GlossaryFilter
            filters={filters}
            setFilters={setFilters}
            onClearFilter={handleClearFilter}
            tags={tags}
            keywords={keywords}
            technologies={technologies}
          />
        </Row>}
      />
      <div className="test-container">
        <div className="ag-theme-quartz" style={{ height: "calc(100vh - 165px)" }}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columns}
            onGridReady={onGridReady}
            sideBar={{
              toolPanels: ["columns"],
            }}
            rowModelType={"serverSide"}
            pagination={true}
            paginationPageSize={limit}
            cacheBlockSize={limit}
            reactiveCustomComponents={true}
            //defaultColDef={{  filter: true }}
            loadingOverlayComponent={() => <Loader />}
            onRowClicked={onRowClicked}
            context={{ filters }}
            rowSelection="single"
            getRowId={(params) => params.data._id} 
          />
        </div>
      </div>
      {isViewModalVisible && (
        <ViewGlossary
          selectedGlossary={selectedGlossary}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
        />
      )}
      {isAddModalVisible && (
        <AddKeyword
          handleCancel={handleCancel}
          selected={selectedGlossary}
          onGlossaryAdded={handleQuestionsRefresh}
          glossaryData={data}
        />
      )}
    </div>
  );
};

export default Glossary;
