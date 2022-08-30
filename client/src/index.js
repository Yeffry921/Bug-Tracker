import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./context/project-context";
import { BugProvider } from "./context/bug-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <BugProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </BugProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
