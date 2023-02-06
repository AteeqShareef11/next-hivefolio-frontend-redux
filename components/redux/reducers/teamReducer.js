import { ActionTypes } from "../constants/action-types";

const initialState = {
    teams: [],
};

export const teamReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TEAMS: 
            return {...state, teams: payload};

        case ActionTypes.FETCH_TEAMS: 
            return {...state, teams: payload};

        case ActionTypes.CREATE_TEAM:
            const teams = state.teams.concat(payload);
            return {...state, teams}
            
        default:
            return state;

    }
}

export const selectedTeamReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_TEAM:
            return {...state, ...payload };

        case ActionTypes.SELECTED_TEAM_ID:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_TEAM:
            return {};

        case ActionTypes.ADD_MEMBER_TO_TEAM:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_MEMBER_FROM_TEAM:
            return {...state, ...payload};

        case ActionTypes.ADD_ADMIN_TO_TEAM:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_ADMIN_FROM_TEAM:
            return {...state, ...payload};

        case ActionTypes.ADD_CAPTAIN_TO_TEAM:
            return {...state, ...payload }; 

        case ActionTypes.REMOVE_CAPTAIN_FROM_TEAM:
            return {...state, ...payload };     

        case ActionTypes.ADD_COACH_TO_TEAM:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_COACH_FROM_TEAM:
            return {...state, ...payload};

        case ActionTypes.ADD_GAME_TO_TEAM:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_GAME_FROM_TEAM:
            return {...state, ...payload};

        case ActionTypes.ADD_TYPE_TEAM_TO_TEAM:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_TYPE_TEAM_FROM_TEAM:
            return {...state, ...payload};

        default:
            return state;
    }
}