const { sequelize, ErrorMessage } = require("../models/");
const { dropTable, seedTable } = require("./utils.js");
const errorMessages = require("./data/error_messages.js");

const refreshDbData = function() {
    sequelize.sync()
        .then(async () => {
            dropTable(ErrorMessage);
            seedTable(ErrorMessage, errorMessages);
            console.log("Error message table refreshed.");
        })
        .catch(err => {
            console.error("Error refreshing databases");
        });
}

module.exports = refreshDbData;