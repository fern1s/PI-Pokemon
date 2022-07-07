import React from 'react';
import {Link} from 'react-router-dom';
import firstLetter from '../utils/toUpperCase';
import "../css_modules/PokemonCard.css"

export default function PokemonCard(props) {
    let dat = props.props
    if(dat.types.length > 1){
        return (//width="110px" height="160px"
            <div className='pokeCardContainer'>
                <Link to={`/pokemon/${dat.id}`} className="prueba">
                <h2>{firstLetter(dat.name)}</h2>
                <img src={dat.image} alt="pokemon" className='imagen' />
                <h3>{dat.types[0].name}</h3>
                <h3>{dat.types[1].name}</h3> 
                </Link>
            </div>
        )
    }
   else {
    return (
        <div className='pokeCardContainer'>
            <Link to={`/pokemon/${dat.id}`} className="prueba">
            <h2>{firstLetter(dat.name)}</h2>
            <img src={dat.image} alt="pokemon" className='imagen' />
            <h3>{dat.types[0].name}</h3>
            </Link> 
        </div>
    )
   } 
}