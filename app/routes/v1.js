const express = require("express");
const UserController = require("../controllers/UserController");
const v1 = express.Router();

// users
v1.route("/users").get(UserController.index).post(UserController.store);
v1.route("/users/:id")
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.destroy);
module.exports = v1;
