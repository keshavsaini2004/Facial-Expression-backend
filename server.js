require("dotenv").config();
const express = require("express");
const app = require("./src/app");
const connectToDb = require("./src/db/db");

connectToDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});