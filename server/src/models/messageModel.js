// src/models/messageModels.js
const knex = require('knex')(require('../../knexfile').development);

const sendMessage = (message) => knex('tblMessages').insert(message);

const getMessagesBetweenUsers = (user1, user2) => {
    return knex('tblMessages')
        .where(function() {
            this.where('intSenderId', user1).andWhere('intReceiverId', user2);
        })
        .orWhere(function() {
            this.where('intSenderId',user2).andWhere('intReceiverId', user1);
        }).orderBy('created_at', 'asc');
}

/**
 * Marks all messages from a specific sender as read for logged-in reciver
 * @param {number} receiverId - current user
 * @param {number} senderId - chat partner
 */
const markMessagesAsRead = async(receiverId, senderId) => {
    knex('tblMessages')
        .where({
            intReceiverId: receiverId,
            intSenderId: senderId,
            bitIsRead: false,
        }).update({bitIsRead: true});


};

/**
 * Gets count of unread messages grouped by sender, along with username and profile pic
 * @param {number} receiverId - current user
 */
const getUnreadCounts = (receiverId) => {
    return knex('tblMessages as m')
        .select(
            'm.intSenderId',
            'u.strUsername',
            'u.strProfilePicLink',
            knex.raw('COUNT(*) as intUnreadCount')
        )
        .where({'m.intReceiverId':receiverId , 'm.bitIsRead':false})
        .join('tblUsers as u' , 'm.intSenderId' , 'u.intId')
        .groupBy('m.intSenderId','u.strUsername','u.strProfilePicLink');
}


module.exports = {
    sendMessage,
    getMessagesBetweenUsers,
    markMessagesAsRead,
    getUnreadCounts,
}