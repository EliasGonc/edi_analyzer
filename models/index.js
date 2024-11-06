const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect");

const EdiStandard = require("./edi_standard")(sequelize, DataTypes);
const MessageType = require("./message_type")(sequelize, DataTypes);
const MessageVersion = require("./message_version")(sequelize, DataTypes);
const EdiMessage = require("./edi_message")(sequelize, DataTypes);
const Segment = require("./segment")(sequelize, DataTypes);
const EdiMessageContent = require("./edi_message_content")(sequelize, DataTypes);
const DataElement = require("./data_element")(sequelize, DataTypes);
const SegmentContent = require("./segment_content")(sequelize, DataTypes);
const ErrorMessage = require("./error_message")(sequelize, DataTypes);

EdiStandard.hasMany(MessageType, { foreignKey: "edi_standard_id", as: "message_types" });
MessageType.belongsTo(EdiStandard, { foreignKey: "edi_standard_id" });

MessageType.hasMany(MessageVersion, { foreignKey: "message_type_id", as: "message_versions" });
MessageVersion.belongsTo(MessageType, { foreignKey: "message_type_id" });

EdiStandard.getAllWithRelatedData = async function() {
    return await EdiStandard.findAll({
        include: [{
            model: MessageType,
            as: "message_types",
            include: [{
                model: MessageVersion,
                as: "message_versions"
            }]
        }]
    });
};


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
Segment.belongsToMany(EdiMessage, { through: EdiMessageContent, foreignKey: "segment_id" });

SegmentContent.belongsTo(Segment, { foreignKey: 'segment_id', onDelete: 'CASCADE', });
SegmentContent.belongsTo(DataElement, { foreignKey: 'data_element_id', onDelete: 'CASCADE', });
Segment.hasMany(SegmentContent, { foreignKey: 'segment_id', onDelete: 'CASCADE', });
DataElement.hasMany(SegmentContent, { foreignKey: 'data_element_id', onDelete: 'CASCADE', });

sequelize.sync({ force: false });

module.exports = {
    sequelize, EdiStandard, MessageType, MessageVersion, EdiMessage,
    Segment, EdiMessageContent, DataElement, SegmentContent, ErrorMessage
};