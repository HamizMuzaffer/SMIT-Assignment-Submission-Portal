const { Router } = require("express")
const {studentLogInHandler,studentSignUpHandler,studentLogoutHandler,  fetchStudent} = require("../controllers/student")
const { authenticateToken } = require("../services/authentication")
const { assignmentSubmissionHandler, getAssignmentSubmissions, getAssignmentSubmissionsById } = require("../controllers/assignment")
const router = Router()

router.post("/login",studentLogInHandler)
router.post('/signup',studentSignUpHandler)
router.get('/logout',studentLogoutHandler)
router.get('/profile',authenticateToken,fetchStudent)
router.post('/assignment/submission',assignmentSubmissionHandler)
router.get('/assignment/submission',getAssignmentSubmissions)
router.get('/assignment/submission/:id',getAssignmentSubmissionsById)
module.exports = router;