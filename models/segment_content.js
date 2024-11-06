module.exports = (sequelize, DataTypes) => {
    const SegmentContent = sequelize.define(
        "SegmentContent",
        {
            segment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Segment",
                    key: "id"
                }
            },
            data_element_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "DataElement",
                    key: "id"
                }
            },
            position: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            usage: {
                // type: USAGE_ENUM,
                // allowNull: true,
                // default: "mandatory"
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isIn: [['mandatory', 'optional', 'conditional']]
                }
            },
            fixed_length: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            minimum_length: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            maximum_length: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            // possible_values: {
            //     type: DataTypes.ARRAY(DataTypes.STRING),
            //     allowNull: true
            // },
            possible_values: {
                type: DataTypes.STRING,
                allowNull: true,
                // get() {
                //     const rawValue = this.getDataValue('possible_values');
                //     return rawValue ? JSON.parse(rawValue) : null;
                // },
                // set(value) {
                //     this.setDataValue('possible_values', JSON.stringify(value));
                // }
            },

        },
        {
            tableName: "segment_content",
            timestamps: false,
            primaryKey: ["segment_id", "data_element_id", "position"]/*,
        indexes: [
            { fields: ["segment_id"] }
        ]*/
        }
    );

    return SegmentContent;
};
/*
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const Segment = require("./segment");
const DataElement = require("./data_element");
// const { USAGE_ENUM } = require("./usage_enum");

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
            // type: USAGE_ENUM,
            // allowNull: true,
            // default: "mandatory"
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['mandatory', 'optional', 'conditional']]
            }
        },
        fixed_length: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        minimum_length: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maximum_length: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        // possible_values: {
        //     type: DataTypes.ARRAY(DataTypes.STRING),
        //     allowNull: true
        // },
        possible_values: {
            type: DataTypes.STRING,
            allowNull: true,
            // get() {
            //     const rawValue = this.getDataValue('possible_values');
            //     return rawValue ? JSON.parse(rawValue) : null;
            // },
            // set(value) {
            //     this.setDataValue('possible_values', JSON.stringify(value));
            // }
        },

    },
    {
        sequelize,
        modelName: "SegmentContent",
        tableName: "segment_content",
        timestamps: false,
        primaryKey: ["segment_id", "data_element_id", "position"],
        // indexes: [
        //     { fields: ["segment_id"] }
        // ]
    }
);

module.exports = SegmentContent;
*/