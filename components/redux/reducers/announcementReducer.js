import { ActionTypes } from "../constants/action-types";

const initialState = {
    announcements: [],
};

export const announcementReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ANNOUNCEMENTS: 
            return {...state, announcements: payload};
        case ActionTypes.FETCH_ANNOUNCEMENTS: 
            return {...state, announcements: payload};
         
        default:
            return state;
    }
}