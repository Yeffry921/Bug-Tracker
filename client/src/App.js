import { Route, Routes } from "react-router-dom";
import BugTracker from "./components/BugTracker";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import AuthContext from "./context/AuthProvider";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="home" element={<BugTracker />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
