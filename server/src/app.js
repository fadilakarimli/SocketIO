const express = require("express");
const cors = require("cors");

const { CLIENT_ORIGIN } = require("./config/env");

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.get("/health", (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

module.exports = app;