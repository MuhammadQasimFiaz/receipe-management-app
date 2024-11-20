import React, { useState } from "react";
import { addRecipe } from "../../features/recipe/recipeSlice";
import { useDispatch } from "react-redux";

function AddRecipe() {
  const [input, setInput] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input) {
      dispatch(addRecipe({
        title: input,
        description: inputDescription
      }));
      setInput("");
      setInputDescription('')
    }
  };

  return (
    <>
      <form
        onSubmit={addTodoHandler}
        className="flex flex-col space-y-6 w-full mx-auto p-[72px] bg-gray-800 shadow-lg h-screen"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Add a Recipe
        </h2>

        <input
          type="text"
          className="bg-gray-700 rounded border border-gray-600 text-gray-100 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out placeholder:text-gray-400"
          placeholder="Enter a Recipe title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <textarea
          type="text"
          className="bg-gray-700 rounded border border-gray-600 text-gray-100 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out placeholder:text-gray-400"
          placeholder="Enter a Recipe Description..."
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow hover:bg-indigo-700 transition duration-200 ease-in-out"
        >
          Add Recipe
        </button>
      </form>
    </>
  );
}

export default AddRecipe;
