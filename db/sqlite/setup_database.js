const Database = require('better-sqlite3');

const db = new Database('edi_analyzer.db', { verbose: console.log });

try {
    // Create a table named 'example_table' if it doesn't already exist
    const createTable = `
        CREATE TABLE IF NOT EXISTS example_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT DEFAULT NULL
        )
    `;
    
    db.exec(createTable); // Execute the query to create the table
    console.log("Database and table created successfully.");
} catch (error) {
    console.error("Error setting up database:", error.message);
} finally {
    db.close(); // Close the database connection when done
}
