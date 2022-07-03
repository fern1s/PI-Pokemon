import React, { useEffect }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, filterPokemonsBy } from "../actions/actions";

export default function FilterBar(){
    const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(getTypes(""))
  },[]);

    const typesDB = useSelector((state) => state.types)
    console.log("typesDB", typesDB);
    //typesDB.unshift({id: 0, name: "all"}); //esto devuelve la longitud xd

    function handleFilter(e){
        dispatch(filterPokemonsBy(e.target.value))
    }
    
    return (
        <div>
            <select onChange={e => handleFilter(e)}>
            <option value="none" selected disabled hidden>Select a Type</option>
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