const Teacher = require("../models/teacher")

async function teacherSignUpHandler(req,res){
    const body = req.body;
    try {
        await Teacher.create(body)
        return res.status(200).json({body})

     } catch (error) {
        console.log(error.message)
     }}


async function teacherLoginHandler(req,res){
    const {email,password} = req.body;
    try {
        const token = await Teacher.matchPasswordAndGenerateToken(email,password)
        res.status(200).cookie("token",token).redirect("/")
    
      } catch (error) {
        return res.status(200).json({error : error.message})
    
      }
}     

module.exports = {
    teacherLoginHandler,
    teacherSignUpHandler
}