import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import App from "./App";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

      <AppProvider>
        <StrictMode>
         <App />
        </StrictMode>
      </AppProvider>

  </React.StrictMode>
);