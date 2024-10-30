const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");

class EdiStandard extends Model {}

EdiStandard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            // type: DataTypes.STRING(50),
            type: DataTypes.STRING,
            allowNull: false
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "EdiStandard",
        tableName: "edi_standard",
        timestamps: false
    }
);

module.exports = EdiStandard;