const EdiStandard = require("./edi_standard");
const MessageType = require("./message_type");
const MessageVersion = require("./message_version");
const EdiMessage = require("./edi_message");
const Segment = require("./segment");
const DataElement = require("./data_element");
const EdiMessageContent = require("./edi_message_content");
const SegmentContent = require("./segment_content");

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

MessageVersion.hasMany(Segment, { foreignKey: "message_version_id" });
Segment.belongsTo(MessageVersion, { foreignKey: "message_version_id" });
Segment.belongsTo(Segment, { as: "parent_segment", foreignKey: "parent_segment_id" });
Segment.hasMany(Segment, { as: "sub_segments", foreignKey: "parent_segment_id" });

EdiMessage.belongsToMany(Segment, { through: EdiMessageContent, foreignKey: "edi_message_id" });
Segment.belongsToMany(EdiMessage, { through: EdiMessageContent,foreignKey: "segment_id" });

/*
Segment.belongsToMany(DataElement, { through: SegmentContent, foreignKey: "segment_id" });
DataElement.belongsToMany(Segment, { through: SegmentContent, foreignKey: "data_element_id" });
*/
SegmentContent.belongsTo(Segment, { foreignKey: 'segment_id', onDelete: 'CASCADE', });
SegmentContent.belongsTo(DataElement, { foreignKey: 'data_element_id', onDelete: 'CASCADE', });
Segment.hasMany(SegmentContent, { foreignKey: 'segment_id', onDelete: 'CASCADE', });
DataElement.hasMany(SegmentContent, { foreignKey: 'data_element_id', onDelete: 'CASCADE', });

module.exports = { 
    EdiStandard, MessageType, MessageVersion, EdiMessage,
    Segment, DataElement, EdiMessageContent, SegmentContent
};
