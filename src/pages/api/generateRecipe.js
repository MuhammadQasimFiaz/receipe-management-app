export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recipeName } = req.body;

  if (!recipeName) {
    return res.status(400).json({ error: "Recipe name is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Provide a detailed recipe for ${recipeName}. Include ingredients and step-by-step instructions.`,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch the recipe." });
    }

    const data = await response.json();
    res
      .status(200)
      .json({ recipe: data.choices[0]?.text.trim() || "No recipe found." });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
}
