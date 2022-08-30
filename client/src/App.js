import { Route, Routes } from "react-router-dom";
import BugTracker from "./components/BugTracker";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Projects from "./pages/Projects";
import BugPage from "./pages/BugPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path="home" element={<BugTracker />}>
          <Route path="projects" element={<Projects />} />
          <Route path="bugs/:id" element={<BugPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
