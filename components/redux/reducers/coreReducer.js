import { ActionTypes } from "../constants/action-types";

const initialState = {
    users: [],
    teams: [],
    organisations: [],
    communities: [],
    games: [],
    characters: [],
    jobs: [],
    achievements: [],
    experiences: [],
    notifications: [],
    typeUsers: [],
    typeTeams: [],
    typeOrganisations: [],
    typeCommunities: [],
    typeJobs: [],
    typeAchievements: [],
    typeExperiences: [],
    announcements: [],
  };

  export const coreReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.FETCH_CORE_DATA: 
            return {
                ...state, ...payload,
            };

        case ActionTypes.REMOVE_CORE_DATA:
            return {};

        default:
            return state;

    }
}