const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./controllers/enrollmentController");
const { VIEW_DIRECTORY } = require("./constants");

const app = express();

app.set("views", VIEW_DIRECTORY);
app.set("view engine", "ejs");

app.use(express.static(VIEW_DIRECTORY));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.json());
app.use("/", router);

app.listen(8080, () => {
  console.log("listen");
});
