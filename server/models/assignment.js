const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { 
        type: String,
         required: true
         },
    description: { 
        type: String,
        required: true 
        },
    dueDate: { 
        type: Date,
         required: true
         },
    file: { 
        type: String
    },
    totalSubmissions: {
        type: Number,
        default: 0
      },
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Teacher'
    },
}, {timestamps : true});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
