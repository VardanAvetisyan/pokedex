import { combineReducers } from 'redux'

import pokemons from './pokemonsReducer'
import pages from './pagesReducer'
import types from './typesReducer'

export default combineReducers({
    pokemons,
    pages,
    types
})