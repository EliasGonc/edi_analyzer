const EdiStandard = require("./edi_standard");
const MessageType = require("./message_type");
const MessageVersion = require("./message_version");
const EdiMessage = require("./edi_message");

EdiStandard.hasMany(MessageType, { foreignKey: "edi_standard_id" });
MessageType.belongsTo(EdiStandard, { foreignKey: "edi_standard_id" });

MessageType.hasMany(MessageVersion, { foreignKey: "message_type_id" });
MessageVersion.belongsTo(MessageType, { foreignKey: "message_type_id" });

EdiStandard.hasMany(EdiMessage, { foreignKey: "edi_standard_id" });
MessageType.hasMany(EdiMessage, { foreignKey: "message_type_id" });
MessageVersion.hasMany(EdiMessage, { foreignKey: "message_version_id" });
EdiMessage.belongsTo(EdiStandard, { foreignKey: "edi_standard_id" });
EdiMessage.belongsTo(MessageType, { foreignKey: "message_type_id" });
EdiMessage.belongsTo(MessageVersion, { foreignKey: "message_version_id" });

module.exports = { EdiStandard, MessageType, MessageVersion, EdiMessage };
