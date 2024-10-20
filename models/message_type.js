const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const EdiStandard = require("./edi_standard");

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
            allowNull: true,
            references: {
                model: EdiStandard,
                key: "id",
            }
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
