import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>Hello User log in!</div>

      <Link to="/login">Log In</Link>
    </>
  );
};

export default Dashboard;
