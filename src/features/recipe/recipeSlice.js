import { createSlice, nanoid } from '@reduxjs/toolkit'

const loadFromLocalStorage = ()=> {
  try {
    const savedRecipes = localStorage.getItem("recipes")
    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes)
      if (Array.isArray(parsedRecipes)) {
        return parsedRecipes
      }
    }
  } catch (e) {
    console.error("Failed to load recipes from localStorage:", e)
  }
  return []
}

const initialState = {
  recipes: loadFromLocalStorage()
}

export const counterSlice = createSlice({
  name: 'recipeAdd',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const { title, description } = action.payload
      const recipe = {
        id: nanoid(),
        title: title,
        description: description, 
      }
      state.recipes.push(recipe)
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter( (recipe) => recipe.id !== action.payload )
    },
    updateRecipe: (state, action) => {
      const {id, title, description} = action.payload
      const recipe = state.recipes.find(recipe => recipe.id === id)
      if(recipe) {
        if(title) recipe.title = title
        if(description) recipe.description = description
      }
    }
  },
})

export const { addRecipe, deleteRecipe, updateRecipe } = counterSlice.actions

export default counterSlice.reducer