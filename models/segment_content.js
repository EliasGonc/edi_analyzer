const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const Segment = require("./segment");
const DataElement = require("./data_element");
const { USAGE_ENUM } = require("./usage_enum");

class SegmentContent extends Model {};

SegmentContent.init(
    {
        segment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Segment,
                key: "id"
            }
        },
        data_element_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: DataElement,
                key: "id"
            }
        },
        position: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        usage: {
            type: USAGE_ENUM,
            allowNull: false,
            default: "mandatory"
        },
        minimum_length: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        maximum_length: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        possible_values: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: "SegmentContent",
        tableName: "segment_content",
        timestamps: false,
        primaryKey: ["segment_id", "data_element_id", "position"]/*,
        indexes: [
            { fields: ["segment_id"] }
        ]*/
    }
);

module.exports = SegmentContent;
