const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const stockRoutes = require("./routes/stockRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: 200, msg: "Welcome to The Stock Market" });
});

app.use("/api", stockRoutes);

module.exports = app;