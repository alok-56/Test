import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  Image,
  Layout,
  Menu,
  Drawer,
  theme,
  Dropdown,
  Avatar,
  MenuProps,

  //Typography,
} from "antd";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import TLogo from "../../assets/thinklusive.png";
//import ThinklusiveLogo from "../../assets/ThinklusiveName.png";
import SmallTLogo from "../../assets/t1.png";

import "./Headers.css";

import { useUser } from "../../context/UserContext";
import AuthService from "../../refactoring/services/AuthService";
import { LOGIN_URL } from "../../urlConfig";
import ViewUser from "../../refactoring/components/users/ViewUser";
const { Header } = Layout;

const Headers: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, sidebarCollapsed } = useUser();
  const { token } = theme.useToken();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onProfileClick = () => {
    setIsModalVisible(true);
  };
  const handleLogout = () => {
    new AuthService().logout();
    navigate(LOGIN_URL);
  };

  if (pathname == LOGIN_URL) {
    return;
  }

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Account",
      onClick: onProfileClick,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  // const userEdit = () => {
  //   const singleUser = user;
  //   navigate("/update-singleuser-form", { state: { singleUser } });
  //   setIsModalVisible(false);
  // };

  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: token.colorPrimary,
        }}
      >
        <div className="menuIcon" style={{ paddingLeft: 0, paddingTop: 6 }}>
          <MenuOutlined
            style={{ color: "white", fontSize: 30 }}
            onClick={() => setOpenMenu(true)}
          />
        </div>

        <span className="headerMenu">
          <Menu
            mode="horizontal"
            items={[
              {
                key: "main logo",
                label: (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "1px",
                    }}
                  >
                    <Image
                      src={sidebarCollapsed ? SmallTLogo : TLogo}
                      alt="main logo"
                      style={{ width: sidebarCollapsed ? 28 : 167, height: 50 }}
                      preview={false}
                    />
                  </div>
                ),
              },
            ]}
          ></Menu>
        </span>
        <Drawer
          placement="left"
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          closable={false}
          style={{ backgroundColor: "black", height: "100vh" }}
        >
          <Menu
            theme="light"
            mode="vertical"
            items={[
              {
                key: "logo",
                label: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px", // or adjust based on your design
                      backgroundSize: "cover",
                    }}
                  >
                    <Image src={TLogo} alt="main logo" className="logo" />
                  </div>
                ),
              },
            ]}
          />
        </Drawer>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Avatar style={{ cursor: "pointer", marginRight: "10px" }}>
            {user?.profile.firstName.substring(0, 1)?.toUpperCase()}
          </Avatar>
        </Dropdown>

        {isModalVisible && (
          <ViewUser selectedUser={user} handleCancel={handleCancel} />
        )}
      </Header>
    </div>
  );
};

export default Headers;
