import React, { useState } from "react";
import { Breadcrumb, Typography, Spin } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface BreadcrumbComponentProps {
  title: string;
  children?: React.ReactNode;
}
const { Title } = Typography;

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ title, children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleHomeClick = async () => {
    setLoading(true);
   
    setTimeout(() => {
      navigate("/v1/users"); 
      setLoading(false); 
    }, 1000); 
  };

  return (
    <Spin spinning={loading}>
      <div style={{ background: "#eef3f4", padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Breadcrumb
        items={[
          {
            
            title: (
              <div style={{cursor:"pointer"}} onClick={handleHomeClick}>
                <HomeOutlined />
                <span>Home</span>
              </div>
            ),
          },
          {
            title: (
              <Title level={5} style={{ display: "contents", margin: 0 }}>
                {title}
              </Title>
            ),
          },
        ]}
      />
      {children}
    </div>
    </Spin>
  )}


export default BreadcrumbComponent;
