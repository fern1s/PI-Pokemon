import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../actions/actions";
import NavBar from "./NavBar";
import validateInput from "../utils/ValidateInput";


export default function CreatePokemon(){
    const dispatch = useDispatch();
    const history = useHistory()
    const types = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: "", 
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types:[]
    });

    const [err, setErr] = useState({name:"Please enter a name"}) 

    useEffect(()=>{
        dispatch(getTypes("true"))
        },[dispatch]); //por las dudas

    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErr(validateInput({...input, [e.target.name]: e.target.value}))
        console.log(err)
    }

    function handleSelect(e){
        setInput({
            ...input,
            [e.target.name]: [...input.types, {name:e.target.value}]
        })
        setErr(validateInput({...input, [e.target.name]: e.target.value}))
        //console.log("input", input)
    }

    function deleteOnClick(e){
        setInput({
            ...input,
            types: input.types.filter((t) => t !== e)
        })
        setErr(validateInput({...input, types: input.types.filter((t) => t !== e)}))
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("submiting", input)
        dispatch(postPokemon(input))
        alert("Pokemon created")
        setInput({
        name: "", 
        hp: 0,
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types:[]
        })
        history.push("/home")
    }

    return (
        <div>
            <NavBar />
            <h2>Create a Pokemon!</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange={(e) => handleInputChange(e)}
                    />
                    {err.name && (
                        <p>{err.name}</p>
                    )}
                </div>
                <div>
                    <label>Life Points:</label>
                    <input 
                    type = "number"
                    value = {input.hp}
                    name = "hp"
                    onChange={(e) => handleInputChange(e)}
                    />
                    {err.hp && (
                        <p>{err.hp}</p>
                    )}
                </div>
                <div>
                <label>Attack:</label>
                    <input 
                    type = "number"
                    value = {input.attack}
                    name = "attack"
                    onChange={(e) => handleInputChange(e)}
                    />  
                     {err.attack && (
                        <p>{err.attack}</p>
                    )}
                </div>
                <div>
                <label>Defense:</label>
                    <input 
                    type = "number"
                    value = {input.defense}
                    name = "defense"
                    onChange={(e) => handleInputChange(e)}
                    />  
                </div>
                {err.defense && (
                        <p>{err.defense}</p>
                    )}
                <div>
                <label>Speed:</label>
                    <input 
                    type = "number"
                    value = {input.speed}
                    name = "speed"
                    onChange={(e) => handleInputChange(e)}
                    /> 
                    {err.speed && (
                        <p>{err.speed}</p>
                    )} 
                </div>
                <div>
                <label>Height:</label>
                    <input 
                    type = "number"
                    value = {input.height}
                    name = "height"
                    onChange={(e) => handleInputChange(e)}
                    />  
                    {err.height && (
                        <p>{err.height}</p>
                    )}
                </div>
                <div>
                <label>Weight:</label>
                    <input 
                    type = "number"
                    value = {input.weight}
                    name = "weight"
                    onChange={(e) => handleInputChange(e)}
                    /> 
                    {err.weight && (
                        <p>{err.weight}</p>
                    )} 
                </div> 

                <div>
                    {
                        input.types.length < 2 ?(
                            <select name = "types" onChange={e => handleSelect(e)}>
                            <option value="none" selected disabled hidden>Select Type(s)</option>
                                {
                                    types?.map((el) =>{
                                        return (
                                            <option value={el.name}> {el.name} </option>
                                        )
                                    })
                                }
                            </select>
                                    )
                                    : (<p>Only two types are allowed</p>)
                                }
                

            {err.types && (
                        <p>{err.types}</p>
                    )}
                
                <div>
                {
                    input.types?.map((el) =>{
                        return(
                            <button type="button"
                            value={el.name} onClick={() => deleteOnClick(el)}>{el.name}</button> 
                        )
                    })
                }
                </div>    
            
            </div>
            { 
                Object.keys(err).length < 1 ? (
                <button
                style={{color:"green"}}
                type="submit">Create Pokemon!</button>
                )
                : (<p>Not ready</p>)
            }
            
            </form>
            
        </div>
    )

}