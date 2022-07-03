import filterByType from "../utils/utils"

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
                pokemons: [...state.pokemons, action.payload]
            };
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }
        case "FILTER_POKEMONS_BY":
            const allPokemons = state.allPokemons;
            const filtered = action.payload === "all" ? allPokemons : filterByType(allPokemons, action.payload);
            return {
                ...state,
                pokemons: filtered
            }
        default:
            return state;
    }
}
export default rootReducer;