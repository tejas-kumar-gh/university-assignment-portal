const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  role: {
    type: String,
    enum: ["Student"],
    default: "Student"
  }
});

module.exports = mongoose.model("Student", studentSchema);
