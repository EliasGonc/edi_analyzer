const sequelize = require("../db/connect");
const { EdiStandard, MessageType, MessageVersion, EdiMessage, Segment, DataElement } = require("../models/associations.js");
const { ediStandardSeeds } = require("./edi_standard_seeds");
const { messageTypeSeeds } = require("./message_type_seeds");
const { messageVersionSeeds } = require("./message_version_seeds");
const { ediMessageSeeds } = require("./edi_message_seeds");
const { segmentSeeds } = require("./segment_seeds");
const { dataElementSeeds } = require("./data_elements_seeds");

async function deleteRecordsAndReset(tableModel, hasOwnId = true) {
    try {
        tableName = tableModel.getTableName();
        try {
            await tableModel.destroy({ where: {} });
            console.log(`All records of the table '${tableName}' have been deleted.`);
            if (hasOwnId) {
                await sequelize.query(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1;`);
                console.log(`Auto-increment of the column 'id' of the table '${tableName}' has been reset to 1.`);
            }
        } catch (err) {
            console.error(`Error deleting records of '${tableName}' table or resetting auto-increment: `, err);
        }
    } catch (err) {
        console.error("Error getting table name: ", err);
    }
}

async function deleteRecordsAndResetAllTables() {
    try {
        await deleteRecordsAndReset(EdiMessage, false);
        await deleteRecordsAndReset(MessageVersion);
        await deleteRecordsAndReset(MessageType);
        await deleteRecordsAndReset(EdiStandard);
        await deleteRecordsAndReset(Segment);
        await deleteRecordsAndReset(DataElement);
    } catch (err) {
        console.error("Error when deleting recording or resetting auto-increment of one of the app tables");
    }
}

async function seedTable(tableModel, data) {
    try {
        tableName = tableModel.getTableName();
        try {
            await tableModel.bulkCreate(data);
            console.log(`'${tableName}' table has been seeded.`);
        } catch (err) {
            console.error(`Error inserting records on table ${tableName}: `, err);
        }
    } catch (err) {
        console.error("Error getting table name: ", err);
    }
}

async function seedAllAppTables() {
    try {
        await seedTable(EdiStandard, ediStandardSeeds);
        await seedTable(MessageType, messageTypeSeeds);
        await seedTable(MessageVersion, messageVersionSeeds);
        await seedTable(EdiMessage, ediMessageSeeds);
        await seedTable(Segment, segmentSeeds);
        await seedTable(DataElement, dataElementSeeds);
    } catch (err) {
        console.error("Error seeding one of the app tables: ", err);
    }
}

sequelize.sync()
    .then(async () => {
        await deleteRecordsAndResetAllTables();
        console.log("Database & tables created.");
        await seedAllAppTables();
        console.log("All tables have been seeded.");
    })
    .catch(err => {
        console.error("Error syncing database", err);
    });
