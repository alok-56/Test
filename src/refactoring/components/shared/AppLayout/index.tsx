import React from "react";
import Headers from "../../../../components/Headers/Headers";
import Sidebar from "../sidebar";
import { useUser } from "../../../../context/UserContext";
import { LOGIN_URL } from "../../../../urlConfig";
import { Row, Spin } from "antd";
import { useLocation } from "react-router-dom";



interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  const { user, loading } = useUser();

  if (!user && pathname !== LOGIN_URL && loading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <Spin spinning={true} size="large" >Loading ...</Spin>
      </Row>
    );
  }
  
  if (!user || pathname==="/register") {
    return children;
  }

  return (
    <div>
      <Headers />
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default AppLayout;
