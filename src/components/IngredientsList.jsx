export default function(props){

    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    
    return (
        <section>
                <h2>Ingredients on hand:</h2>
                <ul className="list-of-items">{ingredientsListItems}</ul>
                {ingredientsListItems.length >= 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.toggleRecipeShown}>Get a recipe</button>
                </div>}
            </section>
    )
}