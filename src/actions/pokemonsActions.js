import axios from 'axios'
import {FETCHING_POKEMONS_FULFILLED, FETCHING_POKEMONS_REJECTED, FETCHING_POKEMONS} from "../consts";

export function fetchPokemons(limit = 5, offset = 0) {
    let pokemon, finalPokemon = [];
    return function (dispatch) {
        dispatch({type: FETCHING_POKEMONS});
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offset)
            .then((response) => {
                pokemon = response.data.results;
                finalPokemon = pokemon.map((pkmn) => {
                    return getPokemon(pkmn.url)
                });
                axios.all(finalPokemon)
                    .then((results) => {
                        let temp = results.map(r => r.data);
                        dispatch({type: FETCHING_POKEMONS_FULFILLED, payload: temp})
                    })
                    .catch((error) => {
                        dispatch({type: FETCHING_POKEMONS_REJECTED, payload: error})
                    });
            })

    }
}

function getPokemon(url) {
    return axios.get(url)
}

