import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },

  (error) => {
    return error;
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return error;
  },
);

export const getTodos = async () => {
  const { data } = await instance.get("/");
  return data;
};

export const addTodo = async (todo) => {
  const { data } = await instance.post("/", { todo });
  return data;
};

export const updateTodo = async (todoId, isFinished) => {
  const { data } = await instance.put(`/${todoId}`, { isFinished });
  return data;
};

export const deleteTodo = async (todoId) => {
  const { data } = await instance.delete(`/${todoId}`);
  return data;
};
