const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./controllers/reservationController");
const dirname = `${__dirname}/views`;
const app = express();

app.set("views", dirname);
app.set("view engine", "ejs");

app.use(express.static(dirname));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.json());
app.use("/", router);

app.listen(8080, () => {
  console.log("listen");
});
