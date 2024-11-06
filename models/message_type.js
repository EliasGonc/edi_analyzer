module.exports = (sequelize, DataTypes) => {
    const MessageType = sequelize.define(
        "MessageType",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                // type: DataTypes.STRING(50),
                type: DataTypes.STRING,
                allowNull: false,
            },
            identifier: {
                // type: DataTypes.STRING(10),
                type: DataTypes.STRING,
                allowNull: false,
            },
            edi_standard_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "EdiStandard",
                    key: "id",
                }
            },
        },
        {
            tableName: "message_type",
            timestamps: false,
        }
    );
    return MessageType;
}

/*
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
            // type: DataTypes.STRING(50),
            type: DataTypes.STRING,
            allowNull: false,
        },
        identifier: {
            // type: DataTypes.STRING(10),
            type: DataTypes.STRING,
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
*/