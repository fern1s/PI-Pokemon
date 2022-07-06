import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, filterPokemonsBy, filterByOrigin, searchPokemon } from "../actions/actions";

export default function FilterBar(){
    const dispatch = useDispatch();
    const [pokeName, setpokeName] = useState("");

    

  useEffect(()=>{
  dispatch(getTypes(""))
  },[dispatch]);

    const typesDB = useSelector((state) => state.types)
    //console.log("typesDB", typesDB);
    

    function handleFilterByType(e){
        dispatch(filterPokemonsBy(e.target.value))
    }
    function handleFilterByOrigin(e){
        dispatch(filterByOrigin(e.target.value))
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
        <div>
            <div>
                <input 
                type = "text" placeholder = "Buscar Pokemon" 
                onChange={(e) => handleInputChange(e)}
                />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
            <select onChange={e => handleFilterByOrigin(e)}>
                <option selected disabled hidden>Filter by origin</option>
                <option value="all">all</option>
                <option value="existing">existing</option>
                <option value="created">created</option>
            </select>
            <select onChange={e => handleFilterByType(e)}>
            <option value="none" selected disabled hidden>Filter by Type</option>
                {
                    typesDB?.map((el) =>{
                        return (
                            <option value={el.name}> {el.name} </option>
                        )
                    })
                }
            </select>
        </div>
    )
}