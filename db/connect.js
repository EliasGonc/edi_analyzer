const { Sequelize } = require('sequelize');

// PostgreSQL
/*
const sequelize = new Sequelize('edi_analyzer', 'edi_admin', 'tSy9QmVERuTB2G67', {
    host: 'localhost',
    dialect: 'postgres'
});
*/

// SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
});

module.exports = sequelize;