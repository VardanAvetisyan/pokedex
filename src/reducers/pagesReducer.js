import {PER_PAGE_CHANGED, ACTIVE_PAGE_CHANGED} from "../consts";
let newArray = [], defaultPerPage = 5;
for (let i = 1, length = defaultPerPage; i<= Math.ceil(949/length); i++){
    newArray[i-1] = i
}
export default function reducer(state = {
    perPage: defaultPerPage,
    activePage: 1,
    pagesArray: newArray
}, action) {
    switch (action.type) {
        case PER_PAGE_CHANGED: {
            return {...state, perPage: action.payload, activePage: 1, pagesArray: action.newArray}
        }
        case ACTIVE_PAGE_CHANGED: {
            return {...state, activePage: action.payload}
        }
        default: {

            return {...state}
        }
    }
}