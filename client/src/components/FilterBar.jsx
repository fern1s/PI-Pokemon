import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, filterPokemonsBy, filterByOrigin, searchPokemon } from "../actions/actions";
import firstLetter from "../utils/toUpperCase";
import "../css_modules/FilterBar.css"

export default function FilterBar({paginate}){
    const dispatch = useDispatch();
    const [pokeName, setpokeName] = useState("");

    

//   useEffect(()=>{
//   dispatch(getTypes(""))
//   },[dispatch]);

//   useEffect(()=>{
//     setpokeName("")
//     },[dispatch]);

    const typesDB = useSelector((state) => state.types)
    //console.log("typesDB", typesDB);
    

    function handleFilterByType(e){
        dispatch(filterPokemonsBy(e.target.value))
        paginate(1)
    }
    function handleFilterByOrigin(e){
        dispatch(filterByOrigin(e.target.value))
        paginate(1)
    }
    
    function handleInputChange(e){
        e.preventDefault();
        setpokeName(e.target.value);
        console.log(pokeName)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchPokemon(pokeName))
    }

    
    return (
        <div className="cont">
            <div className="srch">
                <input 
                className="inpt"
                type = "text" placeholder = "Search Pokemon" 
                onChange={(e) => handleInputChange(e)}
                />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
            <select onChange={e => handleFilterByOrigin(e)} className="sl">
                <option selected disabled hidden>Filter by origin</option>
                <option value="all">All</option>
                <option value="existing">Existing</option>
                <option value="created">Created</option>
            </select>
            <select onChange={e => handleFilterByType(e)}>
            <option value="none" selected disabled hidden>Filter by Type</option>
                {
                    typesDB?.map((el) =>{
                        return (
                            <option value={el.name}> {firstLetter(el.name)} </option>
                        )
                    })
                }
            </select>
        </div>
    )
}