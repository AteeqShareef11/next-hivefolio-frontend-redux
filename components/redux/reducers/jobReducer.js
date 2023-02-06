import { ActionTypes } from "../constants/action-types";

const initialState = {
    jobs: [],
};

export const jobReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_JOBS: 
            return {...state, jobs: payload};

        case ActionTypes.FETCH_JOBS: 
            return {...state, jobs: payload};

        case ActionTypes.CREATE_JOB:
            const jobs = state.jobs.concat(payload);
            return {...state, jobs}
            
        default:
            return state;

    }
}

export const selectedJobReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_JOB:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_JOBS:
            return {};

        case ActionTypes.ADD_ADMIN_TO_JOB:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_ADMIN_FROM_JOB:
            return {...state, ...payload};
        
        case ActionTypes.REMOVE_GAME_FROM_JOB:
            return {...state, ...payload};

        case ActionTypes.ADD_TYPE_JOB_TO_JOB:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_TYPE_JOB_FROM_JOB:
            return {...state, ...payload};

        default:
            return state;
    }
}