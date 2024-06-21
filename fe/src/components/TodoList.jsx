import React from "react";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import { FaTrash } from "react-icons/fa";

const TodoList = ({
  todoList,
  tasks,
  selectedListId,
  onTaskCreate,
  onTaskDelete,
  onTaskUpdate,
  onDelete,
  onSelect,
}) => {
  const handleToggleTask = async (taskId, completed) => {
    try {
      await onTaskUpdate(taskId, completed);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await onTaskDelete(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  if (!todoList) return null;

  return (
    <div className="mb-4 relative">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="cursor-pointer" onClick={onSelect}>
          <h3 className="text-lg text-black font-bold mb-2">{todoList.name}</h3>
        </div>
        {selectedListId === todoList.id && (
          <div className="mt-4">
            <AddTaskForm onCreate={onTaskCreate} />
            <div className="text-gray-500 mt-4 text-center">
              {tasks.length === 0 ? (
                <p>No tasks in this list. Add new tasks!</p>
              ) : (
                tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onToggle={(completed) =>
                      handleToggleTask(task.id, completed)
                    }
                    onDelete={() => handleDeleteTask(task.id)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <button
        className="absolute right-4 top-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800"
        onClick={onDelete}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TodoList;
