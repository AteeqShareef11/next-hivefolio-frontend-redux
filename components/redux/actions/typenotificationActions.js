import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchTypenotifications = () => async (dispatch) => {
    const response = await hivefolioApi.get("/typenotifications?populate=*");
    dispatch({type: ActionTypes.FETCH_TYPENOTIFICATIONS, payload: response.data})
};
