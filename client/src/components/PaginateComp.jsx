import React from "react";
import "../css_modules/PaginateComp.css"

export default function PaginateComp({pokemonsPerPage, allPokemons, paginate}) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

return (
    <div className="greatContainer">
        <ul className="pagContainer">
            {
                pageNumbers?.map(number => {
                    return (
                    <li key={number} className="lista">
                    <a className="ancla" 
                    onClick={() => paginate(number)}> {number} </a>
                    </li>
                )})
            }
        </ul>
    </div>
    
)
}