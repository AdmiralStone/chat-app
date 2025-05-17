// src/models/userModels.js
const knex = require('knex')(require('../../knexfile').development);

const createUser = (user) => knex('tblUsers').insert(user);
const findUserByEmail = (strEmail) => knex('tblUsers').where({strEmail}).first();
const findUserByUsername = (strUsername) => knex('tblUsers').where({strUsername}).first();

module.exports = {
    createUser,
    findUserByEmail,
    findUserByUsername
};

