import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/project" element={<Projects />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
