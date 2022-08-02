import { createContext, useContext, useReducer } from "react";

const BugContext = createContext();

const initialState = {
  bugs: [],
};

const bugReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BUG": {
      const newBug = action.payload.newBug;
      return { bugs: [newBug, ...state.bugs] };
    }
    // case "CHANGE_STATUS": {
    //   const changedBug = action.payload.data;

    //   const newProjects = [...state.projects].map((project) => {
    //     if (project._id !== changedBug._id) {
    //       return project;
    //     }
    //     return changedBug;
    //   });

    //   return { projects: newProjects };
    // }
    // case "GET_ALL": {
    //   const projectData = action.payload.projects;
    //   return { projects: projectData };
    // }
    // case "DELETE_PROJECT": {
    //   const id = action.payload.id;
    //   const newProjects = [...state.projects].filter(
    //     (project) => project._id !== id
    //   );
    //   return { projects: newProjects };
    // }

    default:
      throw new Error();
  }
};

export const BugProvider = ({ children }) => {
  const [bugData, dispatch] = useReducer(bugReducer, initialState);
  const value = { bugData, dispatch };

  return (
    <BugContext.Provider value={value}>{children}</BugContext.Provider>
  );
};

// const useProjects = () => {
//   const context = useContext(ProjectContext);

//   if (context === undefined) {
//     throw new Error("useCount must be used within a CountProvider");
//   }
//   return context;
// };

export default BugContext;
