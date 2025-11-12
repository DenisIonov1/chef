import React from 'react';
import ClaudeRecipe from './ClaudeRecipe';
import IngredientsList from './IngredientsList';
import getRecipeFromAI from '../ai';

export default function() {

    const [ingredients, setIngredients] = React.useState(["rice", "chicken", "veagetable"])
    const [recipe, setRecipe] = React.useState("")

    async function toggleRecipeShown() { 
        try {
            const recipeText = await getRecipeFromAI(ingredients);
            console.log(recipeText)
            setRecipe(recipeText)
        } catch (error) {
            console.error(error.message)
        }
        
    }

    function addIngredient(event) {
        event.preventDefault()
        const elem = event.currentTarget
        let formData = new FormData(elem)
        let newIngredient = formData.get("ingredient")
        
        setIngredients((prev) => [...prev, newIngredient])
    }

    return (
        <main className="main">
        
        <form className="ingredients-form" onSubmit={addIngredient}>
            <label htmlFor="ingredient"></label>
            <input name="ingredient" id="ingredient" type="text" placeholder="e.g. oregano"/>          
            <button>+ Add ingredient</button>
        </form>
        
        {ingredients.length > 0 && 
            <IngredientsList 
                ingredients = {ingredients}
                toggleRecipeShown = {toggleRecipeShown}
            />
        }

         {recipe && <ClaudeRecipe
            recipeMarkdown = {recipe} />
         }
        </main>
    )
}