import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import NavBar from "./NavBar";
import PokemonCard from "./PokemonCard";
import PaginateComp from "./PaginateComp";
import FilterBar from "./FilterBar";
import { getPokemons } from "../actions/actions"


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

   useEffect(()=>{
    dispatch(getPokemons(""))
   }, [dispatch])
   
   function handleClick(e){
    e.preventDefault();
    dispatch(getPokemons(""));
   }
   
    return (
    <div>
        <NavBar />
        <button onClick={e=>{handleClick(e)}}>
            Volver a cargar los Pokemones
        </button>

        <FilterBar />

        <PaginateComp 
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paginate = {paginate}
        />
        { 
           currentPokemons.length > 0 ? currentPokemons.map( (el) =>{
            
            return(
                <fragment>
                <PokemonCard props={el}/>
                </fragment>
            )   
            })
            : <h2> Pokemons not found</h2>
        }

    </div>
    )
}