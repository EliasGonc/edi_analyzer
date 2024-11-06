module.exports = (sequelize, DataTypes) => {
    const EdiMessage = sequelize.define(
        "EdiMessage",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            edi_standard_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "edi_standard",
                    key: "id"
                }
            },
            message_type_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "message_type",
                    key: "id"
                }
            },
            message_version_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "message_version",
                    key: "id"
                }
            },
            segment_code_length: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            }
        },
        {
            tableName: "edi_message",
            timestamps: false
        }    
    );

    return EdiMessage;
};
/*
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const EdiStandard = require("./edi_standard");
const MessageType = require("./message_type");
const MessageVersion = require("./message_version");

class EdiMessage extends Model { }

EdiMessage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        edi_standard_id: {
            type: DataTypes.INTEGER,
            references: {
                model: EdiStandard,
                key: "id"
            }
        },
        message_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: MessageType,
                key: "id"
            }
        },
        message_version_id: {
            type: DataTypes.INTEGER,
            references: {
                model: MessageVersion,
                key: "id"
            }
        },
        segment_code_length: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        modelName: "EdiMessage",
        tableName: "edi_message",
        timestamps: false
    }
);

module.exports = EdiMessage;
*/