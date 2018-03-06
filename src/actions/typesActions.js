import axios from 'axios'
import {
    FETCHING_POKEMONS, FETCHING_POKEMONS_FULFILLED, FETCHING_POKEMONS_REJECTED, FETCHING_TYPES,
    FETCHING_TYPES_FULFILLED,
    FETCHING_TYPES_REJECTED, TYPE_CHANGED
} from "../consts";
import {fetchPokemons} from "./pokemonsActions";

export function fetchTypes() {
    return function (dispatch) {
        dispatch({type: FETCHING_TYPES});
        axios.get('https://pokeapi.co/api/v2/type/')

            .then((response) => {
                dispatch({type: FETCHING_TYPES_FULFILLED, payload: response.data.results})
            })
            .catch((error) => {
                dispatch({type: FETCHING_TYPES_REJECTED, payload: error})
            });


    }
}

export function fetchTypePokemons(url) {
    let pokemon, finalPokemon = [];
    if (url === 'All') {
        fetchPokemons()
    } else {
        return function (dispatch) {
            dispatch({type: FETCHING_POKEMONS});
            axios.get(url, {
                params: { limit: 3 }
            })
                .then((response) => {
                    dispatch({type: TYPE_CHANGED, payload: response.data.name})
                    pokemon = response.data.pokemon.slice(0,5);
                    finalPokemon = pokemon.map((pkmn) => {
                        return getPokemon(pkmn.pokemon.url)
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
                .catch((error) => {
                    dispatch({type: FETCHING_POKEMONS_REJECTED, payload: error})
                });

        }
    }
}

function getPokemon(url) {
    return axios.get(url)
}