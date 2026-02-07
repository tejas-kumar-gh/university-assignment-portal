const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  role: {
    type: String,
    enum: ["Professor"],
    default: "Professor"
  }
});

module.exports = mongoose.model("Professor", professorSchema);
