import React, { useState } from "react";
import { taskSchema } from "../../../validation/validation";

const AddTaskForm = ({ onCreate }) => {
  const [newTaskContent, setNewTaskContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      taskSchema.parse({ content: newTaskContent });
      await onCreate(newTaskContent);
      setNewTaskContent("");
    } catch (validationError) {
      setError(validationError.errors[0].message);
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-4">
      <input
        type="text"
        placeholder="New To-Do"
        value={newTaskContent}
        onChange={(e) => setNewTaskContent(e.target.value)}
        className="p-2 border rounded mb-2 w-full text-black text-center"
        required
      />
      <button
        type="submit"
        className="py-1 px-4 rounded w-full bg-black text-white"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
