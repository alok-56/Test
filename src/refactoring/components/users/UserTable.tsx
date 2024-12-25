import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loader from "../../../components/Loader/Loader";
import TableHeader from "../shared/TableHeader";
import ViewUser from "./ViewUser";
import { UserData } from "../../../utils";
import UserService from "../../services/UserService";
import { columns } from "./columns.tsx";
import useGet from "../../hooks/useGet";
import { Link, useNavigate } from "react-router-dom";
import UsersFilter from "./UsersFilters";
import { Row } from "antd";

const userService = new UserService();

const initialFilters = {
  firstName: undefined,
  lastName: undefined,
};

const UsersTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<UserData>>(null);
  const navigate = useNavigate();
  const { fetchData: fetchSelectedUserData, data: selectedUserData } = useGet();
  //const { fetchData: fetchFiltersData, data: filtersData } = useGet();
  const { fetchData: fetchUser, data: users } = useGet();
  const { fetchData: fetchUserNames, data: usernames } = useGet();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const selectedUser = selectedUserData && selectedUserData[0];
  const [selectedFilters, setSelectedFilters] = useState(["onlyUsers"]);
  const [filters, setFilters] = useState(initialFilters);

  const showAddModal = () => {
    navigate("/v1/user-form");
  };
  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  const handleFilterChange = (selectFilters: any) => {
    setSelectedFilters(selectFilters);
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  const getUserNameData = async (
    filters: any,
    userNameFilters: any,
    users: any
  ) => {
    await fetchUserNames(
      userService.getUsersByNameFilters(filters, userNameFilters, users)
    );
  };

  const getUserData = async () => {
    await fetchUser(userService.getUsersOnlyByProject());
  };

  const getSelectedUserData = async (id: any) => {
    await fetchSelectedUserData(userService.getUserById(id));
  };

  // const getUsersByFilters = async (selectFilters: any) => {
  //   await fetchFiltersData(userService.getUsersByFilters(selectFilters));
  // };

  const userEdit = () => {
    const updatedDisabledPassword = true;
    navigate("/v1/update-user-form", {
      state: { selectedUser, updatedDisabledPassword, isModalVisible },
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      userEdit();
    }
  }, [selectedUser]);

  // useEffect(() => {
  //   getUsersByFilters(selectedFilters);
  // }, [selectedFilters]);

  useEffect(() => {
    getUserNameData(selectedFilters, filters, users);
  }, [selectedFilters, filters, users]);

  const onGridReady = useCallback((params: GridReadyEvent): void => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
  }, []);

  const onRowClicked = (event: any) => {
    getSelectedUserData(event.data.profile._id);
    setIsModalVisible(true);
  };

  return (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <title>Thinklusive - Users</title>
      <TableHeader
        title="User"
        onAddClick={showAddModal}
        btnText={<Link to="/v2/user-form">Add User</Link>}
        centerComponent={
          <Row justify="end" align="middle">
            <UsersFilter
              onFiltersChange={handleFilterChange}
              filters={filters}
              setFilters={setFilters}
              users={users}
              onClearFilter={handleClearFilter}
            />
          </Row>
        }
      />

      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={usernames}
            columnDefs={columns}
            onGridReady={onGridReady as any}
            sideBar={{
              toolPanels: ["columns"],
            }}
            pagination={true}
            reactiveCustomComponents={true}
            paginationPageSize={20}
            defaultColDef={{ filter: true }}
            loadingOverlayComponent={() => <Loader />}
            onRowClicked={onRowClicked}
            rowSelection="single"
          />
        </div>
      </div>
      {isViewModalVisible && (
        <ViewUser selectedUser={selectedUser} handleCancel={handleCancel} />
      )}
    </div>
  );
};

export default UsersTable;
