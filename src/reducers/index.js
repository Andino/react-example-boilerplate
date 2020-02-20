import {combineReducers} from 'redux';
import comics from './Comics/comicReducer';
export default combineReducers({
    comics:comics,
});