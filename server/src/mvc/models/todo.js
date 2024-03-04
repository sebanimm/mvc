const models = require("../../database/models");

const getTodos = async () => {
  const data = await models.Todo.findAll();
  return data;
};

const updateTodo = async (todoId, isFinished) => {
  await models.Todo.update({ isFinished }, { where: { todoId } });
};

const addTodo = async (todo) => {
  await models.Todo.create({ todo });
};

const deleteTodo = async (todoId) => {
  await models.Todo.destroy({ where: { todoId } });
};

module.exports = { getTodos, updateTodo, addTodo, deleteTodo };
