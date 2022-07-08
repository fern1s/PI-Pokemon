import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pokemonDetail, emptyDetails } from "../actions/actions";
import NavBar from "./NavBar";
import firstLetter from "../utils/toUpperCase";
import "../css_modules/PokeDetail.css"


export default function PokemonDetails(){
    const dispatch = useDispatch();
    const algo = useParams()
    console.log("params:", algo)
    const id = algo.id;

    const data = useSelector((state) => state.pokemonDetail)
    

useEffect(()=>{
    dispatch(pokemonDetail(id))
    return () => dispatch(emptyDetails()) //esto solo se ejecuta cuando el comp se desmonta, por el return!
}, [dispatch, id])
console.log("data.name", data.name)

 //estilar los h4 como cajitas
    return(
        <div className="yesNav">
            <NavBar />
            <div className="noNavd">
                <h2>{firstLetter(data.name)}</h2>
                <h3>Pokemon N°: {data.id}</h3>
                <img src={data.image} alt="pokemon" width="200px" height="250px"/>
                <div className="datos">
                    <div className="tiposCont">
                        <h3>Types:</h3> 
                            <div className="tipos">
                        {
                            data.types?.map((el)=>{
                                return (
                                    <h4>{firstLetter(el.name)}</h4>
                                )
                            })
                        }
                        </div>
                    </div>
                <h3>Hp: {data.hp}</h3>
                <h3>Attack: {data.attack}</h3>
                <h3>Defense: {data.defense}</h3>
                <h3>Speed: {data.speed}</h3>
                <h3>Height: {data.height}</h3>
                <h3>Weight: {data.weight}</h3>
                </div>
                

            </div>
        </div>
         )



}