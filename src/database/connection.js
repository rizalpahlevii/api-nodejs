const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodejs_auth", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;
