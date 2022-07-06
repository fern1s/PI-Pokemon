import filterByType from "../utils/FilterByTypeFunc"
import sortByProp from "../utils/SortByProp";

const initialState = {
	pokemons: [],
    allPokemons: [],
	pokemonDetail: {},
    types: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        case "POKEMON_DETAIL":
            return {
                ...state,
                pokemonDetail: action.payload
            };
        case "POST_POKEMON":
            return {
                ...state,
            };
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }
        case "FILTER_POKEMONS_BY_TYPE":
            const allPokemons = state.allPokemons;
            const filteredByType = action.payload === "all" ? allPokemons : filterByType(allPokemons, action.payload);
            return {
                ...state,
                pokemons: filteredByType
            }
        case "FILTER_BY_ORIGIN":
            const allPokes = state.allPokemons;
            const filteredByOrigin = action.payload === "created" ? allPokes.filter(el => el.id >= 3000) 
                : action.payload === "existing"? allPokes.filter(el => el.id < 3000)
                : allPokes
            return {
                ...state,
                pokemons: filteredByOrigin
            }
        case "ORDER_BY":
            const sortedBy = sortByProp(state.allPokemons, action.payload);
            return {
                ...state,
                pokemons: sortedBy
            }
        case "SEARCH_POKEMON":
            return{
                ...state,
                pokemons: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;