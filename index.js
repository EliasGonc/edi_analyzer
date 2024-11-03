const express = require("express");
const path = require("path");
const sequelize = require("./db/connect");
const ejsMate = require("ejs-mate");

// Models
const { EdiStandard } = require("./models/associations");

// Routes
const analyzerRoutes = require("./routes/analyzer");

// Express
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  try {
    res.render("analyzer/index", { ediStandards: await EdiStandard.findAll({}) });
  } catch (err) {
    console.error("Error when rendering EDI Analyzer page", err.stack);
  }
});

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