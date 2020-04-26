const Sequelize = require("sequelize");
const sequelize = require("../../src/database/connection");
const UserModel = require("../models/user");
const User = UserModel(sequelize, Sequelize);
const Joi = require("joi");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.api_token;
    User.findOne({ where: { api_token: token } }).then((user) => {
      if (!user) {
        res.status(403).json({
          error: "invalid token",
        });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
};
