const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const MessageType = require("./message_type");

class MessageVersion extends Model {}

MessageVersion.init(
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
        message_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: MessageType,
                key: "id",
            },
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: "MessageVersion",
        tableName: "message_version",
        timestamps: false,
    }
);

module.exports = MessageVersion;
