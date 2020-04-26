const express = require("express");
const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");
const v1 = express.Router();
const authMiddleware = require("../middlewares/auth");
// users
v1.route("/login").post(LoginController.validate(1), LoginController.login);
v1.route("/users")
  .get(authMiddleware, UserController.index)
  .post([authMiddleware], UserController.store);
v1.route("/users/:id")
  .get(authMiddleware, UserController.show)
  .put([authMiddleware], UserController.update)
  .delete(authMiddleware, UserController.destroy);
module.exports = v1;
