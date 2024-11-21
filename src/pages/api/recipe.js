// pages/api/recipe.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const apiResponse = await fetch(
      `http://api.recipepuppy.com/api/?q=${query}`
    );
    const data = await apiResponse.json();

    if (data.results && data.results.length > 0) {
      res.status(200).json(data.results);
    } else {
      res.status(404).json({ error: "No recipes found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Recipe Puppy" });
  }
}
