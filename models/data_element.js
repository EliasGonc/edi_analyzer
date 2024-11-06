module.exports = (sequelize, DataTypes) => {
    const DataElement = sequelize.define(
        "DataElement",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            code: {
                // type: DataTypes.STRING(20),
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                // type: DataTypes.STRING(100),
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            usage: {
                // type: USAGE_ENUM,
                // allowNull: false,
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "mandatory",
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
                allowNull: true
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
            tableName: "data_element",
            timestamps: false,
        }
    );

    return DataElement;
};
/*
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
// const { USAGE_ENUM } = require("./usage_enum");

class DataElement extends Model {}

DataElement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            // type: DataTypes.STRING(20),
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            // type: DataTypes.STRING(100),
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        usage: {
            // type: USAGE_ENUM,
            // allowNull: false,
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "mandatory",
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
            allowNull: true
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
        modelName: "DataElement",
        tableName: "data_element",
        timestamps: false,
    }
);

module.exports = DataElement;
*/