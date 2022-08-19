const mongoose = require("mongoose");

const { Schema } = mongoose;

const bugSchema = new Schema({
  title: String,
  severity: String,
  status: String,
  dateCreated: { type: Date },
  deadline: { type: Date },
  related_project_id: String,
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
