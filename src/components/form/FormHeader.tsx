import { Typography } from "antd";
import React from "react";
interface IFormHeader {
  title: string;
}
const { Title } = Typography;

const FormHeader: React.FC<IFormHeader> = ({ title = "Form" }) => {
  return (
    <Title level={4} style={{ paddingBottom: 8 }}>
      {title}
    </Title>
  );
};

export default FormHeader;
