import {
  FETCH_COMICS_SUCCESFULL,
  FETCH_MORE_COMICS_SUCCESFULL,
  FETCH_COMICS_FAILURE
} from "./../types";
import { apiUrl, publicApiKey, hash, ts } from "./../../constants";
import axios from "axios";

export const fetchComics = (filters = "") => {
  return dispatch => {
    return axios
      .get(
        `${apiUrl}/comics?ts=${ts}&apikey=${publicApiKey}&hash=${hash}&limit=28&orderBy=issueNumber${filters}`
      )
      .then(response => {
        let {
          data: {
            data: { results }
          }
        } = response;
        dispatch(fetchComicSuccess(results));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchMoreComics = ({ comics, filters = "" }) => {
  return dispatch => {
    return axios
      .get(
        `${apiUrl}/comics?ts=${ts}&apikey=${publicApiKey}&hash=${hash}&limit=28&offset=${comics +
          1}&orderBy=issueNumber${filters}`
      )
      .then(response => {
        let {
          data: {
            data: { results }
          }
        } = response;
        dispatch(fetchMoreComicSuccess(results));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchComicSuccess = comics => {
  return {
    type: FETCH_COMICS_SUCCESFULL,
    comics
  };
};

export const fetchMoreComicSuccess = comics => {
  return {
    type: FETCH_MORE_COMICS_SUCCESFULL,
    comics
  };
};
