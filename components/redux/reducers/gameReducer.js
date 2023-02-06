import { ActionTypes } from "../constants/action-types";

const initialState = {
    games: [],
};

export const gameReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_GAMES: 
            return {...state, games: payload};
        case ActionTypes.FETCH_GAMES: 
            return {...state, games: payload};
         
        default:
            return state;

    }
}

export const selectedGameReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_GAME:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_GAME:
            return {};

        default:
            return state;
    }
}