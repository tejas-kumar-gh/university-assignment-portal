const express=require("express")
const router=express.Router()
const {addDepartment,getAllDepartment,getUserCount,editDepartment,deleteDepartment}=require("../controllers/addDepartment")

router.post("/add",addDepartment)
router.get("/all",getAllDepartment)
router.get('/getusercount',getUserCount)
router.put('/update/:id',editDepartment)
router.delete('/delete/:id',deleteDepartment)
module.exports=router
