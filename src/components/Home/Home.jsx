import React, { useMemo } from "react";
import banner from "../../assets/images/banner2.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const backgroundStyle = useMemo(() => {
    return { backgroundImage: `url(${banner})` };
  }, []);
  return (
    <div
      className="relative bg-cover bg-center h-[100vh] w-full flex items-center"
      style={backgroundStyle}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 flex font-montserrat justify-between w-full px-20">
        <button
          className="bg-transparent border border-white text-white px-4 py-2 rounded transition duration-300 hover:bg-white hover:text-black"
          onClick={() => navigate("/recipeList")}
        >
          View Recipe
        </button>
        <button
          className="bg-transparent border border-white text-white px-4 py-2 rounded transition duration-300 hover:bg-white hover:text-black"
          onClick={() => navigate("/addRecipe")}
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
}

export default Home;
