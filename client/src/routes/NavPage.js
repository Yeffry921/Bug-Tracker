import { Route, Routes } from "react-router-dom";
import { BugProvider } from "../bug-context";
import BugPage from "../pages/BugPage";
import Projects from "../pages/Projects";
import { ProjectProvider } from "../project-context";

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
