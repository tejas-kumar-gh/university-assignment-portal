//login Authentication route
const express=require('express')
const router=express.Router();
const loginVerificatoin=require("../controllers/usersAuth")
router.post('/',loginVerificatoin)
module.exports=router;



