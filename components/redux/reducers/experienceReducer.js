import { ActionTypes } from "../constants/action-types";

const initialState = {
    experiences: [],
};

export const experienceReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_EXPERIENCES: 
            return {...state, experiences: payload};

        case ActionTypes.FETCH_EXPERIENCES: 
            return {...state, experiences: payload};

        case ActionTypes.CREATE_EXPERIENCE:
            const experiences = state.experiences.concat(payload);
            return {...state, experiences}
         
        default:
            return state;

    }
}

export const selectedExperienceReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_EXPERIENCE:
            return {...state, ...payload };

        case ActionTypes.EDIT_EXPERIENCE:
            return {...state, ...payload };

        /* case ActionTypes.SELECTED_USER : 
        case ActionTypes.EDIT_EXPERIENCE : 
            return {}, state, {
                experiences: payload
            }
 */
        case ActionTypes.ADD_ADMIN_TO_EXPERIENCE:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_ADMIN_FROM_EXPERIENCE:
            return {...state, ...payload};
        
        case ActionTypes.REMOVE_GAME_FROM_EXPERIENCE:
            return {...state, ...payload};

        case ActionTypes.ADD_TYPE_EXPERIENCE_TO_EXPERIENCE:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_TYPE_EXPERIENCE_FROM_EXPERIENCE:
            return {...state, ...payload};

        default:
            return state;
    }
}