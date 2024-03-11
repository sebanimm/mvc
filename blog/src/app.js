const express = require("express");
const cors = require("cors");
const router = require("./controllers/postController");
const dirname = "C:/files/codes/main/mvc/blog/src/views";
const app = express();

app.set("views", dirname);
app.set("view engine", "ejs");

app.use(express.static(dirname));
app.use(cors());
app.use("/", router);

app.listen(8080, () => {
  console.log("listen");
});
