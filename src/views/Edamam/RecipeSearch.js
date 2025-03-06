import { useState } from "react";

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);
    setError("");
    setRecipes([]);

    const appId = process.env.REACT_APP_EDAMAM_APP_ID;
    const appKey = process.env.REACT_APP_EDAMAM_APP_KEY;
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
      console.log("appId"+url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.hits.length === 0) {
        setError("No recipes found. Try a different keyword.");
      }

      setRecipes(data.hits);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error("Error fetching recipes:", err);
    }

    setLoading(false);
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchRecipes();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Search for Recipes</h2>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter ingredient or dish..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress} // ✅ Handle Enter key
          className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchRecipes}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Recipe Results */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recipes.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="font-bold text-lg">{item.recipe.label}</h3>
            <img
              src={item.recipe.image}
              alt={item.recipe.label}
              className="w-full h-40 object-cover mt-2 rounded-md"
            />
            <a
              href={item.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 mt-2 hover:underline font-semibold"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
