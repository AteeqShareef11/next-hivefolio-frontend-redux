import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchTypeusers = () => async (dispatch) => {
    const response = await hivefolioApi.get("/typeusers?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPEUSERS, payload: response.data})
};