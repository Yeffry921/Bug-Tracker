import React from "react";
import { BrowserRouter } from "react-router-dom";
import BugTracker from "./components/BugTracker";

const App = () => {
  return (
    <BrowserRouter>
      <BugTracker />
    </BrowserRouter>
  );
};

export default App;
