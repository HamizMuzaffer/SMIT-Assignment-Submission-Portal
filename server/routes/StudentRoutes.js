const { Router } = require("express")
const {studentLogInHandler,studentSignUpHandler,studentLogoutHandler,  fetchStudent} = require("../controllers/student")
const { authenticateToken } = require("../services/authentication")
const router = Router()

router.post("/login",studentLogInHandler)
router.post('/signup',studentSignUpHandler)
router.get('/logout',studentLogoutHandler)
router.get('/profile',authenticateToken,fetchStudent)

module.exports = router;