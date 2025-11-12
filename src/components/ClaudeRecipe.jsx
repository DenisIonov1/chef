import ReactMarkdown from "react-markdown"

export default function({recipeMarkdown}){
    return <section className="suggested-recipe-container">
        <ReactMarkdown>{recipeMarkdown}</ReactMarkdown>
    </section>
}