const express = require("express");
const cors = require("cors");
const router = require("./controllers/todo");

const app = express();

app.use(cors());
app.use("/", express.json());

app.use("/", router);

app.listen(8080, () => {
  console.log("listen");
});
