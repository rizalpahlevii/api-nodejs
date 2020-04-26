"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../../src/database/connection");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const User = UserModel(sequelize, Sequelize);
const { check, validationResult } = require("express-validator");
const Joi = require("joi");

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
    const body = req.body;
    const schema = Joi.object().keys({
      name: Joi.string().required().min(5),
      email: Joi.string().email().min(5),
      username: Joi.string().min(5).required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = Joi.validate(body, schema);
    if (error) return res.status(400).send(error.details[0].message);
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
  const body = req.body;
  const schema = Joi.object().keys({
    name: Joi.string().required().min(5),
    email: Joi.string().email().min(5),
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = Joi.validate(body, schema);
  if (error) return res.status(400).send(error.details[0].message);

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
