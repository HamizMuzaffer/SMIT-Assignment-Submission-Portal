const Assignment = require("../models/assignment")
   


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
        console.log(assignments)
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

module.exports = { postAssignment,getAssignments,getAssignmentById}