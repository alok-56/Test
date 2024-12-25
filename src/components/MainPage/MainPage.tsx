import React, { useEffect, useState } from "react";
import {
  UserSwitchOutlined,
  UserOutlined,
  TeamOutlined,
  VerticalAlignBottomOutlined,
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout,theme, Menu } from "antd";
import SubmissionTable from "../Submission/SubmissionTable";
import UserTable from "../User/UserTable";
import { useUser } from "../../context/UserContext";
import InterviewsTable from "../Interviews/InterviewTable";

const { Sider, Content } = Layout;

const MainPage: React.FC = () => {
  const { isAdmin } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(isAdmin ? "1" : "1");

  useEffect(() => {
    setSelectedMenuItem(isAdmin ? "1" : "1");
  }, [isAdmin]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  const getContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <SubmissionTable />;
      case "2":
        return <UserTable />;
      case "6":
        return <InterviewsTable />;

      default:
        return <div>Content</div>;
    }
  };

  const itemsWithAuthRole = [
    {
      key: "1",
      icon: <VerticalAlignBottomOutlined />,
      label: "Submissions",
      onClick: () => handleMenuClick("1"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => handleMenuClick("2"),
    },
    {
      key: "3",
      icon: <IdcardOutlined />,
      label: "Clients",
      onClick: () => handleMenuClick("3"),
    },
    {
      key: "4",
      icon: <UserSwitchOutlined />,
      label: "Vendors",
      onClick: () => handleMenuClick("4"),
    },
    {
      key: "5",
      icon: <UsergroupAddOutlined />,
      label: "Recruiters",
      onClick: () => handleMenuClick("5"),
    },
    {
      key: "6",
      icon: <TeamOutlined />,
      label: "Interviews",

      onClick: () => handleMenuClick("6"),
    },
  ];

  const items = isAdmin
    ? itemsWithAuthRole
    : itemsWithAuthRole.filter((item) => item.key !== "2");

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Layout style={{ paddingTop: 12 }}>
        <Sider
          style={{ background: "#fff" }}
          collapsedWidth="60px"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            mode="inline"
            items={[
              {
                key: Math.random(),
                icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
                onClick: () => setCollapsed(!collapsed),
              },
            ]}
          />
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            selectedKeys={[selectedMenuItem]}
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              marginLeft: 12,
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {getContent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainPage;
