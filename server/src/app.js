const express = require("express");
const cors = require("cors");
const db = require("./database/models");
const router = require("./mvc/controllers/todo");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ DB Connected!");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(cors());
app.use("/", express.json());

app.use("/", router);

app.listen(8080, () => {
  console.log("listen");
});
