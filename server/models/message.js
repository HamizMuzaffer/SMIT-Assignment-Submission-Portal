const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", messageSchema)
module.exports = Message;