import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import AllRecipes from "./pages/AllRecipes.jsx";
import AddRecipes from "./pages/AddRecipes";
import RecipeList from "./components/RecipeList/RecipeList.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import AddRecipe from "./components/AddRecipe/AddRecipe.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AIGeneratedRecipes from "./components/AI/AIGeneratedRecipes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="recipes" element={<AllRecipes />} />
      <Route path="add-recipe" element={<AddRecipes />} />
      <Route path="recipeList" element={<RecipeList />} />
      <Route path="get-recipe" element={<AIGeneratedRecipes />} />
      <Route path="addRecipe" element={<AddRecipe />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
