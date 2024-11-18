import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AllRecipes from './pages/AllRecipes'
import AddRecipes from './pages/AddRecipes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/add-recipes" element={<AddRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
