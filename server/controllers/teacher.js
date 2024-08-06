const Teacher = require("../models/teacher")
const Assignment = require("../models/assignment")
const Course = require("../models/course")

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
        console.log(token)
        res.cookie("token", token,{
          secure: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        res.status(200).json({ 
          message: 'Login successful', 
          token,
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


async function getTeachers(req,res){
  try {
    const teachers = await Teacher.find({})
    return res.status(200).json(teachers)

  } catch (error) {
    res.status(401).json({error:error.message})
  }
}

async function createCourse(req,res) {
  const body = req.body;
  try {
    const newCourse = await Course.create(body)
    res.status(200).json(newCourse)
  } catch (error) {
    console.log(error.message)
  }
}

async function getCourse(req,res){
  try {
    const Courses = await Course.find({})
    return res.status(200).json(Courses)

  } catch (error) {
    res.status(401).json({error:error.message})
  }
}

async function fetchUser(req,res) {
    try {
      // Ensure req.user has the id property
      const user = req.user
      const teacher = await Teacher.findById(user._id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      res.json(teacher);
    } catch (err) {
      console.error('Error fetching teacher:', err); // Log error for debugging
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
}
module.exports = {
    teacherLoginHandler,
    teacherSignUpHandler,
    getTeachers,
    createCourse,
    getCourse,
    fetchUser
}