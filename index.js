const express = require("express");
const app = express();
const path = require("path");
const { Pool } = require("pg");

// Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// pg
const pool = new Pool({
    connectionString: "postgres://edi_admin:247139@localhost:5432/edi_analyzer"
});

pool.connect((err, client, done) => {
    if (err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
      });
    
    });

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8000, () => {
    console.log("Listening on port");
});