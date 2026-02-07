const studentSchema = require("../models/student");
const professorSchema = require("../models/professor");
const hodSchema = require("../models/hod");
const bcrypt = require("bcryptjs");
const userSchema = require("../models/User");


async function showUsers(req,res){
  try {
const users = await userSchema
      .find()
      .populate("department", "departmentName"); 
      //     ^ field     ^ select only name

    return res.status(200).json(users);
  } 

  catch(err){
    console.log("error in controllers/users.js showUsers");
  }
}


// Save common info into User collection
async function addUserinUserSchema(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = new userSchema({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    phone: userData.phone,
    department: userData.department,
    role: userData.role,
  });

  await user.save();

  return user;
}


// Add Student
async function addStudent(req, res) {
  const { name, email, password, phone, department } = req.body;

  await addUserinUserSchema({ name, email, password, phone, department, role: "student" });

  const student = new studentSchema({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    phone,
    department,
  });

  await student.save();

  return res.status(201).json({ message: "Student added successfully" });
}


// Add Professor
async function addProfessor(req, res) {
  const { name, email, password, phone, department } = req.body;

  await addUserinUserSchema({ name, email, password, phone, department, role: "professor" });

  const professor = new professorSchema({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    phone,
    department,
  });

  await professor.save();

  return res.status(201).json({ message: "Professor added successfully" });
}


// Add HOD
async function addHod(req, res) {
  const { name, email, password, phone, department } = req.body;

  await addUserinUserSchema({ name, email, password, phone, department, role: "hod" });

  const hod = new hodSchema({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    phone,
    department,
  });

  await hod.save();

  return res.status(201).json({ message: "HOD added successfully" });
}


// Main switch controller
async function addUser(req, res) {
  try {
    const { role } = req.body;

    switch (role) {
      case "Student":
        return await addStudent(req, res);

      case "Professor":
        return await addProfessor(req, res);

      case "HOD":
        return await addHod(req, res);

      default:
        return res.status(400).json({ error: "Invalid role" });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { addUser , showUsers};
