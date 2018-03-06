import {
    ACTIVE_PAGE_CHANGED, FETCHING_POKEMONS, FETCHING_POKEMONS_FULFILLED, FETCHING_POKEMONS_REJECTED,
    PER_PAGE_CHANGED
} from "../consts";
import axios from "axios/index";


export function changePerPage(perPage) {
    let newArray = [];
    for (let i = 1, len = 949 / perPage; i <= len; i++){
        newArray[i-1] = i
    }

    return function (dispatch) {
        dispatch({type: PER_PAGE_CHANGED, payload:perPage, newArray: newArray})
    }
}


export function fetchPagePokemons(limit=10, offset=0) {
    let pokemon, finalPokemon = [];
    return function (dispatch) {
        dispatch({type: FETCHING_POKEMONS});
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit='+limit+'&offset='+offset)
            .then((response) => {
                pokemon = response.data.results;
                finalPokemon = pokemon.map((pkmn) => {
                    return getPokemon(pkmn.url)
                });
                axios.all(finalPokemon)
                    .then((results) => {
                        let temp = results.map(r => r.data);
                        dispatch({type:FETCHING_POKEMONS_FULFILLED, payload: temp})
                    })

                    .catch((error) => {
                        dispatch({type: FETCHING_POKEMONS_REJECTED, payload: error})
                    });
            })

    }
}

export function activePageChanged(number) {
    return function (dispatch) {
        dispatch({type: ACTIVE_PAGE_CHANGED, payload:number})
    }
}

export function fetchPageChangedPokemons(limit=10, offset=0) {
    let pokemon, finalPokemon = [];
    return function (dispatch) {
        dispatch({type: FETCHING_POKEMONS});
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit='+limit+'&offset='+offset)
            .then((response) => {
                pokemon = response.data.results;
                finalPokemon = pokemon.map((pkmn) => {
                    return getPokemon(pkmn.url)
                });
                axios.all(finalPokemon)
                    .then((results) => {
                        let temp = results.map(r => r.data);
                        dispatch({type:FETCHING_POKEMONS_FULFILLED, payload: temp})
                    })

                    .catch((error) => {
                        dispatch({type: FETCHING_POKEMONS_REJECTED, payload: error})
                    });
            })

    }
}

function getPokemon (url) {
    return axios.get(url)
}

// export function changePerPage(perPage=10, activePage=1) {
//
//     let offsetToSend = (activePage - 1) * perPage;
//     return fetchPokemons(perPage, offsetToSend)
// }


