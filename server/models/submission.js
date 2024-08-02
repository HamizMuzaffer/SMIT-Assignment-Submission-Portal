const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    submissionLink: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required : true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    },
    rating : {
        type : Number,
        default : null
    }

}, { timestamps: true })

const Submission = mongoose.model("Submission", submissionSchema)

module.exports = Submission;