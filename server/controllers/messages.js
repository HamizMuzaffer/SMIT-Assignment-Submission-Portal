const Message = require("../models/message")

async function createMessage (req,res){
    try {
        const { text, senderId, receiverId, classId } = req.body;
        const message = new Message({ text, senderId, receiverId, classId });
        await message.save();
        res.status(201).json(message);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
async function findMessageById (req,res){
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Message.find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        }).sort({ createdAt: 1 });
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
async function updateMessageById (req,res){

}
async function deleteMessageById (req,res){

}

module.exports = { createMessage,findMessageById }