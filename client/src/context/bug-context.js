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

    case "CHANGE_STATUS": {
      const changedBug = action.payload.data;

      const newBugs = [...state.bugs].map((bugItem) => {
        if (bugItem._id !== changedBug._id) {
          return bugItem;
        }
        return changedBug;
      });

      return { bugs: newBugs };
    }

    case "GET_ALL": {
      const bugData = action.payload.bugs;
      return { bugs: bugData };
    }
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

  return <BugContext.Provider value={value}>{children}</BugContext.Provider>;
};

// const useProjects = () => {
//   const context = useContext(ProjectContext);

//   if (context === undefined) {
//     throw new Error("useCount must be used within a CountProvider");
//   }
//   return context;
// };

export default BugContext;
