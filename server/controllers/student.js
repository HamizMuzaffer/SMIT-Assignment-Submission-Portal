const Student = require("../models/student")

const studentSignUpHandler = async (req, res) => {
  const body = req.body;
  try {
    await Student.create(body)
    return res.status(200).json({ body })

  } catch (error) {
    console.log(error.message)
  }
}

const studentLogInHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await Student.matchPasswordAndGenerateToken(email, password)
    res.status(200).cookie("token", token).redirect("/")

  } catch (error) {
    return res.status(200).json({ error: error.message })

  }

}


module.exports = {
  studentLogInHandler,
  studentSignUpHandler
}