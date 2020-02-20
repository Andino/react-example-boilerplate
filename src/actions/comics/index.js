import {FETCH_COMICS_SUCCESFULL} from './../types';
import {apiUrl, publicApiKey, hash, ts} from './../../constants';
import axios from 'axios';

export const fetchComics = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/comics?ts=${ts}&apikey=${publicApiKey}&hash=${hash}&limit=24`)
            .then(response =>{
                let {data: {data: {results} } } = response;
                dispatch(fetchComicSuccess(results))
            })
            .catch(error =>{
                throw error;
            });
    }
};

export const fetchComicSuccess = (comics) =>{
    return{
        type: FETCH_COMICS_SUCCESFULL,
        comics
    }
};
