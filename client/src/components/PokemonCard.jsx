import React from 'react';
import {Link} from 'react-router-dom';

export default function PokemonCard(props) {
    let dat = props.props
    if(dat.types.length > 1){
        return (
            <div>
                <Link to={`/pokemon/${dat.id}`}>
                <h2>{dat.name}</h2>
                <img src={dat.image} alt="pokemon" width="100px" height="150px"/>
                <h3>{dat.types[0].name}</h3>
                <h3>{dat.types[1].name}</h3> 
                </Link>
            </div>
        )
    }
   else {
    return (
        <div>
            <Link to={`/pokemon/${dat.id}`}>
            <h2>{dat.name}</h2>
            <img src={dat.image} alt="pokemon" width="100px" height="150px"/>
            <h3>{dat.types[0].name}</h3>
            </Link> 
        </div>
    )
   } 
}