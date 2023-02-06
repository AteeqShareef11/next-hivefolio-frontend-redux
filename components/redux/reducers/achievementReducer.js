import { ActionTypes } from "../constants/action-types";

const initialState = {
    achievements: [],
};

export const achievementReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ACHIEVEMENTS: 
            return {...state, achievements: payload};

        case ActionTypes.FETCH_ACHIEVEMENTS: 
            return {...state, achievements: payload};

        case ActionTypes.CREATE_ACHIEVEMENT:
            const achievements = state.achievements.concat(payload);
            return {...state, achievements}
         
        default:
            return state;

    }
}

export const selectedAchievementReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_ACHIEVEMENT:
            return {...state, ...payload };

        case ActionTypes.EDIT_ACHIEVEMENT:
            return {...state, ...payload };

        case ActionTypes.ADD_ADMIN_TO_ACHIEVEMENT:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_ADMIN_FROM_ACHIEVEMENT:
            return {...state, ...payload};
        
        case ActionTypes.REMOVE_GAME_FROM_ACHIEVEMENT:
            return {...state, ...payload};

        case ActionTypes.ADD_TYPE_ACHIEVEMENT_TO_ACHIEVEMENT:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_TYPE_ACHIEVEMENT_FROM_ACHIEVEMENT:
            return {...state, ...payload};

        default:
            return state;
    }
}