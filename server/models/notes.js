const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title : {
       type : String,
       required : true,
    },
    content : {
        type : String,
        required : true
    },

    userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Student' || 'Teacher',
    }

},{timestamps : true})

const Notes = mongoose.model("Notes",notesSchema)

module.exports = Notes;