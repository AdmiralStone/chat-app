// src/controller/messageController.js
const {sendMessage , getMessagesBetweenUsers} = require('../models/messageModel');

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
    
    const messages = await getMessagesBetweenUsers(userId, currentUserId);
    console.log(messages);
    res.json(messages)
};

module.exports = {
    handleSendMessage,
    handleGetMessages,
}