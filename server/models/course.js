const mongoose = require('mongoose');


const courseSchema = mongoose.Schema({
    course : {
        type : String,
        required : true
    },

    })

     const Course = mongoose.model("Course",courseSchema)
     module.exports = Course;