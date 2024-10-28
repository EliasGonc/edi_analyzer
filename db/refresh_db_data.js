const { dropTable, seedTable } = require("./helper_functions.js");
const ErrorMessage = require("../models/error_message.js");
const errorMessages = require("./data/error_messages.js");

dropTable(ErrorMessage);
seedTable(ErrorMessage, errorMessages);