import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pokemonDetail } from "../actions/actions";
import NavBar from "./NavBar";
import firstLetter from "../utils/toUpperCase";


export default function PokemonDetails(){
    const dispatch = useDispatch();
    const algo = useParams()
    console.log("params:", algo)
    const id = algo.id;

    const data = useSelector((state) => state.pokemonDetail)
    

useEffect(()=>{
    dispatch(pokemonDetail(id))
}, [dispatch, id])
console.log("data.name", data.name)

 //estilar los h4 como cajitas
    return(
        <div>
            <NavBar />
            <div>
                <h2>{firstLetter(data.name)}</h2>
                <h3>Pokemon N°: {data.id}</h3>
                <img src={data.image} alt="pokemon" width="200px" height="250px"/>
                    <div>
                        <h3>Types:</h3> 
                        {
                            data.types?.map((el)=>{
                                return (
                                    <h4 style={{color:"green"}}>{el.name}</h4>
                                )
                            })
                        }
                    </div>
                <h3>Hp: {data.hp}</h3>
                <h3>Attack: {data.attack}</h3>
                <h3>Defense: {data.defense}</h3>
                <h3>Speed: {data.speed}</h3>
                <h3>Height: {data.height}</h3>
                <h3>Weight: {data.weight}</h3>
                

            </div>
        </div>
         )



}