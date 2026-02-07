const express=require('express')
const cors = require("cors")
const app=express()
const mongoconnect=require("./connection/connection")
const adminRoutes=require("./routes/adminRoutes")
const authRoute=require("./routes/loginRoute") // login route for users
const departmentRoute=require("./routes/departmentRoute")
const userRoute=require("./routes/userRoutes")
require('dotenv').config();
app.use(express.json());
app.use(cors({
  origin: "*"
}))
mongoconnect(process.env.MONGO_URI).then(()=>console.log("mongodb connected"));


app.use('/auth',adminRoutes)
app.use('/login',authRoute)  // login verification route for users
app.use('/departments',departmentRoute)
app.use('/users',userRoute)

app.listen(3000,()=>{
  console.log(`http://localhost:3000`);
})