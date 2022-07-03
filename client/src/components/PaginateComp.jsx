import React from "react";

export default function PaginateComp({pokemonsPerPage, allPokemons, paginate}) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

return (
    <nav>
        <ul>
            {
                pageNumbers?.map(number => {
                    return (
                    <li key={number}>
                    <a onClick={() => paginate(number)}> {number} </a>
                    </li>
                )})
            }
        </ul>
    </nav>
)
}