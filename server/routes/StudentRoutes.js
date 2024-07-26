const { Router } = require("express")
const {studentLogInHandler,studentSignUpHandler} = require("../controllers/student")
const router = Router()

router.post("/login",studentLogInHandler)
router.post('/signup',studentSignUpHandler)


module.exports = router;