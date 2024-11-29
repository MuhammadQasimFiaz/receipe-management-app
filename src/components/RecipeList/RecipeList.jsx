import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, updateRecipe } from "../../features/recipe/recipeSlice";

function RecipeList() {
  const recipes = useSelector((state) => state.recipes || []);
  const dispatch = useDispatch();
  // console.log("recipes", recipes);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editServing, setEditServing] = useState(0);
  const [editReadyIn, setEditReadyIn] = useState(0);
  const [editInstructions, setEditInstructions] = useState("");
  const [editIngredients, setEditIngredients] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateRecipe({
        id: editRecipeId,
        title: editTitle,
        description: editDescription,
        imageUrl: editImage,
        servings: editServing,
        readyIn: editReadyIn,
        instructions: editInstructions,
        ingredients: editIngredients,
      })
    );
    // Exit update mode
    setEditRecipeId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditImage(imageUrl);
    }
  };

  return (
    <>
      <div className="bg-gray-900 px-6 pt-[72px] shadow-lg w-full mx-auto min-h-screen">
        <h1 className="text-[45px] font-bold text-[#a16925] mb-8 text-center uppercase font-montserrat">
          Recipes
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <li
              className="flex flex-col bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition duration-200"
              key={recipe.id}
            >
              {editRecipeId === recipe.id ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Image:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editImage}
                      onChange={handleImageChange}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Summary:
                    </label>
                    <textarea
                      type="text"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Servings:
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editServing}
                      onChange={(e) => setEditServing(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Ready in minutes:
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editReadyIn}
                      onChange={(e) => setEditReadyIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Instructions:
                    </label>
                    <textarea
                      type="text"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editInstructions}
                      onChange={(e) => setEditInstructions(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Ingredients:
                    </label>
                    <textarea
                      type="text"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editIngredients}
                      onChange={(e) => setEditIngredients(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">Title</h3>
                    <p className="text-lg text-gray-300">{recipe.title}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Image</h3>
                    <img src={recipe.imageUrl} alt="recipe image" />
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      Summary
                    </h4>
                    <p className="text-base text-gray-400">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Servings
                    </h3>
                    <p className="text-lg text-gray-300">{recipe.servings}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Ready in Minutes
                    </h3>
                    <p className="text-lg text-gray-300">{recipe.readyIn}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Ingredients
                    </h3>
                    {Array.isArray(recipe.ingredients) ? (
                      <ul className="text-lg text-gray-300 list-disc list-inside">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg text-gray-300">
                        {recipe.ingredients}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Instructions
                    </h3>
                    {Array.isArray(recipe.instructions) ? (
                      <ol className="text-lg text-gray-300 list-decimal list-inside">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-lg text-gray-300">
                        {recipe.instructions}
                      </p>
                    )}
                  </div>

                  <button
                    className="mt-auto text-sm my-4 font-semibold text-white bg-[#a16925] px-4 py-2 rounded-lg shadow  hover:scale-105 transition duration-200 ease-in-out flex items-center justify-center"
                    onClick={() => {
                      setEditRecipeId(recipe.id);
                      setEditTitle(recipe.title);
                      setEditDescription(recipe.description);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M5 13.5V17h3.5l8.485-8.485a3 3 0 00-4.243-4.243L5 13.5zm11.707-10.707a4 4 0 10-5.657 5.657l-1.415 1.414a1 1 0 00-.293.707V15a1 1 0 001 1h2.829a1 1 0 00.707-.293l1.414-1.414a4 4 0 005.657-5.657l-1.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Update Recipe
                  </button>

                  <button
                    className="text-sm font-semibold text-white bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition duration-200 ease-in-out flex items-center justify-center"
                    onClick={() => dispatch(deleteRecipe(recipe.id))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 4a1 1 0 00-1 1v1h10V5a1 1 0 00-1-1H6zM4 7h12v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete Recipe
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecipeList;
