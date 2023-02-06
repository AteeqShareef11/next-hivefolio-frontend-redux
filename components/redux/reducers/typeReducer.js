import { ActionTypes } from "../constants/action-types";

const initialStateTypeuser = {
    typeusers: [],
};

const initialStateTypeTeam = {
    typeteams: [],
};

const initialStateTypeOrganisation = {
    typeorganisations: [],
};

const initialStateTypeCommunities = {
    typecommunities: [],
};

const initialStateTypeJobs = {
    typejobs: [],
};

const initialStateTypeExperiences = {
    typeExperiences: [],
};

export const typeuserReducer = (state = initialStateTypeuser, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPEUSERS: 
            return {...state, typeusers: payload};
        case ActionTypes.FETCH_TYPEUSERS: 
            return {...state, typeusers: payload};
         
        default:
            return state;
    }
}

export const typeteamReducer = (state = initialStateTypeTeam, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPETEAMS: 
            return {...state, typeteams: payload};
        case ActionTypes.FETCH_TYPETEAMS: 
            return {...state, typeteams: payload};
         
        default:
            return state;
    }
}

export const typeorganisationReducer = (state = initialStateTypeOrganisation, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPEORGANISATIONS: 
            return {...state, typeorganisations: payload};
        case ActionTypes.FETCH_TYPEORGANISATIONS: 
            return {...state, typeorganisations: payload};
         
        default:
            return state;
    }
}

export const typecommunityReducer = (state = initialStateTypeCommunities, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPECOMMUNITIES: 
            return {...state, typecommunities: payload};
        case ActionTypes.FETCH_TYPECOMMUNITIES: 
            return {...state, typecommunities: payload};
         
        default:
            return state;
    }
}

export const typejobReducer = (state = initialStateTypeJobs, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPEJOBS: 
            return {...state, typejobs: payload};
        case ActionTypes.FETCH_TYPEJOBS: 
            return {...state, typejobs: payload};
         
        default:
            return state;
    }
}

export const typeExperienceReducer = (state = initialStateTypeExperiences, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TYPE_EXPERIENCES: 
            return {...state, typeExperiences: payload};
        case ActionTypes.FETCH_TYPE_EXPERIENCES: 
            return {...state, typeExperiences: payload};
         
        default:
            return state;
    }
}