import {FETCH_COMICS_SUCCESFULL, FETCH_COMICS_FAILURE} from './../../actions/types';

 export default function comicReducer (state = [], action){
    switch(action.type){
        case FETCH_COMICS_SUCCESFULL:
            return action.comics;
        case FETCH_COMICS_FAILURE:
            return state = "Ha sucedido un error, intentalo más tarde";
        default:
            return state;
    }
};