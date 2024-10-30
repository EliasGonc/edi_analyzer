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
            type: DataTypes.STRING,
            allowNull: false,
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: MessageType,
                key: "id",
            }
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
