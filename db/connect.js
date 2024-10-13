const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('edi_analyzer', 'edi_admin', 'tSy9QmVERuTB2G67', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
/*
const { Pool } = require("pg");

const pool = new Pool({
    user: "edi_admin",
    password: "247139",
    host: "localhost",
    port: "5432",
    database: "edi_analyzer"
});

module.exports = { pool };
*/