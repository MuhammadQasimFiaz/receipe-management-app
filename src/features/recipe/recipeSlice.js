import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes);
      if (Array.isArray(parsedRecipes)) {
        return parsedRecipes;
      }
    }
  } catch (e) {
    console.error("Failed to load recipes from localStorage:", e);
  }
  return [];
};

const initialState = {
  recipes: loadFromLocalStorage(),
};

export const counterSlice = createSlice({
  name: "recipeAdd",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const {
        title,
        description,
        imageUrl,
        servings,
        readyIn,
        instructions,
        ingredients,
      } = action.payload;
      const recipe = {
        id: nanoid(),
        title: title,
        description: description,
        imageUrl: imageUrl,
        servings: servings,
        readyIn: readyIn,
        instructions: instructions,
        ingredients: ingredients,
      };
      state.recipes.push(recipe);
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    updateRecipe: (state, action) => {
      const { id, title, description, imageUrl, servings, readyIn, instructions, ingredients } = action.payload;
      const recipe = state.recipes.find((recipe) => recipe.id === id);
      if (recipe) {
        if (title) recipe.title = title;
        if (description) recipe.description = description;
        if (imageUrl) recipe.imageUrl = imageUrl
        if (servings) recipe.servings = servings
        if (readyIn) recipe.readyIn = readyIn
        if (instructions) recipe.instructions = instructions
        if (ingredients) recipe.ingredients = ingredients
      }
    },
  },
});

export const { addRecipe, deleteRecipe, updateRecipe } = counterSlice.actions;

export default counterSlice.reducer;
