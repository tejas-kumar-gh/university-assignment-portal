const router=require("express").Router()
const {addUser,showUsers}=require("../controllers/users.js")

router.post("/add",addUser)
router.get("/showAllUsers",showUsers)
module.exports=router