import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getTodoLists = async () => {
  const response = await axios.get(`${API_URL}/todo-lists`);
  return response.data;
};

export const createTodoList = async (name) => {
  const response = await axios.post(`${API_URL}/todo-lists`, { name });
  return response.data;
};

export const deleteTodoList = async (id) => {
  const response = await axios.delete(`${API_URL}/todo-lists/${id}`);
  return response.data;
};


export const getTasks = async (todoListId) => {
  const response = await axios.get(`${API_URL}/todo-lists/${todoListId}/tasks`);
  return response.data;
};

export const createTask = async (content, todoListId) => {
  const response = await axios.post(`${API_URL}/tasks`, {
    content,
    todoListId,
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`);
  return response.data;
};

export const updateTask = async (id, completed) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, { completed });
  return response.data;
};
