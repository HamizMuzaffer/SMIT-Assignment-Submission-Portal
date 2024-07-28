const { Router } = require("express")
const {studentLogInHandler,studentSignUpHandler,studentLogoutHandler} = require("../controllers/student")
const router = Router()

router.post("/login",studentLogInHandler)
router.post('/signup',studentSignUpHandler)
router.get('/logout',studentLogoutHandler)

module.exports = router;