import { ActionTypes } from "../constants/action-types";

const initialState = {
    notifications: [],
};

export const notificationReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_NOTIFICATIONS: 
            return {...state, notifications: payload};

        case ActionTypes.FETCH_NOTIFICATIONS: 
            return {...state, notifications: payload};

        case ActionTypes.CREATE_NOTIFICATION:
            const notifications = state.notifications.concat(payload);
            return {...state, notifications}

        case ActionTypes.DELETE_NOTIFICATION:
            return {};

        default:
            return state;
    }
};

export const selectedNotificationReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_NOTIFICATION:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_NOTIFICATION:
            return {};

        case ActionTypes.NOTIFICATION_ACCEPT_ADD_MEMBER_TO_TEAM:
            return {...state, ...payload };

        case ActionTypes.NOTIFICATION_READ:
            return {...state, ...payload };

        case ActionTypes.NOTIFICATION_READ_ALL:
            return {...state, ...payload };
            
        default:
            return state;
    }
};