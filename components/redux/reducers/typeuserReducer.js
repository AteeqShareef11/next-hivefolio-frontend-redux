import { ActionTypes } from "../constants/action-types";

const initialState = {
    typeusers: [],
};

export const typeuserReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPEUSERS: 
            return {...state, typeusers: payload};
        case ActionTypes.FETCH_TYPEUSERS: 
            return {...state, typeusers: payload};
         
        default:
            return state;
    }
}