const express = require("express");
const TodoService = require("../services/todoService");
const todoService = new TodoService();
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await todoService.findAllTodos();
  res.json(data);
});

router.post("/", async (req, res) => {
  const { todo } = req.body;
  await todoService.createTodo(todo);
  res.sendStatus(200);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isFinished } = req.body;
  await todoService.updateTodo(id, isFinished);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await todoService.deleteTodo(id);
  res.sendStatus(200);
});

module.exports = router;
