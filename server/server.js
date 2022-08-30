const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const url = `mongodb+srv://yeffry921:Rs8XfzjK1exwSul4@bug-cluster.elbafr3.mongodb.net/?retryWrites=true&w=majority`;
const Project = require("./models/project");
const Bug = require("./models/bug");

app.use(cors());
app.use(express.json());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

// READ ALL PROJECTS

app.get("/projects", async (req, res) => {
  const projects = await Project.find({});
  res.json({ projects });
});

// CREATE PROJECT

app.post("/projects", (req, res) => {
  // post project into project DB
  const body = req.body;

  const new_project = new Project({
    title: body.title,
    status: body.status,
    dateCreated: body.dateCreated,
    deadline: body.deadline,
  });

  new_project
    .save()
    .then((savedDoc) => {
      res.json(savedDoc);
    })
    .catch((err) => console.log("err saving doc"));
});

// UPDATE PROJECT STATUS

app.put("/projects/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  Project.findByIdAndUpdate(id, { status: newStatus }, { new: true }).then(
    (data) => res.json(data)
  );
});

app.delete("/projects/:id", async (req, res) => {
  const id = req.params.id;
  Project.findByIdAndDelete(id).then((data) => {
    res.status(200).json({ message: "Project Deleted" });
  });
});

// GET ALL BUGS CORRESPONDING TO PROJECT CLICKED

app.get("/bugs/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Bug.find({ related_project_id: { $in: id } });
  res.json(data);
});

// // CREATE A NEW BUG AND SAVE TO DB

app.post("/bugs", (req, res) => {
  const body = req.body;

  const addBug = new Bug({
    title: body.title,
    severity: body.severity,
    status: body.status,
    dateCreated: body.dateCreated,
    deadline: body.deadline,
    related_project_id: body.related_project_id,
  });

  addBug
    .save()
    .then((savedDoc) => {
      res.json(savedDoc);
    })
    .catch((err) => console.log("err saving doc"));
});

// UPDATE BUG STATUS

app.put("/bugs/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  Bug.findByIdAndUpdate(id, { status: newStatus }, { new: true }).then((data) =>
    res.json(data)
  );
});

// DELETE BUGS

app.delete("/bugs/:id", async (req, res) => {
  const id = req.params.id;

  Bug.findByIdAndDelete(id).then((data) => {
    res.status(200).json({ message: "Bug Deleted" });
  });
});

app.listen(3001, () => {
  console.log("server is running");
});
