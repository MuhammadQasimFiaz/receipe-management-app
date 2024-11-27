import React, { useState } from "react";

const AIGeneratedRecipes = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipe = async () => {
    if (!recipeName) {
      setError("Please enter a recipe name.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipeDetails(null);

    try {
      // Search for the recipe using the complexSearch endpoint
      const searchResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=3d7b715770914822b0ee99e4668e4ea2`
      );

      if (!searchResponse.ok) {
        throw new Error("Failed to search for the recipe.");
      }

      const searchData = await searchResponse.json();
      if (searchData.results && searchData.results.length > 0) {
        const recipeId = searchData.results[0].id;

        // Fetch detailed information about the recipe using the getRecipeInformation endpoint
        const recipeResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=3d7b715770914822b0ee99e4668e4ea2`
        );

        if (!recipeResponse.ok) {
          throw new Error("Failed to fetch the recipe details.");
        }

        const recipeData = await recipeResponse.json();
        setRecipeDetails(recipeData);
      } else {
        setError("No recipe found.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[72px] ai-generated-recipes w-full bg-gray-900 pb-10 min-h-screen">
      <h2 className="text-[45px] font-bold text-indigo-400 mb-8 text-center uppercase font-montserrat">
        Get Recipe
      </h2>
      <div className="mb-6 mx-auto w-[50%] ">
        <input
          type="text"
          placeholder="Enter recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white font-montserrat p-3 rounded-lg  w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchRecipe}
          className="bg-indigo-400 font-montserrat text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-blue-700 disabled:bg-gray-300 mt-5"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {recipeDetails && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-xl w-[50%] m-auto px-14 ">
          <h3 className="font-montserrat text-3xl font-bold text-center  mb-10  underline underline-offset-8 decoration-wavy decoration-indigo-400 decoration-4">
            {recipeDetails.title}
          </h3>

          <div className="w-full pt-10 pb-10">
            <img
              src={recipeDetails.image}
              alt={recipeDetails.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>
          <div className="flex">
            <div className=" w-[50%]">
              <h4 className="font-montserrat text-xl font-semibold mb-3">
                Ingredients:
              </h4>
              <ul className="font-montserrat list-disc pl-5 text-gray-700 pb-20">
                {recipeDetails.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            <div className=" flex gap-10 flex-col w-[50%] text-end">
              <div>
                <h4 className="font-montserrat text-xl font-semibold">
                  Servings:
                </h4>
                <p className="font-montserrat text-gray-700">
                  {recipeDetails.servings} servings
                </p>
              </div>
              <div>
                <h4 className="font-montserrat text-xl font-semibold">
                  Ready in:
                </h4>
                <p className="font-montserrat text-gray-700">
                  {recipeDetails.readyInMinutes} minutes
                </p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            {/* Render summary with raw HTML tags */}
            <p
              className="font-montserrat text-gray-700 text-lg text-justify"
              dangerouslySetInnerHTML={{
                __html: recipeDetails.summary,
              }}
            />
          </div>
          <div className="mb-6">
            <h4 className="font-montserrat text-xl font-semibold mb-3">
              Instructions:
            </h4>
            <ol className="font-montserrat list-decimal pl-5 text-gray-700">
              {recipeDetails.analyzedInstructions[0]?.steps.map(
                (step, index) => (
                  <li key={index}>{step.step}</li>
                )
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGeneratedRecipes;
