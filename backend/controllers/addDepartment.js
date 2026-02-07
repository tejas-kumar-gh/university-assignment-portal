const { get } = require("mongoose");
const departmentSchema=require("../models/Departments")


// function for add deapartment in departmentSchema
async function addDepartment(req,res){
  const {departmentName,programType,description}=req.body;
  try{
    await departmentSchema.create({
      departmentName,
      programType,
      description
    })
    res.status(200).json({message:"Department added successfullt"})
  }
  catch(err){
    console.log("error in addDepartment.js");
    res.status(500).json({error:err})
  }
}

// function for get all deapartment
async function getAllDepartment(req,res){
  try{
    

    const department=await departmentSchema.find()
    res.status(200).json(department)
  }
  catch(err){
    console.log("error in getAllDepartment.js");
    res.status(500).json({error:err})
  }
}


// function for count the users in a department

async function getUserCount(req,res){

  try{
  
    const department=await departmentSchema.aggregate([
      {
        $lookup:{
          from:"users",
          localField:"_id",
          foreignField:"department",
          as:"users"
        }
        },
      {
        $addFields:{
          userCount:{$size:"$users"}
        }
      },{
        $project:{
          departmentName:1,
          programType:1,
          description:1,
          userCount:1
        }
      }
    ])
    res.status(200).json(department);
  
  }
  catch(err){
    console.log("error in  controllers/addDepartment.js");
    res.status(500).json({error:err})
  }
}



// function for edit the information of a department
async function editDepartment(req,res){
  try{
    const id=req.params.id;
    const {departmentName,programType,description}=req.body;
    const department=await departmentSchema.findByIdAndUpdate(id,{
      departmentName,
      programType,
      description,
    },
      {new:true, runValidators: true }, 
       // new used for return the updated document
       // runValidators used for validate the data
    )
    res.status(200).json(department)
    }
  catch(err){
    console.log("error in controllers/addDepartment.js editDepartment function");
    res.status(500).json({error:err})
  }
}


// function for delete a department by id
async function deleteDepartment(req,res){
  try{
      const id=req.params.id;
      const delDepartment=await departmentSchema.findByIdAndDelete(id);
      if(!delDepartment){
        res.status(404).json({message:"Department not found"})
      }
      res.status(200).json({message:"Department deleted successfully"})
  }
  catch(err){
    console.log("Error in controllers/addDepartment.js deleteDepartment function");
    res.status(500).json({error:err})
  }
}


module.exports={
  addDepartment,
  getAllDepartment,
  getUserCount,
  editDepartment,
  deleteDepartment,
}