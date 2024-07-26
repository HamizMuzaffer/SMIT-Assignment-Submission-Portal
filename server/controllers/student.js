const Student = require("../models/student")

const studentSignUpHandler = async (req, res) => {
  const body = req.body;
  try {
    const student = await Student.create(body);
    return res.status(201).json({ student });  // Respond with created student and status 201
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });  // Send error response with status 500
  }
};


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