const express = require("express")
const router = express.Router();
const {teacherLoginHandler,teacherSignUpHandler,getTeachers,getCourse,createCourse, fetchUser} = require("../controllers/teacher")
const Teacher = require("../models/teacher")
const {authenticateToken} = require("../services/authentication")
const Assignment = require("../models/assignment")
const { getAssignments, getAssignmentById, updateSubmissionById } = require("../controllers/assignment")
const {createAnnouncements,getAllAnnouncements,getAnnouncementsById,updateAnnoucementById,deleteAnnouncemenById} = require("../controllers/announcement")


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
router.post('/assignment',async (req, res) => {
    const { title, description, file, dueDate, teacherId } = req.body;
  
    if (!title || !description || !dueDate || !file || !teacherId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const assignment = await Assignment.create({
        title,
        description,
        dueDate,
        file,
        teacherId,
      });
  
      res.status(201).json({ assignment });
    } catch (error) {
      console.error('Error creating assignment:', error); // Ensure you see detailed error information
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/assignment',getAssignments)
router.get('/assignment/:id',getAssignmentById)
router.post('/assignment/update',updateSubmissionById)

// announcements Router 

router.post('/announcements',createAnnouncements)
router.delete('/announcements/:id',deleteAnnouncemenById)
router.put('/announcements/:id',updateAnnoucementById)
router.get('/announcements',getAllAnnouncements)
router.get('/announcements/:id',getAnnouncementsById)


module.exports = router;