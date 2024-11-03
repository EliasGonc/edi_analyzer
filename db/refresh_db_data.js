const sequelize = require("./connect.js");
const { dropTable, seedTable } = require("./utils.js");
const ErrorMessage = require("../models/error_message.js");
const errorMessages = require("./data/error_messages.js");

sequelize.sync()
    .then(async () => {
        dropTable(ErrorMessage);
        seedTable(ErrorMessage, errorMessages);
        console.log("Error message table refreshed.");
    })
    .catch(err => {
        console.error("Error refreshing databases");
    });