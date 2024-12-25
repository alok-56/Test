import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

//To remove enterprise water mark
const originalConsoleError = console.error;

console.error = function () {
  const args = Array.from(arguments);
  const containsString = args.some(
    (arg) =>
      typeof arg === "string" &&
      (arg.includes("**********") ||
        arg.includes("info@ag-grid.com") ||
        arg.includes("AG Grid Enterprise features"))
  );
  if (!containsString) {
    originalConsoleError.apply(console, args);
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
