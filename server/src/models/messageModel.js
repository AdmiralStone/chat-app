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

module.exports = {
    sendMessage,
    getMessagesBetweenUsers
}