import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Spin,
  Modal,
  message,
  Button,
  Row,
  Col,
  Space,
  Typography,
  DatePicker,
  Tooltip,
} from "antd";
import { HotListData } from "../../../utils";

import usePost from "../../hooks/usePost";
import HotListService from "../../services/hotlistService";
import { AgGridReact } from "ag-grid-react";
import CloneButtonRenderer from "../../utils/CustomButton";
import { ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { cloneColumns } from "./columns";
import { formatCreateHotlist } from "./helper";
import dayjs from "dayjs";
import Loader from "../../../components/Loader/Loader";
import useGet from "../../hooks/useGet";
import UserService from "../../services/UserService";
import AppConstants from "../shared/constants";
import usePut from "../../hooks/usePut";

const { Title } = Typography;

const hotListService = new HotListService();
const userService = new UserService();

interface HotListFormProps {
  handleCancel: () => void;
  hotListData: HotListData[];
  onHotListAdded: () => void;
  selectedWeek: string | null;
  isEdit: boolean;
}

const AddHotList: React.FC<HotListFormProps> = ({
  selectedWeek,
  handleCancel,
  hotListData,
  onHotListAdded,
  isEdit = false,
}) => {
  const { fetchData, data: users } = useGet();
  const { putData, loading: updating } = usePut();

  const recruiters = AppConstants.salesRecruiterList;

  const { postData, loading } = usePost();
  const gridRef = useRef<AgGridReact<HotListData>>(null);
  const [date, setDate] = useState<any>(
    isEdit ? [dayjs(selectedWeek), selectedWeek] : []
  );

  const isEditingCells = () => {
    const editingCells = gridRef.current?.api.getEditingCells();
    return editingCells && editingCells.length > 0;
  };

  useEffect(() => {
    fetchData(userService.getUsersOnlyByProject());
  }, []);

  const getAllRows = async () => {
    let allRows: any = [];
    gridRef?.current?.api.forEachNode((rowNode: any) =>
      allRows.push(rowNode.data)
    );
    return allRows;
  };

  const onGridReady = useCallback(() => {}, []);

  const frameworkComponents = {
    cloneButtonRenderer: CloneButtonRenderer,
  };

  const isValidationError = (rows: any[]) => {
    const index = rows.findIndex(
      ({ firstName, priority, salesPerson,rate }: any) =>
        !firstName || !priority || !salesPerson||!rate
    );
    if (index >= 0) {
      gridRef?.current?.api.startEditingCell({
        rowIndex: index,
        colKey: "firstName",
      });
    }
    return index != -1;
  };

  const handleCreateHotList = async () => {
    if (isEditingCells()) {
      showWarningMessage();
      return;
    }

    if (date.length === 0 || date[0] === null) {
      message.error("Please select a Target Date.");
      return;
    }

    const rows = await getAllRows();

    if (isValidationError(rows)) {
      Modal.confirm({
        title: "Validation Error",
        content:
          "All required fields must be filled. The Name, Priority,Sales Person and Rate fields are mandatory.",
        icon: <ExclamationCircleOutlined />,
        okText: "Ok",
        cancelButtonProps: { style: { display: "none" } },
      });
      return;
    }

    const payload = await formatCreateHotlist(date[1], rows, users);
    if (isEdit) {
      await putData(hotListService.updateHotList(date[1]), payload);
    } else {
      await postData(hotListService.createHotList(), payload);
    }
    onHotListAdded();
    handleCancel();
    message.success(
      isEdit ? "HotList updated successfully" : "HotList created successfully"
    );
  };
  const addNewRow = () => {
    if (isEditingCells()) {
      showEditingAddNewRowWarningMessage();
      return;
    }
    const gridApi = gridRef.current?.api;
    const newRow = {
      firstName: undefined,
      priority: undefined,
      salesPerson: undefined,
      comments: undefined,
      rate: undefined,
    };

    gridApi?.applyTransaction({
      add: [newRow] as any,
      addIndex: 0,
    });
    setTimeout(
      () =>
        gridApi?.startEditingCell({
          rowIndex: 0,
          colKey: "firstName",
        }),
      100
    );
  };

  const onRowEditingStarted = (params: any) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
  };
  const onRowEditingStopped = (params: any) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
  };

  const handleDateChange = (...date: []) => {
    setDate(date);
  };

  const showEditingAddNewRowWarningMessage = () => {
    message.warning(
      "Editing is in progress, Please complete before adding a new one to the hotlist."
    );
  };

  const showWarningMessage = () => {
    message.warning(
      "Editing is in progress, please complete before saving hotlist changes."
    );
  };

  const showWarningMessageForCancel = () => {
    Modal.confirm({
      title: "Confirmation",
      content: "Editing is in progress. Do you want to continue editing?",
      icon: <ExclamationCircleOutlined />,
      okText: "Exit",
      cancelText: "Continue",
      okType: "danger",
      onCancel: () => {
        if (isEditingCells()) {
          return;
        }
      },
      onOk: () => handleCancel(),
    });
  };

  const handleCancelAdd = () => {
    if (isEditingCells()) {
      showWarningMessageForCancel();
    } else {
      handleCancel();
    }
  };

  return (
    <>
      <Modal
        open
        onCancel={handleCancelAdd}
        onOk={handleCreateHotList}
        okText={isEdit ? "Update Hotlist" : "Create hotlist"}
        width={"90vw"}
        confirmLoading={loading}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
        centered
        closable={false}
        maskClosable={false}
      >
        <Spin spinning={loading || updating}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row justify="space-between">
              <Col>
                <Title level={4} style={{ margin: "4px 0" }}>
                  {isEdit ? "Edit hotlist" : "New hotlist"}
                </Title>
              </Col>
              <Col>
                <Space direction="horizontal">
                  <Tooltip title="Cloning Date">
                    <DatePicker
                      disabled
                      format="MM-DD-YYYY"
                      defaultValue={dayjs(selectedWeek)}
                    />
                  </Tooltip>
                  <Tooltip title="Target Date">
                    <DatePicker
                      value={date?.[0]}
                      disabled={isEdit}
                      format="MM-DD-YYYY"
                      onChange={handleDateChange}
                    />
                  </Tooltip>
                  <Button onClick={addNewRow} icon={<UserAddOutlined />}>
                    Add new row
                  </Button>
                </Space>
              </Col>
            </Row>

            <div className="test-container">
              <div className="ag-theme-quartz" style={{ height: "60vh" }}>
                <AgGridReact
                  ref={gridRef}
                  rowData={hotListData}
                  components={frameworkComponents}
                  columnDefs={cloneColumns}
                  onGridReady={onGridReady as any}
                  sideBar={{
                    toolPanels: ["columns"],
                  }}
                  editType="fullRow"
                  rowSelection="single"
                  onRowEditingStopped={onRowEditingStopped}
                  onRowEditingStarted={onRowEditingStarted}
                  suppressClickEdit={true}
                  reactiveCustomComponents={true}
                  defaultColDef={{ flex: 1, filter: true, editable: true }}
                  loadingOverlayComponent={() => <Loader />}
                  context={{
                    users: users,
                    recruiters: recruiters,
                  }}
                  suppressCellFocus
                />
              </div>
            </div>
          </Space>
        </Spin>
      </Modal>
    </>
  );
};

export default AddHotList;
