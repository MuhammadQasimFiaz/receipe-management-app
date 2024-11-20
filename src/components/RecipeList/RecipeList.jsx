import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../features/recipe/recipeSlice";

function RecipeList() {
  const recipes = useSelector((state) => state.recipes || []);
  const dispatch = useDispatch();
  console.log("recipes", recipes);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8 text-center uppercase">
          Recipes
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <li
              className="flex flex-col bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition duration-200"
              key={recipe.id}
            >
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
                onClick={() => dispatch(deleteRecipe(recipe.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecipeList;
