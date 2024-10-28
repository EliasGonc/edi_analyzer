async function dropTable(tableModel) {
    try {
        tableName = tableModel.getTableName();
        try {
            await tableModel.drop({ cascade: true });
        } catch (err) {
            console.error(`Error dropping table ${tableName}.`);
        }
    } catch (err) {
        console.error("Error getting table name: ", err);
    }
}

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

async function seedTable(tableModel, data) {
    try {
        tableName = tableModel.getTableName();
        try {
            await tableModel.sync();
            await tableModel.bulkCreate(data);
            console.log(`'${tableName}' table has been seeded.`);
        } catch (err) {
            console.error(`Error inserting records on table ${tableName}: `, err);
        }
    } catch (err) {
        console.error("Error getting table name: ", err);
    }
}


module.exports = { dropTable, deleteRecordsAndReset, seedTable };