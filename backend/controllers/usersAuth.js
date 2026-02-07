
// login verfification route
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=require('../models/User') // requiring user schema from models
const adminSchema=require('../models/Admin') // requring admin schema from models

require("dotenv").config()

async function loginVerification(req,res){
  const {email,password}=req.body

  try{
    let user=await adminSchema.findOne({email})
    if(user){
      const match=await bcrypt.compare(password,user.password)
      if(!match){
        return res.status(400).json({message:"Incorrect password"})
      }
      const token=jwt.sign(
        {id:user._id,role:"admin"},
        process.env.SECRET_KEY
      )
      return res.status(200).json({
        message:"Login Succesfully",
        token,
        user:{
          id:user._id,
          email:user.email,
          role:"admin",
          name:user.name
        }

      })
    }
    user=await userSchema.findOne({email})
    if(!user){
      return res.status(400).json({
        message:"User not found"
      })
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
      return res.status(400).json({
        message:"Incorrect password"
      })
    }
    const token=jwt.sign(
      {id:user._id,role:user.role},
      process.env.SECRET_KEY
    )
    res.status(200).json({
      message:"Login Successful",
      token,
      user:{
        id:user._id,
        email:user.email,
        role:user.role,
        name:user.name
      }
    })
  }
  catch(err){
    console.log("error in userAuth.js loginVerification");
    res.status(500).json({
      message:"server error",
      error:err
    })
  }
}
  module.exports=loginVerification
