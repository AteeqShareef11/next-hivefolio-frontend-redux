import { ActionTypes } from "../constants/action-types";

const initialState = {
    characters: [],
};

export const characterReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_CHARACTERS: 
            return {...state, characters: payload};
        case ActionTypes.FETCH_CHARACTERS: 
            return {...state, characters: payload};
         
        default:
            return state;

    }
}

export const selectedCharacterReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_CHARACTER:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_CHARACTER:
            return {};

        default:
            return state;
    }
}