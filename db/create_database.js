const { Sequelize } = require('sequelize');

// Connect to PostgreSQL server without specifying a database
const sequelize = new Sequelize('postgres://edi_admin:tSy9QmVERuTB2G67@localhost:5432/', {
    dialect: 'postgres',
});

// Function to create a new database
async function createDatabase(dbName) {
    try {
        // Raw SQL query to create a new database
        await sequelize.query(`CREATE DATABASE ${dbName};`);
        console.log(`Database '${dbName}' created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

// Call the function to create a new database
createDatabase('my_new_database');