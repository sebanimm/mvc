const express = require("express");
const PostService = require("../services/postService");
const postService = new PostService();
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await postService.findAllPosts();
  res.render("../views/index", { data });
});

router.get("/create", async (req, res) => {
  res.render("../views/create");
});

router.post("/create", async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  await postService.createPost(title, content, author);
  await setTimeout(() => {}, 100);
  res.redirect("/");
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const data = await postService.findOnePost(id);
  res.render("../views/update", { data: data[0] });
});

router.post("/update/:id", async (req, res) => {
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
