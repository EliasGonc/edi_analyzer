// enums.js
const { DataTypes } = require("sequelize");

const USAGE_ENUM = DataTypes.ENUM("mandatory", "optional", "conditional");

module.exports = { USAGE_ENUM };
