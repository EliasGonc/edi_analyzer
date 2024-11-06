module.exports = (sequelize, DataTypes) => {
    const EdiStandard = sequelize.define(
        "EdiStandard", 
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            identifier: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: "edi_standard",
            timestamps: false
        }
    );

    // EdiStandard.getAllWithRelatedData = async function() {
    //     return await EdiStandard.findAll({
    //         include: [
    //             {
    //                 model: MessageType,
    //                 include: [
    //                     {
    //                         model: MessageVersion,
    //                     }
    //                 ]
    //             }
    //         ]
    //     });
    // };
    
    return EdiStandard;
};

/*
const { Model, DataTypes } = require("sequelize");
const { MessageType } = require("./message_type");
const { MessageVersion } = require("./message_version");
const sequelize = require("../db/connect");

class EdiStandard extends Model {
    static async getAllWithRelatedData() {
        return await EdiStandard.findAll({
            include: [
                {
                    model: MessageType,
                    as: "message_types",
                    include: [
                        {
                            model: MessageVersion,
                            as: "message_versions"
                        }
                    ]
                }
            ]
        });
    }
}

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
*/