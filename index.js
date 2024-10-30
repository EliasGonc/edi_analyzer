const express = require("express");
const path = require("path");
const sequelize = require("./db/connect");
const ejsMate = require("ejs-mate");
const axios = require("./axiosInstance");

// Routes
const ediStandardRoutes = require("./routes/edi_standards");
const messageTypeRoutes = require("./routes/message_types");
const messageVersionRoutes = require("./routes/message_versions");
const ediMessageRoutes = require("./routes/edi_messages");
const segmentRoutes = require("./routes/segments");
const dataElementRoutes = require("./routes/data_elements");
const ediMessageContentRoutes = require("./routes/edi_message_contents");
const segmentContentRoutes = require("./routes/segment_contents");
const analyzerRoutes = require("./routes/analyzer");

// Express
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Axios
const axiosConfigForApi = {
  baseURL: "http://localhost:8000/api/"
}

// Routes
app.get("/", async (req, res) => {
  try {
    const ediStandards = await axios.get("/edi-standards", axiosConfigForApi );
    res.render("analyzer/index", { ediStandards: ediStandards.data });
  } catch (err) {
    console.error("Error when rendering EDI Analyzer page", err.stack);
  }
});

// API routes
app.use("/api",
  ediStandardRoutes,
  messageTypeRoutes,
  messageVersionRoutes,
  ediMessageRoutes,
  segmentRoutes,
  dataElementRoutes,
  ediMessageContentRoutes,
  segmentContentRoutes,
);
app.use("/", analyzerRoutes);

sequelize.sync()
    .then(() => {
      console.log("Database & tables created");
    })
    .catch(err => {
      console.error("Error syncing database", err);
    })

app.listen(8000, () => {
    console.log("Listening on port 8000");
});