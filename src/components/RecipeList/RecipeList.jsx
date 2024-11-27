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
  const [editImage, setEditImage] = useState(null)
  const [editServing, setEditServing] = useState('')
  const [editReadyIn, setEditReadyIn] = useState('')
  const [editInstructions, setEditInstructions] = useState('')
  const [editIngredients, setEditIngredients] = useState('')

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

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
        ingredients: editIngredients
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
        <h1 className="text-[45px] font-bold text-indigo-400 mb-8 text-center uppercase font-montserrat">
          Recipes
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <input
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
                      type="text"
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
                      type="text"
                      className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                      value={editReadyIn}
                      onChange={(e) => setEditReadyIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold">
                      Instructions:
                    </label>
                    <input
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
                    <input
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
                    className="mt-auto text-sm text-indigo-500 hover:underline self-end"
                    onClick={() => {
                      setEditRecipeId(recipe.id);
                      setEditTitle(recipe.title);
                      setEditDescription(recipe.description);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="mt-auto text-sm text-indigo-500 hover:underline self-end"
                    onClick={() => dispatch(deleteRecipe(recipe.id))}
                  >
                    Delete
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
