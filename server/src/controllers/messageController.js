// src/controller/messageController.js
const {sendMessage , getMessagesBetweenUsers, markMessagesAsRead, getUnreadCounts} = require('../models/messageModel');

const handleSendMessage = async(req,res) => {
    const {receiverId , content} = req.body;
    const senderId = req.user.id;

    if(!receiverId || !content){
        return res.status(400).json({message:'Reciever and content are required'});
    }

    const message = {
        intSenderId:senderId,
        intReceiverId:receiverId,
        strContent:content,
        bitIsRead:false
    }

    await sendMessage(message);
    res.status(201).json({message: 'Message sent successfully'});
};

const handleGetMessages = async(req,res) => {
    const userId = parseInt(req.params.userId);
    const currentUserId = req.user.id
    
    const messages = await getMessagesBetweenUsers(req, res);
    res.json(messages)
};

/**
 * @desc   Marks all unread messages from :userId as read
 * @route  POST /api/messages/:userId/read
 * @access Private
 */
const markChatAsRead = async(req, res) => {
    const receiverId = req.user.id;
    const senderId = parseInt(req.param.userId);

    await markMessagesAsRead(receiverId,senderId);
    res.status(200).json({message:'Messages marked as read'})
}

/**
 * @desc   Gets unread message counts per sender
 * @route  GET /api/messages/unread
 * @access Private
 */
const getUnreadMessageCounts = async(req,res) => {
    const receiverId = req.user.id;

    const counts = await getUnreadCounts(receiverId);
    res.status(200).json(counts);
}

module.exports = {
    handleSendMessage,
    handleGetMessages,
    markChatAsRead,
    getUnreadMessageCounts,
}