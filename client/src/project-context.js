import { createContext, useContext, useReducer } from "react";

const ProjectContext = createContext();

const initialState = {
  projects: [],
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      const newProject = action.payload.newProject;
      return { projects: [newProject, ...state.projects] };
    }
    case "CHANGE_STATUS": {
      console.log('working')
    }
    case "GET_ALL": {
      const projectData = action.payload.projects;
      return { projects: projectData };
    }
    case "DELETE_PROJECT": {
      const id = action.payload.id
      const newProjects = [...state.projects].filter((project) => project._id !== id)
      return { projects: newProjects }
    }

    default:
      throw new Error();
  }
};

export const ProjectProvider = ({ children }) => {
  const [projectData, dispatch] = useReducer(projectReducer, initialState);
  const value = { projectData, dispatch };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

// const useProjects = () => {
//   const context = useContext(ProjectContext);

//   if (context === undefined) {
//     throw new Error("useCount must be used within a CountProvider");
//   }
//   return context;
// };

export default ProjectContext
