import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DEFAULT_URL } from "../urlConfig";

import { routesConfig } from "./routesConfig";

const RoutingProvider: React.FC = () => {
  return (
    <>
      <Routes>
        {routesConfig.map(({ path, element },index) => (
          <Route key={`${path}-${index}`} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to={DEFAULT_URL} replace />} />
      </Routes>
    </>
  );
};

export default RoutingProvider;
