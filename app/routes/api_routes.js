const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
module.exports = function (app) {
  app.use("/api/v1", require("./v1"));
};
