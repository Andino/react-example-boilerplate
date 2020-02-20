import {FETCH_COMICS_SUCCESFULL, FETCH_MORE_COMICS_SUCCESFULL, FETCH_COMICS_FAILURE} from './../../actions/types';

 export default function comicReducer (state = [], action){
    switch(action.type){
        case FETCH_COMICS_SUCCESFULL:
            return action.comics;
        case FETCH_MORE_COMICS_SUCCESFULL:
            let comics = state;
            comics = comics.concat(action.comics);
            return comics;
        case FETCH_COMICS_FAILURE:
            return state = "Ha sucedido un error, intentalo más tarde";
        default:
            return state;
    }
};