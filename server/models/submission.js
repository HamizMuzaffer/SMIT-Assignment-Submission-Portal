const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    submissionLink :{
        type : String,
        required : true
    },
    submittedAt : {
        type: Date,
        default : Date.now
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
        },
        submissionId :{
            type: Schema.Types.ObjectId,
            ref : "Assignment"
        },    

}, {timestamps  : true })

const Submission = mongoose.model("Submission",submissionSchema)

moudule.exports = Submission;