const express = require("express")
const router = express.Router();
const {teacherLoginHandler,teacherSignUpHandler,getTeachers,getCourse,createCourse, fetchUser} = require("../controllers/teacher")
const Teacher = require("../models/teacher")
const {authenticateToken} = require("../services/authentication")
const multer = require("multer")
const Assignment = require("../models/assignment")
const { getAssignments } = require("../controllers/assignment")
const path = require("path");

// Multer
const storage = multer.diskStorage({
  destination: function (req,file, cb) {
      cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
  }
  }) 

  const upload = multer({ storage: storage });



// Routes 
router.get("/",async(req,res)=>{
   const Teachers = await Teacher.find({})
   try {
      res.status(200).json(Teachers)
   } catch (error) {
      console.log(error.message)
   }

})
router.post("/signup",teacherSignUpHandler)
router.post("/login",teacherLoginHandler)
router.get('/',getTeachers)
router.post('/course',createCourse)
router.get('/course',getCourse)
router.get('/profile', authenticateToken,fetchUser);
router.post('/assignment', upload.single('file'), async (req, res) => {

  const { title, description, dueDate } = req.body;
  const file = req.file
  const teacherId = req.body.teacherId; // Make sure teacherId is being sent correctly

  if (!title || !description || !dueDate || !file ) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const assignment = await Assignment.create({
          title,
          description,
          dueDate,
          file: `/uploads/${req.file.filename}`,
          teacherId
      });
      res.status(201).json({ assignment });
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/assignment',getAssignments)

module.exports = router;