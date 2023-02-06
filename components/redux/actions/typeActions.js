import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchTypeusers = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-users");
    dispatch({type: ActionTypes.FETCH_TYPEUSERS, payload: response.data})
};

export const fetchTypeteams = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-teams");
    dispatch({type: ActionTypes.FETCH_TYPETEAMS, payload: response.data})
};

export const fetchTypeorganisations = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-organisations?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPEORGANISATIONS, payload: response.data})
};

export const fetchTypecommunities = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-communities?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPECOMMUNITIES, payload: response.data})
};

export const fetchTypejobs = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-jobs?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPEJOBS, payload: response.data})
};

export const fetchTypeExperiences = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-experiences?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPE_EXPERIENCES, payload: response.data})
};

export const fetchTypeAchievements = () => async (dispatch) => {
    const response = await hivefolioApi.get("/type-achievements?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPE_ACHIEVEMENTS, payload: response.data})
};