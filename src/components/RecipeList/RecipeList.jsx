import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, updateRecipe } from "../../features/recipe/recipeSlice";

function RecipeList() {
  const recipes = useSelector((state) => state.recipes || []);
  const dispatch = useDispatch();
  // console.log("recipes", recipes);
  const [editRecipeId, setEditRecipeId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateRecipe({
      id: editRecipeId,
      title: editTitle,
      description: editDescription
    }))
    // Exit update mode
    setEditRecipeId(null);
    setEditTitle("");
    setEditDescription("");
  }

  return (
    <>
      <div className="bg-gray-900 px-6 pt-[72px] shadow-lg w-full mx-auto min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8 text-center uppercase">
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
                    Ingredients:
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 rounded border border-gray-600 text-gray-100 py-2 px-3 focus:ring-2 focus:ring-indigo-500"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
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
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Ingredients
                </h4>
                <p className="text-base text-gray-400">{recipe.description}</p>
              </div>
              <button
                className="mt-auto text-sm text-indigo-500 hover:underline self-end"
                onClick={() => {
                  setEditRecipeId(recipe.id)
                  setEditTitle(recipe.title)
                  setEditDescription(recipe.description)
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
            ) }
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecipeList;
