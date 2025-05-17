// src/routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {handleSendMessage, handleGetMessages} = require('../controllers/messageController');


router.post('/',verifyToken, handleSendMessage);
router.get('/:userId',verifyToken, handleGetMessages);

module.exports = router;