const url = `http://localhost:3001/`;

// READ ALL DATA SERVICE

const getAllBugData = async (id) => {
  const data = await fetch(`http://localhost:3001/bugs/${id}`);
  const response = await data.json();
  return response
};

// ADD DATA SERVICE

const addBugData = async (newbug) => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newbug),
  };

  const data = await fetch("http://localhost:3001/bugs", options);
  const response = await data.json();
  return response;
};

// CHANGE bug STATUS SERVICE

const changeBugStatus = async (id, changedStatus) => {
  const data = await fetch(`http://localhost:3001/bugs/${id}`, {
    method: "PUT",
    body: JSON.stringify(changedStatus),
    headers: {
      "Content-type": "application/json",
    },
  });

  const response = await data.json();
  return response;
};

const deleteBug = async (id) => {
  const data = await fetch(`http://localhost:3001/bugs/${id}`, {
    method: 'DELETE',
  })
  const response = await data.json()
  return response
};

export default {
  getAllBugData,
  addBugData,
  changeBugStatus,
  deleteBug,
};
