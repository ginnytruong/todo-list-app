import React, { useState } from "react";

const AddTodoListForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setIsPosting(true);
    onAdd(title)
      .then(() => {
        setTitle("");
      })
      .catch((error) => {
        console.error("Error creating todo list:", error);
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-4">
        <input
          type="text"
          placeholder="New List"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`p-2 border rounded mb-2 w-full text-black text-center${
            hasError ? "border-red-500" : ""
          }`}
          required
        />
        <button
          type="submit"
          className={`py-1 px-4 rounded w-full ${
            isPosting ? "bg-gray-500" : "bg-black"
          } text-white`}
          disabled={isPosting}
        >
          {isPosting ? "Adding..." : "Add"}
        </button>
        {hasError && (
          <p className="mt-2 text-center text-red-500">Name your to-do list</p>
        )}
      </form>
    </div>
  );
};

export default AddTodoListForm;
