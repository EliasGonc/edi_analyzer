const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const EdiStandard = require("./edi_standard");
const MessageType = require("./message_type");
const MessageVersion = require("./message_version");

class EdiMessage extends Model {}

EdiMessage.init({
    edi_standard_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: EdiStandard,
            key: "id"
        }
    },
    message_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: MessageType,
            key: "id"
        }
    },
    message_version_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: MessageVersion,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "EdiMessage",
    tableName: "edi_message",
    timestamps: false
});

module.exports = EdiMessage;
