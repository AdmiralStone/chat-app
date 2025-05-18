// src/routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {handleSendMessage, handleGetMessages,markChatAsRead,getUnreadMessageCounts} = require('../controllers/messageController');


router.post('/',verifyToken, handleSendMessage);
router.get('/:userId',verifyToken, handleGetMessages);
router.post('/:userId/read', verifyToken, markChatAsRead);
router.get('/unread/counts', verifyToken, getUnreadMessageCounts);

module.exports = router;