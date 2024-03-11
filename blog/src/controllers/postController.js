const express = require("express");
const bodyParser = require("body-parser");
const PostService = require("../services/postService");
const postService = new PostService();
const router = express.Router();
const dirname = "C:/files/codes/main/mvc/blog/src/views";

const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  const data = await postService.findAllPosts();
  res.render(`${dirname}/index`, { data });
});

router.get("/create", async (req, res) => {
  res.render(`${dirname}/create`);
});

router.post("/create", jsonParser, async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  await postService.createPost(title, content, author);
  await setTimeout(() => {}, 100);
  res.redirect("/");
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const data = await postService.findOnePost(id);
  res.render(`${dirname}/update`, { data: data[0] });
});

router.post("/update/:id", jsonParser, async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  await postService.updatePost(id, title, content, author);
  await setTimeout(() => {}, 100);
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id);
  res.redirect("/");
});

module.exports = router;
