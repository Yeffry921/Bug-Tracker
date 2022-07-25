import { Route, Routes } from "react-router-dom"
import Projects from "../pages/Projects"

const NavPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Projects/>} />
    </Routes>
  )
}

export default NavPages