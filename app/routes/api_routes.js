const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
module.exports = function (app) {
  app.use("/api", require("./v1"));
};
