import React, { useEffect } from "react";
import { Layout, Menu,} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import { useLocation, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getSidebarItems } from "./items";
import { useUser } from "../../../../context/UserContext";
import { LOGIN_URL } from "../../../../urlConfig";
import AppUtils from "../../../utils/AppUtils";

const { Item, SubMenu } = Menu;

interface SidebarProps {
  children: any;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const {   sidebarCollapsed, setSidebarCollapsed } = useUser();

  const navigate = useNavigate();

  const handleMenuItemClick = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    AppUtils.localStorageSetItem("sidebarCollapsed", sidebarCollapsed);
  }, [sidebarCollapsed]);

  const renderMenuItems = (items: any[]) => {
    return items.map((item) =>
      item.children ? (
        <SubMenu
          key={item.key}
          title={
            <span >
              {item.icon}
              <span>{item.label}</span>
            </span>
          }
        >
          {renderMenuItems(item.children)}
        </SubMenu>
      ) : (
        <Item
          key={item.key}
          icon={item.icon}
          onClick={() => handleMenuItemClick(item.key)}
        >
          {item.label}
        </Item>
      )
    );
  };



  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Layout>
        {pathname !== LOGIN_URL && (
          <Sider
            style={{ background: "#131720" }}
            collapsedWidth="60px"
            trigger={null}
            collapsible
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
          >
            <Menu
              theme="dark"
              mode="inline"
              items={[
                {
                  key: Math.random().toString(),
                  icon: sidebarCollapsed ? (
                    <MenuUnfoldOutlined style={{ color: "#fff" }} />
                  ) : (
                    <MenuFoldOutlined style={{ color: "#fff" }} />
                  ),
                  onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                },
              ]}
            />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[pathname]}
              style={{ height: "calc(100vh - 124px)", overflowY: "auto",fontWeight: "bold"  }}
            >
              {renderMenuItems(getSidebarItems())}
            </Menu>
          </Sider>
        )}

        <Content style={{ padding: 8, minHeight: 280 }}>{children}</Content>
      </Layout>
    </div>
  );
};

export default Sidebar;
