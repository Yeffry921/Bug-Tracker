const url = `http://localhost:3001/`;

// READ ALL DATA SERVICE

const getAllProjectData = async () => {
  const data = await fetch("http://localhost:3001/projects");
  const response = await data.json();
  return response.projects;
};

// ADD DATA SERVICE

const addProjectData = async (newProject) => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newProject),
  };

  const data = await fetch("http://localhost:3001/projects", options);
  const response = await data.json();
  return response;
};

// CHANGE PROJECT STATUS SERVICE

const changeProjectStatus = async (id, changedStatus) => {
  const data = await fetch(`http://localhost:3001/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(changedStatus),
    headers: {
      "Content-type": "application/json",
    },
  });

  const response = await data.json()
  return response
};

export default { getAllProjectData, addProjectData, changeProjectStatus };
