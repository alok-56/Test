import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, SideBarDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { UserData } from "../../utils";

import "../AgGridHeaderStyle/AgGridHeaderStyle.css";
import Loader from "../Loader/Loader";

import {
  CustomCompanyNameComponent,
  CustomWAAuthComponent,
} from "../../refactoring/utils/CustomButton";
import AppUtils from "../../refactoring/utils/AppUtils";

declare global {
  interface Window {
    colState: any[];
  }
}

const { Title } = Typography;

const UserTable: React.FC = () => {
  //const gridRef = useRef<AgGridReact<UserData>>(null);
  const navigate = useNavigate();
  const containerStyle = useMemo(() => ({ width: "100%", minHeight: 500 }), []);

  const [rowData, _] = useState<UserData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData>(rowData[0]);

  const capitalizeFirstLetter = (value: string | undefined): string => {
    if (!value) return "";

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const valueFormatter = (params: { value?: string | null }): string => {
    if (typeof params.value === "string") {
      return capitalizeFirstLetter(params.value) || "-";
    } else {
      return params.value || "-";
    }
  };

  const [colDefs] = useState<ColDef[]>([
    // Profile Information
    {
      field: "profile.firstName",
      headerName: "First Name",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
      width : 145,
    },
    {
      field: "profile.lastName",
      headerName: "Last Name",
      headerClass: "table-header",
      filter: true,
      valueFormatter: valueFormatter,
      width : 145 ,
    },
    {
      field: "profile.email",
      headerName: "Email",
      headerClass: "table-header",
      valueFormatter: valueFormatter,
    },
    {
      field: "profile.mobile",
      headerName: "Mobile",
      headerClass: "table-header",
      valueFormatter: (params: { value?: string | null }): string =>
        AppUtils.formatContactNumber(params),
      width : 165,
    },
    {
      field: "profile.currentLocation",
      headerName: "Current Location",
      headerClass: "table-header",
      valueFormatter: valueFormatter,
      width : 165,
    },
    // {
    //   field: "profile.active",
    //   headerName: "Active",
    //   headerClass: "table-header",
    //   valueFormatter: valueFormatter,
    //   cellRenderer: CustomInviteReceivedComponent,
    //   width: 100,
    // },
    {
      field: "primaryTechnology",
      headerName: "Primary Technology",
      headerClass: "table-header",
      valueFormatter: valueFormatter,
      cellRenderer: CustomCompanyNameComponent,
      width: 120,
    },
    {
      field: "personalInfo.visaStatus",
      headerName: "Visa Status",
      headerClass: "table-header",
      cellRenderer: CustomWAAuthComponent,
      width: 120,
    },
    {
      field: "personalInfo.visaStartDate",
      headerName: "Visa Start Date",
      headerClass: "table-header",
      valueFormatter: (params) => {
        const visaStartDate = new Date(params.value);
        const formattedDate = visaStartDate
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-");
        return formattedDate || "-";
      },
      width: 120,
    },
    {
      field: "personalInfo.referredBy",
      headerName: "Referred By",
      headerClass: "table-header",
      valueFormatter: valueFormatter,
      flex: 1,
      minWidth: 200,
    },
  ]);

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: ["columns"],
    };
  }, []);



useEffect(()=>{
  if(selectedUser){
    userEdit()
  }
},[selectedUser])







  const onGridReady = useCallback((params: any) => {
    const api: GridApi = params.api;
    api.showLoadingOverlay();
    // No need to fetch data here since we already have sample data
    api.addEventListener("rowClicked", onRowClicked);
  }, []);

  const onRowClicked = (event: any) => {
    const selectedUserData = event.data;

    setSelectedUser(selectedUserData);
    setIsModalVisible(true);
  };


  const userEdit = () => {
    const updatedDisabledPassword = true;
    navigate("/update-user-form", {
      state: { selectedUser, updatedDisabledPassword, isModalVisible},
    });
  };

  return (
    <div style={containerStyle}>
      <title>Thinklusive - Users</title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Title level={4} style={{ margin: "10px 0 10px 0" }}>
          Users
        </Title>
        <Link to="/user-form" style={{ margin: "10px 0 15px 0" }}>
          <Button type="primary">Add User</Button>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >

      </div>
      <div className="test-container">
        <div
          className="ag-theme-quartz"
          style={{ height: "calc(100vh - 165px)" }}
        >
          {/* The AG Grid component */}
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs as any}
            onGridReady={onGridReady}
            sideBar={sideBar}
            pagination={true}
            paginationPageSize={20}
            reactiveCustomComponents={true}
            loadingOverlayComponent={() => <Loader />}
            defaultColDef={{
              filter: true,
            }}
            rowSelection="single"
          />
        </div>
      </div>

    </div>
  );
};

export default UserTable;
