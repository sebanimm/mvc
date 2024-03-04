const express = require("express");
const { getTodos, updateTodo, addTodo, deleteTodo } = require("../models/todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getTodos();
  res.json(data);
});

router.post("/", async (req, res) => {
  const { todo } = req.body;
  await addTodo(todo);
  res.send(200);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isFinished } = req.body;
  await updateTodo(id, isFinished);
  res.send(200);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteTodo(id);
  res.send(200);
});

module.exports = router;
