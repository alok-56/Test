import React from "react";

import "./App.css";
import RoutingProvider from "./routes/RoutingProvider";
import ThemeProvider from "./theme";
import ReduxProvider from "./routes/ReduxProvider";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import "ag-grid-enterprise";
import AppLayout from "./refactoring/components/shared/AppLayout";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <ReduxProvider>
            <UserProvider>
              <>
                <AppLayout>
                <RoutingProvider />
                </AppLayout>
                  

              </>
            </UserProvider>
          </ReduxProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
