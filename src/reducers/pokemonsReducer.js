import {FETCHING_POKEMONS} from "../consts";
import {FETCHING_POKEMONS_REJECTED} from "../consts";
import {FETCHING_POKEMONS_FULFILLED} from "../consts";

export default function reducer (state={
    pokemons: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case FETCHING_POKEMONS: {
            return {...state, fetching: true}
        }
        case FETCHING_POKEMONS_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case FETCHING_POKEMONS_FULFILLED: {
            return {...state, fetching: false, fetched: true, pokemons: action.payload}
        }
        default: {
            return {...state}
        }
    }
}