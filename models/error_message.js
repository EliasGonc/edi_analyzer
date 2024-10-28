const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");

class ErrorMessage extends Model {};

ErrorMessage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('format'),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "ErrorMessage",
        tableName: "error_message",
        timeStamps: false
    }
)

module.exports = ErrorMessage;