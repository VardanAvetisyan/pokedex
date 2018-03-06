import {FETCHING_TYPES_REJECTED, FETCHING_TYPES_FULFILLED, FETCHING_TYPES, TYPE_CHANGED} from "../consts";

export default function reducer (state={
    types: [],
    currentType: 'All',
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case FETCHING_TYPES: {
            return {...state, fetching: true}
        }
        case FETCHING_TYPES_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case FETCHING_TYPES_FULFILLED: {
            return {...state, fetching: false, fetched: true, types: action.payload}
        }
        case TYPE_CHANGED: {
            return {...state, currentType: action.payload}
        }
        default: {
            return {...state}
        }
    }
}