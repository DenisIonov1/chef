async function query(data) {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "model": "kwaipilot/kat-coder-pro:free",
          ...data,
        }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    const result = await response.json();
    return result;
  }

export default async function getRecipe(ingredients) {
    console.log("func getrecipe")
    const systemPrompt = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`    

    const ingredientsString = ingredients.join(", ")

    const data = {

      messages: [
        {role: "system", content: systemPrompt}, 
        {role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`}
      ], 
    };

    const response = await query(data);
    if (!response.choices?.[0]?.message?.content) {
      console.error("Invalid response from OpenRouter:", response);
      throw new Error("Unable to extract recipe from response.");
    }
    return response.choices[0].message.content;
}

