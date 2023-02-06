import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchAnnouncements = () => async (dispatch) => {
    const response = await hivefolioApi.get("/announcements?populate=*");
    dispatch({type: ActionTypes.FETCH_ANNOUNCEMENTS, payload: response.data})
};