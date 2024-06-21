import React, { useEffect, useState } from "react";
import {
  getTodoLists,
  createTodoList,
  deleteTodoList,
  getTasks,
} from "../../frontend/api";
import Task from "./Task";

const TodoList = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    const data = await getTodoLists();
    setTodoLists(data);
  };

  const handleCreateTodoList = async (name) => {
    await createTodoList(name);
    fetchTodoLists();
  };

  const handleDeleteTodoList = async (id) => {
    await deleteTodoList(id);
    fetchTodoLists();
    setSelectedListId(null);
    setTasks([]);
  };

  const handleSelectList = async (id) => {
    setSelectedListId(id);
    const data = await getTasks(id);
    setTasks(data);
  };

  return (
    <div>
      <h1>Todo Lists</h1>
      <ul>
        {todoLists.map((list) => (
          <li key={list.id} onClick={() => handleSelectList(list.id)}>
            {list.name}{" "}
            <button onClick={() => handleDeleteTodoList(list.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleCreateTodoList("New List")}>
        Add Todo List
      </button>

      {selectedListId && (
        <div>
          <h2>Tasks</h2>
          <Task
            tasks={tasks}
            todoListId={selectedListId}
            fetchTasks={() => handleSelectList(selectedListId)}
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
