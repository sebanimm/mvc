import { useState, useEffect } from "react";
import { getTodos, updateTodo, addTodo, deleteTodo } from "./api";

function App() {
  const [input, setInput] = useState("");
  const [a, setA] = useState(0);
  const [todos, setTodos] = useState([]);

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleButton = async () => {
    setA((prev) => prev + 1);
    await addTodo(input);
    setInput("");
  };

  const handleDelete = async (todoId) => {
    const data = await deleteTodo(todoId);
    console.log(data);
  };

  const handleUpdate = async (todoId, isFinished) => {
    console.log(isFinished);
    const data = await updateTodo(todoId, !isFinished);
    console.log(data);
  };

  const getTodo = async () => {
    const data = await getTodos();
    console.log(data);
    setTodos(data);
  };

  useEffect(() => {
    getTodo();
  }, [a]);

  return (
    <div className="App">
      <div>
        <input value={input} onChange={handleInput} />
        <button onClick={handleButton}>투두리스트 추가</button>
      </div>
      <ol>
        {todos
          ? todos.map((value) => (
              <ul key={value.todoId}>
                {value.todo} | {value.isFinished ? "완료함" : "진행중"}
                <button
                  onClick={() => handleUpdate(value.todoId, value.isFinished)}
                >
                  {value.isFinished ? "취소" : "완료"}
                </button>
                <button onClick={() => handleDelete(value.todoId)}>삭제</button>
              </ul>
            ))
          : "비어있음"}
      </ol>
    </div>
  );
}

export default App;
