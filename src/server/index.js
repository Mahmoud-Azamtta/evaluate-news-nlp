var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { analyzeURL } = require("./fetchAPI");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

dotenv.config();

// Variables for url and api key
const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  // res.sendFile("dist/index.html");
  res.sendFile("index.html");
});

// POST Route
app.post("/", async (req, res) => {
  const url = req.body.url;

  console.log(url);
  const analysis = await analyzeURL(url, API_KEY);
  res.send(analysis);
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
