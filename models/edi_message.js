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
