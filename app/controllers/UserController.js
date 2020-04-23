"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../../src/database/connection");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const User = UserModel(sequelize, Sequelize);
const { check, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "store": {
      return [
        check("name", "Name is required")
          .isLength({ min: 3 })
          .withMessage("Name length minimum of 5"),

        check("username", "Username is required")
          .isLength({ min: 5 })
          .withMessage("Username length minimum of 5")
          .exists(),

        check("email", "Email is required")
          .isLength({ min: 5 })
          .withMessage("Username length minimum of 5")
          .exists()
          .isEmail(),

        check("password", "Password is required")
          .isLength({ min: 6 })
          .withMessage("Username length minimum of 5"),
      ];
    }
  }
};

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

exports.store = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hash,
      })
        .then((data) => {
          res.send({ status: "success", data: data });
        })
        .catch((err) => {
          res.send({ status: "failed", data: err });
        });
    });
  } catch (err) {
    return next(err);
  }
};

exports.update = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.update(
      {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hash,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((user) => {
        res.send({ status: "success", data: user });
      })
      .catch((err) => {
        res.send({ status: "failed", data: [] });
      });
  });
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
