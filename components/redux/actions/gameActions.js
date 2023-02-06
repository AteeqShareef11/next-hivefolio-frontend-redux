import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchGames = () => async (dispatch) => {
    const response = await hivefolioApi.get("/games?populate=*");
    dispatch({type: ActionTypes.FETCH_GAMES, payload: response.data})
};

export const fetchGame = (id) => async (dispatch) => {

    const response = await hivefolioApi.get(`/games/${id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_GAME, payload: response.data})

  
};


export const setGames = (games) => {
    return {
        type: ActionTypes.SET_GAMES,
        payload: games,
    };
};

export const selectedGame = (game) => {
    return {
        type: ActionTypes.SELECTED_GAME,
        payload: game,
    };
};

export const removeSelectedGame = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_GAME,
    };
};
