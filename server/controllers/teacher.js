const Teacher = require("../models/teacher")
const Assignment = require("../models/assignment")
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
        const {token, teacher} = await Teacher.matchPasswordAndGenerateToken(email,password)
        res.cookie("token", token)
        res.status(200).json({ 
          message: 'Login successful', 
          teacher: {
            name: teacher.name,
            email: teacher.email,
            id : teacher._id
          }

        });    
      } catch (error) {
        return res.status(401).json({error : error.message})
    
      }
}     

async function postAssignment(req,res){
     const body = req.body 
     await Assignment.create(body)
}


async function getTeachers(req,res){
  try {
    const teachers = await Teacher.find({})
    return res.status(200).json(teachers)

  } catch (error) {
    res.status(401).json({error:error.message})
  }
}

module.exports = {
    teacherLoginHandler,
    teacherSignUpHandler,
    postAssignment,
    getTeachers

}