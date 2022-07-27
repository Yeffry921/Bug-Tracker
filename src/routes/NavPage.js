import { Route, Routes } from "react-router-dom"
import BugPage from "../pages/BugPage"
import Projects from "../pages/Projects"

const NavPages = () => {
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      <Route path="/bugs/:id" element={<BugPage />} />
    </Routes>
  )
}

export default NavPages