const getAllProjectData = async () => {
  const data = await fetch("http://localhost:3001/projects");
  const response = await data.json();
  return response.projects;
};


export default { getAllProjectData };
