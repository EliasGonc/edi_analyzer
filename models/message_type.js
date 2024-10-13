// models/MessageType.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");

class MessageType extends Model {}

MessageType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        identifier: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        edi_standard_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "edi_standard",
                key: "id",
            },
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: "MessageType",
        tableName: "message_type",
        timestamps: false,
    }
);

module.exports = MessageType;
