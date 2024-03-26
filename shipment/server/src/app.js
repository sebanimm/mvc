const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./controllers/shipmentController");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(8080, () => {
  console.log("listen");
});
