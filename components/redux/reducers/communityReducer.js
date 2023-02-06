import { ActionTypes } from "../constants/action-types";

const initialState = {
    communities: [],
};

export const communityReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_COMMUNITIES: 
            return {...state, communities: payload};
        case ActionTypes.FETCH_COMMUNITIES: 
            return {...state, communities: payload};
        case ActionTypes.CREATE_COMMUNITY:
            const communities = state.communities.concat(payload);
            return {...state, communities};   
        default:
            return state;

    }
}

export const selectedCommunityReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case ActionTypes.SELECTED_COMMUNITY:
            return {...state, ...payload };

        case ActionTypes.SELECTED_COMMUNITY_ID:
            return {...state, ...payload };

        case ActionTypes.REMOVE_SELECTED_COMMUNITY:
            return {};

        case ActionTypes.ADD_MEMBER_TO_COMMUNITY:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_MEMBER_FROM_COMMUNITY:
            return {...state, ...payload};  
            
        case ActionTypes.ADD_TEAM_TO_COMMUNITY:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_TEAM_FROM_COMMUNITY:
            return {...state, ...payload};

        case ActionTypes.ADD_ORGANISATION_TO_COMMUNITY:
            return {...state, ...payload };
            
        case ActionTypes.REMOVE_ORGANISATION_FROM_COMMUNITY:
            return {...state, ...payload};

        case ActionTypes.ADD_GAME_TO_COMMUNITY:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_GAME_FROM_COMMUNITY:
            return {...state, ...payload};

        case ActionTypes.ADD_TYPE_COMMUNITY_TO_COMMUNITY:
            return {...state, ...payload };
        
        case ActionTypes.REMOVE_TYPE_COMMUNITY_FROM_COMMMUNITY:
            return {...state, ...payload};

        default:
            return state;
    }
}