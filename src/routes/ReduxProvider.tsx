import { Provider } from "react-redux";
import configureStore from "../store";
import React from "react";

interface ReduxProviderProps {
  children: React.ReactElement;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={configureStore()}>{children}</Provider>;
};

export default ReduxProvider;
