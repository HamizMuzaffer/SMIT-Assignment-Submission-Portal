const Message = require("../models/message")
const mongoose = require("mongoose");
const Student = require("../models/student")

async function createMessage (req,res){
    try {
        const { text, senderId, receiverId, classId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(senderId)) {
          throw new Error('Invalid senderId');
        }
        const message = new Message({ text, senderId, receiverId, classId });
        await message.save();
        res.status(201).json(message);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getStudentsWithMessages = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    console.log('Fetching students for teacher:', teacherId);
    const uniqueSenderIds = await Message.distinct('senderId', { receiverId: teacherId });
    const students = await Student.find({ 
      _id: { $in: uniqueSenderIds },
      teacherId: teacherId 
    }).select('_id name');
    res.json(students);
  } catch (error) {
    console.error('Error in /messages/students/:teacherId:', error);
    res.status(500).json({ error: error.message });
  }
};



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
module.exports = { createMessage,findMessageById,getStudentsWithMessages }