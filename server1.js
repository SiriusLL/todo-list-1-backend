const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = "3001";
const db = require("./config/dbCon.js");

app.get("/", (req, res) => {
  res.send("hello world");
});

db();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, console.log(`Connected on port: ${PORT}`));
});
