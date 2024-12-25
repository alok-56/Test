import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginForm.css";

import CompanyLogo from "../../../assets/t1.png";
import AuthService from "../../services/AuthService";
import { useUser } from "../../../context/UserContext";
import { DEFAULT_URL,  LOGIN_URL } from "../../../urlConfig";
import { moduleAccess } from "../shared/RoleAccessModules";

const { Title, Paragraph, Text } = Typography;

const layout = {
  labelCol: { span: 20 },
  wrapperCol: { span: 40 },
};

const authService = new AuthService();
const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkTokenAndGetUser, authRole } = useUser();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const roleAccess = moduleAccess.find(
        (access) => access.role === authRole
      );
      if (roleAccess && roleAccess.allowedModules.length > 0) {
        navigate(`/v1/${roleAccess.allowedModules[0]}`);
      } else {
        navigate(DEFAULT_URL);
      }
    }
  }, [authRole]);

  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const { email, password } = values;
      await authService.login(email, password);
      const user: any = await checkTokenAndGetUser();
      const authRole = user?.profile?.authRole|| user?.[0]?.profile?.authRole || null;
      const roleAccess = moduleAccess.find(
        (access) => access.role === user?.profile?.authRole
      );
      const roleAccess1 = moduleAccess.find(
        (access) => access.role === authRole
      );

      if (roleAccess && roleAccess.allowedModules.length > 0) {
        navigate(`/v1/${roleAccess.allowedModules[0]}`);
      } else if (roleAccess1 && roleAccess1.allowedModules.length > 0) {
        navigate(`/v1/${roleAccess1?.allowedModules[0]}`);
      } else {
        setErrorMessage("User ID Not Exists")
        navigate(LOGIN_URL);
      }
    } catch (error: any) {
      setErrorMessage("Please Enter a Valid Email and Password");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-main-container">
      <div className="login-container">
        <Image
          src={CompanyLogo}
          alt="Main Logo"
          style={{ width: 80 }}
          preview={false}
        />
        <Title level={3}>Welcome To Business360</Title>
        <Paragraph>Empowering Your IT Career One Step At A Time.</Paragraph>

        <Form
          {...layout}
          name="LoginForm"
          layout="vertical"
          onFinish={handleLogin}
          className="loginForm"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>
          {errorMessage && (
            <div style={{ marginBottom: 16, textAlign: "center" }}>
              <Text type="danger">{errorMessage}</Text>
            </div>
          )}
          <Button
            style={{ textAlign: "center" }}
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
            loading={loading}
          >
            Login
          </Button>
          <div style={{marginTop:"10px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",fontSize:"15px"}}>
               <Link to="/register" > New User Registration</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
