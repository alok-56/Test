import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { HotListData } from "../../../utils";
import Loader from "../../../components/Loader/Loader";
import useGet from "../../hooks/useGet";
import { Button, Col, Row, Select,  } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { columns } from "./columns";
import ViewHotList from "./ViewHotlist";
import AddHotList from "./AddHotlist";
import HotlistFilter from "./HotlistFilters.tsx";
import HotListService from "../../services/hotlistService.ts";
import TableHeader from "../shared/TableHeader.tsx";

const hotListService = new HotListService();

const HotListTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<HotListData>>(null);
  const { fetchData, data, loading } = useGet();
  const {
    fetchData: fetchWeeks,
    data: weeks,
    loading: loadingWeeks,
  } = useGet();
  const { fetchData: fetchFiltersData, data: filtersData } = useGet();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedHotList, setSelectedHotList] = useState<HotListData | null>(
    null
  );
  const [selectedWeek, setSelectedWeek] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["P1"]);

  const getHotListData = async (date: string) => {
    await fetchData(hotListService.getHotLists(date));
  };

  const getWeeks = async () => {
    const resp = await fetchWeeks(hotListService.getWeeks());
    setSelectedWeek(resp?.[0]._id);
  };

  const handleWeekChange = (value: string) => {
    setSelectedWeek(value);
  };

  const handleFilterChange = (filters: any) => {
    setSelectedFilters(filters);
  };

  const getHotListsByFilters = async (filters: any, selectedWeek: any) => {
    await fetchFiltersData(
      hotListService.getHotListsByFilters(filters, selectedWeek)
    );
  };

  useEffect(() => {
    getWeeks();
  }, []);

  useEffect(() => {
    if (selectedWeek) {
      getHotListData(selectedWeek);
      getHotListsByFilters(selectedFilters, selectedWeek);
    }
  }, [selectedWeek]);

  useEffect(() => {
    if (selectedWeek) {
      getHotListsByFilters(selectedFilters, selectedWeek);
    }
  }, [selectedWeek, selectedFilters]);

  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const showEditModal = () => {
    setIsEdit(true);
    setIsAddModalVisible(true);
  };

  const showAddModal = () => {
    setIsEdit(false);
    setIsAddModalVisible(true);
    getHotListData(selectedWeek);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
  };

  const onHotListAdded = () => {
    if (isEdit) {
      getHotListData(selectedWeek);
      getHotListsByFilters(selectedFilters, selectedWeek);
      return;
    }
    getWeeks();
  };

  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
  }, []);

  const onRowClicked = (event: any) => {
    const selectedHotListData = event.data;
    setSelectedHotList(selectedHotListData);
    showViewModal();
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - HotLists</title>
      <TableHeader
        title="HotLists"
        centerComponent={
          <Row justify="end" align="middle">
            <Row justify="space-between" align="middle">
            <HotlistFilter onFiltersChange={handleFilterChange} />
            </Row>

              <Row gutter={[8, 8]} justify="end">
                <Col>
                  <Select
                    value={selectedWeek}
                    loading={loadingWeeks}
                    onChange={handleWeekChange}
                    style={{ width: "130px" }}
                    defaultValue={selectedWeek}
                    options={(weeks || []).map((d: any) => ({
                      value: d._id,
                      label: d._id,
                    }))}
                  ></Select>
                </Col>
                <Col>
                  <Button
                    onClick={showEditModal}
                    icon={<EditOutlined />}
                    loading={loadingWeeks || loading}
                  >
                    Edit
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={showAddModal}
                    icon={<PlusOutlined />}
                    loading={loadingWeeks || loading}
                  >
                    Clone
                  </Button>
                </Col>
              </Row>
            
          </Row>
        }
      />
      {/* <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "10px" }}
      >
        <Col span={12}>
          <Title level={4} style={{ margin: "10px 0" }}>
            Hotlist
          </Title>
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]} justify="end">
            <Col>
              <Select
                value={selectedWeek}
                loading={loadingWeeks}
                onChange={handleWeekChange}
                style={{ width: "130px" }}
                defaultValue={selectedWeek}
                options={(weeks || []).map((d: any) => ({
                  value: d._id,
                  label: d._id,
                }))}
              ></Select>
            </Col>
            <Col>
              <Button
                onClick={showEditModal}
                icon={<EditOutlined />}
                loading={loadingWeeks || loading}
              >
                Edit
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={showAddModal}
                icon={<PlusOutlined />}
                loading={loadingWeeks || loading}
              >
                Clone
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <HotlistFilter onFiltersChange={handleFilterChange} />
      </div> */}
      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={filtersData}
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
          />
        </div>
      </div>

      {isViewModalVisible && (
        <ViewHotList
          selectedHotList={selectedHotList}
          handleCancel={handleCancel}
        />
      )}

      {isAddModalVisible && (
        <AddHotList
          selectedWeek={selectedWeek}
          handleCancel={handleCancel}
          onHotListAdded={onHotListAdded}
          hotListData={data}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default HotListTable;
