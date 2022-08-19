const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: String,
  status: String,
  dateCreated: { type: Date },
  deadline: { type: Date },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
