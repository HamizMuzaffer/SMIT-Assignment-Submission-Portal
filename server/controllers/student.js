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
    const {token,student} = await Student.matchPasswordAndGenerateToken(email, password)
    
    res.cookie("token", token)
    res.status(200).json({ 
      message: 'Login successful', 
      token,
      student: {
        name: student.name,
        email: student.email,
        teacherName : student.teacherName
        // Add other user fields as needed
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message })

  }

}

const studentLogoutHandler = async(req,res) => {
  res.clearCookie('token'); // Ensure the path matches where the cookie was set
  res.status(200).json({ message: 'Logout successful' });
}

async function fetchStudent(req,res) {
  try {
    const user = req.user
    const student = await Student.findById(user._id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching student:', err); // Log error for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  studentLogInHandler,
  studentSignUpHandler,
  studentLogoutHandler,
  fetchStudent
}