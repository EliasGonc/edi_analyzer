const express = require("express");
const path = require("path");
const axios = require("axios");
const sequelize = require("./db/connect");

// Routes
const ediStandardRoutes = require("./routes/edi_standards");
const messageTypeRoutes = require("./routes/message_types");
const messageVersionRoutes = require("./routes/message_versions");
const ediMessageRoutes = require("./routes/edi_messages");
const segmentRoutes = require("./routes/segments");
const dataElementRoutes = require("./routes/data_elements");

// Express
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Axios
const axiosConfigForApi = {
  baseURL: "http://localhost:8000/api/"
}

// Routes
app.get("/", async (req, res) => {
  try {
    const ediStandards = await axios.get("/edi-standards", axiosConfigForApi );
    res.render("analyzer", { ediStandards: ediStandards.data });
  } catch (err) {
    console.error("Error when rendering EDI Analyzer page", err.stack);
  }
});

// API routes
app.use("/api", ediStandardRoutes, messageTypeRoutes, messageVersionRoutes, ediMessageRoutes, segmentRoutes, dataElementRoutes);

sequelize.sync()
    .then(() => {
      console.log("Database & tables created");
    })
    .catch(err => {
      console.error("Error syncing database", err);
    })

/*
app.get("/", async (req, res) => {
    try {
      const edi_standards = await db.pool.query("SELECT * FROM edi_standard");
      const message_types = await db.pool.query("SELECT * FROM message_type")
      res.render("index", {
        edi_standards: edi_standards.rows,
        message_types: message_types.rows
      });
    } catch (err) {
      console.error("Error when querying the database", err.stack);
    }
});
*/
app.listen(8000, () => {
    console.log("Listening on port 8000");
});