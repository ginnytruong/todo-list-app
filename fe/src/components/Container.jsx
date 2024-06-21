import React, { useState, useEffect } from "react";
import AddTodoListForm from "./AddTodoListForm";
import AddTaskForm from "./AddTaskForm";
import { FaTrash } from "react-icons/fa";
import {
  getTodoLists,
  createTodoList,
  deleteTodoList,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../api";

const TodoListContainer = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [expandedListId, setExpandedListId] = useState(null);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    try {
      const data = await getTodoLists();
      setTodoLists(data);
    } catch (error) {
      console.error("Error fetching todo lists:", error);
    }
  };

  const handleCreateTodoList = async (name) => {
    try {
      await createTodoList(name);
      fetchTodoLists();
    } catch (error) {
      console.error("Error creating todo list:", error);
    }
  };

  const handleDeleteTodoList = async (id) => {
    try {
      await deleteTodoList(id);
      fetchTodoLists();
      setSelectedListId(null);
      setTasks([]);
    } catch (error) {
      console.error("Error deleting todo list:", error);
    }
  };

  const handleSelectList = async (id) => {
    try {
      setSelectedListId(id);
      const data = await getTasks(id);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async (newTaskContent) => {
    if (!newTaskContent) return;
    try {
      await createTask(newTaskContent, selectedListId);
      fetchTasks(selectedListId);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const fetchTasks = async (id) => {
    try {
      const data = await getTasks(id);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(selectedListId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (id, completed) => {
    try {
      await updateTask(id, completed);
      fetchTasks(selectedListId);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleExpandList = (id) => {
    setExpandedListId(expandedListId === id ? null : id);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-4 rounded bg-gray-100 h-screen overflow-y-auto">
      <div className="mb-4">
        <AddTodoListForm onAdd={handleCreateTodoList} />
      </div>
      {todoLists.length === 0 && (
        <p className="text-center text-gray-500">
          No to-do lists available. Start by creating one!
        </p>
      )}
      {todoLists.map((todoList) => (
        <div key={todoList.id} className="mb-4">
          <div
            onClick={() => {
              handleSelectList(todoList.id);
              toggleExpandList(todoList.id);
            }}
            className={`bg-white p-4 rounded shadow cursor-pointer flex justify-between items-center ${
              expandedListId === todoList.id ? "border-b-0" : "mb-4"
            }`}
          >
            <span className="font-bold">{todoList.name}</span>
            <FaTrash
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodoList(todoList.id);
              }}
              className="text-red-500 cursor-pointer"
            />
          </div>
          {expandedListId === todoList.id && (
            <div className="bg-white p-4 rounded-b shadow">
              <AddTaskForm onCreate={handleCreateTask} />
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No todo available. Add new todo!</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center border-t py-2"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          handleUpdateTask(task.id, !task.completed)
                        }
                        className="mr-2"
                      />
                      <span>{task.content}</span>
                    </div>
                    <FaTrash
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoListContainer;