"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../../src/database/connection");
const UserModel = require("../models/user");
const User = UserModel(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const Str = require("@supercharge/strings");

exports.validate = (params) => {
  return [
    check("email", "Email is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email address"),

    check("password", "Password is required")
      .isLength({ min: 5 })
      .withMessage("Password length minimum of 5"),
  ];
};

exports.login = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            result
          ) {
            if (result == true) {
              const api_token = Str.random(100);
              User.update(
                { api_token: api_token },
                { where: { email: user.email } }
              ).then(() => {
                User.findByPk(user.id).then((usr) => {
                  res.send({
                    status: "success",
                    message: "Login success",
                    data: usr,
                  });
                });
              });
            } else {
              res.send({
                status: "failed",
                message: "Incorrect Password",
              });
            }
          });
        } else {
          res.send({ status: "failed", message: "Email is not registered" });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    res.send(err);
  }
};
