const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    body: {type : String, required : true},
    createdAt: {type: Date, default: Date.now }
})

const Announcement = mongoose.model('Announcement',announcementSchema);



moudule.exports = Announcement;