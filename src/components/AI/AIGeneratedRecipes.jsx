import React, { useState } from "react";

const AIGeneratedRecipes = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipe = async () => {
    if (!recipeName) {
      setError("Please enter a recipe name.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe("");

    try {
      const response = await fetch("/api/generateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the recipe.");
      }

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-generated-recipes">
      <h2 className="text-xl font-bold mb-4">AI-Generated Recipes</h2>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Enter recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={fetchRecipe}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {recipe && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold">Recipe:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default AIGeneratedRecipes;
