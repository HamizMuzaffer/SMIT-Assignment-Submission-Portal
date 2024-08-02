const Assignment = require("../models/assignment")
const Submission = require("../models/submission")


async function postAssignment(req,res){
    const {title,description,dueDate,} = req.body
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      fileUrl : `/uploads/${req.file.filename}`,
      teacherId : req.user._id
    }) 
    try {
        console.log(assignment);
        res.status(201).json({assignment});
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

async function getAssignments(req,res){
    try {
        const assignments = await Assignment.find({})
        res.status(200).json(assignments)
    } catch (error) {
        res.status(400).json({error : error.message})
    }

}

async function getAssignmentById(req,res){
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
          return res.status(404).json({ error: 'Assignment not found' });
        }
        res.json(assignment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function assignmentSubmissionHandler(req,res){
  const {submissionLink,assignmentId,studentId} = req.body;
  const assignmentSubmission = await Submission.create({
    submissionLink,
    assignmentId,
    studentId
  })
  try {
    console.log(assignmentSubmission)
    res.status(201).json(assignmentSubmission)
  } catch (error) {
    console.log(error.message)
  }
}

async function getAssignmentSubmissions(req,res){
const assignmentSubmissions = await Submission.find({})
try {
  res.status(200).json(assignmentSubmissions)
} catch (error) {
  console.log(error.message)
}
}

async function getAssignmentSubmissionsById(req,res){
  try {
    const assignmentSubmissionById = await Submission.findById(req.params.id)
    if(!assignmentSubmissionById) {
      res.status(404).json({error : 'Submissions Not found'})
    }
    res.json(assignmentSubmissionById)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { postAssignment,getAssignments,getAssignmentById,assignmentSubmissionHandler,getAssignmentSubmissions,getAssignmentSubmissionsById}