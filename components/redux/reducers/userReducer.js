import { ActionTypes } from "../constants/action-types";

const initialState = {
    users: [],
};

export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_USERS: 
            return {...state, users: payload};
        case ActionTypes.FETCH_USERS: 
            return {...state, users: payload};
        /* case ActionTypes.EDIT_USER:
            return {...state, users: payload}; */
         
        default:
            return state;

    }
}

export const selectedUserReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_USER:
            return {...state, ...payload };

        case ActionTypes.SELECTED_USER_ID:
            return {...state, ...payload};

        case ActionTypes.EDIT_USER:
            return {...state, ...payload};

        case ActionTypes.ADD_GAME_TO_USER:
            return {...state, ...payload }; 

        case ActionTypes.REMOVE_GAME_FROM_USER:
            return {...state, ...payload };

        case ActionTypes.ADD_CHARACTER_TO_USER:
            return {...state, ...payload }; 

        case ActionTypes.REMOVE_CHARACTER_FROM_USER:
            return {...state, ...payload };

        case ActionTypes.ADD_TYPE_USER_TO_USER:
            return {...state, ...payload }; 

        case ActionTypes.REMOVE_TYPE_USER_FROM_USER:
            return {...state, ...payload };

        case ActionTypes.ADD_USER_IMAGE:
            return {...state, ...payload };

        case ActionTypes.REMOVE_USER_IMAGE:
            return {...state, ...payload };

        case ActionTypes.ONBOARDING_USER:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_USER:
            return {};

        default:
            return state;
    }
}