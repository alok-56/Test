import { theme } from "antd";
import React, { CSSProperties, ReactElement } from "react";

interface IFormContent {
  content: ReactElement;
  style?: CSSProperties;
}

const FormContent: React.FC<IFormContent> = ({ content, style = {} }) => {
  const { token } = theme.useToken();
  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    margin: "24px 0",
    padding: 48,
    minHeight: 250,
  };

  return (
    <>
      <div style={{ ...contentStyle, ...style }}>{content}</div>
    </>
  );
};

export default FormContent;
