import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import NavBar from "./NavBar";
import PokemonCard from "./PokemonCard";
import PaginateComp from "./PaginateComp";
import FilterBar from "./FilterBar";
import { getPokemons, orderBy, getTypes } from "../actions/actions"
import "../css_modules/Home.css"


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
   
    const [orden, setOrden] = useState("")
   
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
        dispatch(getTypes("true"))
        })

   useEffect(()=>{
    dispatch(getPokemons(""))
   }, [dispatch])
   
   
   function handleClick(e){
    e.preventDefault();
    dispatch(getPokemons(""));
   }

   function handleSort(e){
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}
   
    return (
    <div className="homeContainer">
        <NavBar />
        
        <button className="refresh" onClick={e=>{handleClick(e)}}>
            Refresh Pokemons
        </button>

        <FilterBar paginate={paginate}/>
        <select onClick={e=>{handleSort(e)}} className="slct">
            <option selected disabled hidden>Sort by</option>
            <option value="az">A-z</option>
            <option value="za">Z-a</option>
            <option value="hat">Highest Attack</option>
            <option value="lat">Lowest Attack</option>
        </select>

        <PaginateComp 
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paginate = {paginate}
        />
        <div className="pokemonContainer">
        { 
           currentPokemons.length > 0 ? currentPokemons.map( (el) =>{
            
            return(
                
                <PokemonCard props={el}/>
                
            )   
            })
            : <h2 className="notFound"> Pokemons not found</h2>
        }
        </div>
    

    </div>
    )
}