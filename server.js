const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
const apiRoutes = require("./app/routes/api_routes");
apiRoutes(app);

const db = require("./models");
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("API server started on: " + port);
  });
});
