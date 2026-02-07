const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
 role: {
  type: String,
  enum: ["student", "professor", "hod"],
  default: "student"
},
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
});

module.exports = mongoose.model("User", userSchema);
