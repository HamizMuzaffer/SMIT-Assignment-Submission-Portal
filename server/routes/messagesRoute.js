const express = require('express');
const { createMessage, findMessageById,getStudentsWithMessages} = require('../controllers/messages');
const router = express.Router()

router.post('/',createMessage)
router.get('/:senderId/:receiverId',findMessageById)
router.get('/:teacherId', getStudentsWithMessages);

module.exports = router;