const express = require("express")
const router = express.Router();
const {teacherLoginHandler,teacherSignUpHandler,postAssignment} = require("../controllers/teacher")
const Teacher = require("../models/teacher")


router.get("/",async(req,res)=>{
   const Teachers = await Teacher.find({})
   try {
      res.status(200).json(teacherName)
   } catch (error) {
      console.log(error.message)
   }

})
router.post("/signup",teacherSignUpHandler)
router.post("/login",teacherLoginHandler)
router.post("/assignment",postAssignment)

module.exports = router;