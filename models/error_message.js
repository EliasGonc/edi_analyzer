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
            // type: DataTypes.ENUM('format'),
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['format']]
            }
        },
        title: {
            // type: DataTypes.STRING(100),
            type: DataTypes.STRING,
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