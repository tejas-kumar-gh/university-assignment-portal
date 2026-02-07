const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  role: {
    type: String,
    enum: ["HOD"],
    default: "HOD"
  }
});

module.exports = mongoose.model("HOD", hodSchema);
