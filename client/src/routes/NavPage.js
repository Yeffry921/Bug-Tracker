import { Route, Routes } from "react-router-dom";
import BugPage from "../pages/BugPage";
import Projects from "../pages/Projects";

import { ProjectProvider } from "../context/project-context";
import { BugProvider } from "../context/bug-context";

const NavPages = () => {
  return (
    <ProjectProvider>
      <BugProvider>
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/bugs/:id" element={<BugPage />} />
        </Routes>
      </BugProvider>
    </ProjectProvider>
  );
};

export default NavPages;
