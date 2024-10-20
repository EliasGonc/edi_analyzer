const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const { USAGE_ENUM } = require("./usage_enum");

class DataElement extends Model {}

DataElement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
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
            allowNull: false,
        },
        minimum_length: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
        modelName: "DataElement",
        tableName: "data_element",
        timestamps: false,
    }
);

module.exports = DataElement;
