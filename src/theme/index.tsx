import { ConfigProvider } from "antd";
import React from "react";

interface ThemeProviderProps {
  children: React.ReactElement;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#15b5d4",
        borderRadius: 4,
        //colorBgContainer: "#f6ffed",
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default ThemeProvider;
