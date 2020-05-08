const knex = require('knex');
const cofiguration = require('../../knexfile');

const connection = knex(cofiguration.development);

module.exports = connection;