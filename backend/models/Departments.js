const mongoose = require("mongoose")
const departmentSchema = new mongoose.Schema({
  departmentName: { type: String },
  programType: { type: String },
  description: { type: String }
})

module.exports = mongoose.model("Department", departmentSchema)