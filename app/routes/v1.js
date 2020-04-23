const express = require("express");
const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");
const v1 = express.Router();

// users
v1.route("/login").post(LoginController.validate(1), LoginController.login);
v1.route("/users")
  .get(UserController.index)
  .post(UserController.validate("store"), UserController.store);
v1.route("/users/:id")
  .get(UserController.show)
  .put(UserController.validate("store"), UserController.update)
  .delete(UserController.destroy);
module.exports = v1;
