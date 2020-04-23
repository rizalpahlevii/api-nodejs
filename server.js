const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
const apiRoutes = require("./app/routes/api_routes");
apiRoutes(app);
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("API server started on: " + port);
  });
});
