import React from "react";
import { FaTrash } from "react-icons/fa";

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(!task.completed)}
          className="mr-2"
        />
        <span
          className={`text-gray-700`}
        >
          {task.content}
        </span>
      </div>
      <button onClick={onDelete} className="text-red-500">
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;
