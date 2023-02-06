import { ActionTypes } from "../constants/action-types";

const initialState = {
    typenotifications: [],
};

export const typenotificationReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPENOTIFICATION: 
            return {...state, typenotifications: payload};

        case ActionTypes.FETCH_TYPENOTIFICATIONS: 
            return {...state, typenotifications: payload};
            
        default:
            return state;

    }
}