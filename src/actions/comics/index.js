import {FETCH_COMICS_SUCCESFULL, FETCH_MORE_COMICS_SUCCESFULL, FETCH_COMICS_FAILURE} from './../types';
import {apiUrl, publicApiKey, hash, ts} from './../../constants';
import axios from 'axios';

export const fetchComics = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/comics?ts=${ts}&apikey=${publicApiKey}&hash=${hash}&limit=28`)
            .then(response =>{
                let {data: {data: {results} } } = response;
                dispatch(fetchComicSuccess(results))
            })
            .catch(error =>{
                throw error;
            });
    }
};

export const fetchMoreComics = (comics) => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/comics?ts=${ts}&apikey=${publicApiKey}&hash=${hash}&limit=28&offset=${comics}`)
        .then(response =>{
                let {data: {data: {results} } } = response;
                dispatch(fetchMoreComicSuccess(results))
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

export const fetchMoreComicSuccess = (comics) =>{
    return{
        type: FETCH_MORE_COMICS_SUCCESFULL,
        comics
    }
};

