"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../../src/database/connection");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const User = UserModel(sequelize, Sequelize);
const General = require("../helpers/general");

exports.index = function (req, res) {
  User.findAll()
    .then((users) => {
      if (users) {
        res.json({ status: "success", data: users });
      } else {
        res.json({ status: "failed", data: [] });
      }
    })
    .catch((err) => res.send(err));
};
exports.show = function (req, res) {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        res.json({ status: "success", data: user });
      } else {
        res.json({ status: "failed", data: [] });
      }
    })
    .catch((err) => res.send(err));
};
exports.store = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      name: req.body.name,
    })
      .then((data) => {
        res.send("success");
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

exports.update = (req, res) => {
  res.send(req.body);
};

exports.destroy = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json({ status: "success" });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
