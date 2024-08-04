const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    title: {type : String, required : true},
    content : {type : String, required : true},
    teacherId : {type : mongoose.Schema.Types.ObjectId, ref : 'Teacher'}

},{timestamps : true})

const Announcement = mongoose.model('Announcement',announcementSchema);



moudule.exports = Announcement;