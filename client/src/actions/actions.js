import axios from "axios";

export function getPokemons(name) {
	return async function (dispatch) {
		const res = await axios.get(
			`http://localhost:3001/pokemons?name=${name}`,{}
		);

		return dispatch({type: 'GET_POKEMONS', payload: res.data});
	};
}

export function pokemonDetail(id) {
	return async function (dispatch) {
		const res = await axios.get(`http://localhost:3001/pokemons/${id}`);

		dispatch({type: 'POKEMON_DETAIL', payload: res.data});
	};
}

export function postPokemon(pokemon) {
	return async function (dispatch) {
		const res = await axios.post(`http://localhost:3001/pokemons`, pokemon);
		dispatch({type: 'POST_POKEMON', payload: res.data});
	};
}

export function getTypes(flag) {
	return async function (dispatch) {
		const res = await axios.get(`http://localhost:3001/types?flag=${flag}`);
		dispatch({type: 'GET_TYPES', payload: res.data});
	};
}

export function filterPokemonsBy(payload) {
	//console.log("filtrando", payload);
	return {
		type: "FILTER_POKEMONS_BY_TYPE",
		payload
	}
}

export function filterByOrigin(origin){
	return {
		type: "FILTER_BY_ORIGIN",
		payload: origin
	}
}

export function orderBy(payload){
	return{
		type: "ORDER_BY",
		payload	
	}
}

export function searchPokemon(payload){
	return async function(dispatch){
		const res = await axios.get(`http://localhost:3001/pokemons?name=${payload}`);
		return dispatch({type: "SEARCH_POKEMON", payload: res.data});
	}
}

export function emptyDetails(){
	return {
		type: "EMPTY_DETAILS"
	}
}