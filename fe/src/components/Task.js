import React from "react";
import { createTask, deleteTask, updateTask } from "../../api";

const Task = ({ tasks, todoListId, fetchTasks }) => {
  const handleCreateTask = async (content) => {
    await createTask(content, todoListId);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleUpdateTask = async (id, completed) => {
    await updateTask(id, completed);
    fetchTasks();
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.content}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleUpdateTask(task.id, !task.completed)}
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleCreateTask("New Task")}>Add Task</button>
    </div>
  );
};

export default Task;
