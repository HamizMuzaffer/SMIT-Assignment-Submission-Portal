const express = require('express');
const { createMessage, findMessageById } = require('../controllers/messages');
const router = express.Router()

router.post('/',createMessage)
router.get('/:senderId/:receiverId',findMessageById)


module.exports = router;