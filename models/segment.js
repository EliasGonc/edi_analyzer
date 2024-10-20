const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const MessageVersion = require("./message_version");
const { USAGE_ENUM } = require("./usage_enum");

class Segment extends Model {}

Segment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        message_version_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MessageVersion,
                key: "id"
            }
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        usage: {
            type: USAGE_ENUM,
            defaultValue: "mandatory",
        },
        min_repetitions: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        max_repetitions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        qualifier_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        min_qualif_repetitions: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        max_qualif_repetitions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        segment_length: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        parent_segment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "segment",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Segment",
        tableName: "segment",
        timestamps: false,
    }
);

module.exports = Segment;
