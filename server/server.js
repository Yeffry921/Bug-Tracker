const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const url = `mongodb+srv://yeffry921:Rs8XfzjK1exwSul4@bug-cluster.elbafr3.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const projectSchema = new Schema({
  title: String,
  status: String,
  dateCreated: { type: Date },
  deadline: { type: Date },
});

const Projects = mongoose.model("Projects", projectSchema);

mongoose
  .connect(url, connectionParams)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

// READ ALL PROJECTS

app.get("/projects", async (req, res) => {
  const projects = await Projects.find({});
  res.json({ projects });
});

// // CREATE PROJECT

app.post("/projects", (req, res) => {
  // post project into project DB
  const body = req.body;

  const new_project = new Projects({
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

  Projects.findByIdAndUpdate(id, { status: newStatus }, { new: true }).then(
    (data) => res.json(data)
  );
});

app.delete("/projects/:id", async (req, res) => {
  const id = req.params.id;
  Projects.findByIdAndDelete(id).then((data) => {
    res.status(200).json({ message: "Project Deleted" });
  })  
});

// // READ ALL BUGS THAT MATCH PROJECT ID CLICKED

// app.get('/bugs:id', (req, res) => {
//   const projectId = req.params.id

//   // Search the entire database and return me all bugs that contain this ID

// })

// // CREATE A NEW BUG AND SAVE TO DB

// app.post('/bugs', (req, res) => {

// })

app.listen(3001, () => {
  console.log("server is running");
});
