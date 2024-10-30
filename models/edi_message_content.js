const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
// const { USAGE_ENUM } = require("./usage_enum");
const EdiMessage = require("./edi_message");
const Segment = require("./segment");

class EdiMessageContent extends Model {};

EdiMessageContent.init(
    {
        edi_message_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: EdiMessage,
                key: "id"
            }
        },
        segment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Segment,
                key: "id"
            }
        },
        usage: {
            // type: USAGE_ENUM,
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['mandatory', 'optional', 'conditional']]
            }
        },
        min_repetitions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        max_repetitions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        min_qualif_repetitions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        max_qualif_repetitions: {
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
        previous_sibling_segment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "segment",
                key: "id",
            },
        }
    },
    {
        sequelize,
        modelName: "EdiMessageContent",
        tableName: "edi_message_content",
        timestamps: false
    }
)

module.exports = EdiMessageContent;