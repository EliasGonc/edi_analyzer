const axios = require("axios");
const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000
});

module.exports = instance;