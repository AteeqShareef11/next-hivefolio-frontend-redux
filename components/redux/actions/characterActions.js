import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchCharacters = () => async (dispatch) => {
    const response = await hivefolioApi.get("/characters?populate=*");
    //console.log("characters", response.data)
    dispatch({type: ActionTypes.FETCH_CHARACTERS, payload: response.data})
};

export const fetchCharacter = (id) => async (dispatch) => {
    const response = await hivefolioApi.get(`/characters/${id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_CHARACTER, payload: response.data})
};


export const setCharacter = (characters) => {
    return {
        type: ActionTypes.SET_CHARACTERS,
        payload: characters,
    };
};

export const selectedCharacter = (character) => {
    return {
        type: ActionTypes.SELECTED_CHARACTER,
        payload: character,
    };
};

export const removeSelectedCharacter = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_CHARACTER,
    };
};
