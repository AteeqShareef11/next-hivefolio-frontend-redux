import { ActionTypes } from "../constants/action-types";

const initialState = {
    organisations: [],
};

export const organisationReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ORGANISATIONS: 
            return {...state, organisations: payload};
        case ActionTypes.FETCH_ORGANISATIONS: 
            return {...state, organisations: payload};
        case ActionTypes.CREATE_ORGANISATION:
            const organisations = state.organisations.concat(payload); 
            return {...state, organisations};
        default:
            return state;

    }
}

export const selectedOrganisationReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_ORGANISATION:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_ORGANISATION:
            return {};

        case ActionTypes.SELECTED_ORGANISATION_ID:
            return {...state, ...payload };

        case ActionTypes.ADD_MEMBER_TO_ORGANISATION:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_MEMBER_FROM_ORGANISATION:
            return {...state, ...payload};

        case ActionTypes.ADD_ADMIN_TO_ORGANISATION:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_ADMIN_FROM_ORGANISATION:
            return {...state, ...payload};

        case ActionTypes.ADD_TEAM_TO_ORGANISATION:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_TEAM_FROM_ORGANISATION:
            return {...state, ...payload};

        case ActionTypes.ADD_COMMUNITY_TO_ORGANISATION:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_COMMUNITY_FROM_ORGANISATION:
            return {...state, ...payload};

        case ActionTypes.ADD_GAME_TO_ORGANISATION:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_GAME_FROM_ORGANISATION:
            return {...state, ...payload};

        case ActionTypes.ADD_TYPE_ORGANISATION_TO_ORGANISATION:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_TYPE_ORGANISATION_FROM_ORGANISATION:
            return {...state, ...payload};

        default:
            return state;
    }
}