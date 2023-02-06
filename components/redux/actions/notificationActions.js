import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchNotifications = () => async (dispatch) => {
    const response = await hivefolioApi.get("/notifications?populate=*");
    dispatch({type: ActionTypes.FETCH_NOTIFICATIONS, payload: response.data})
};

export const setNotifications = (notifications) => {
    return {
        type: ActionTypes.SET_NOTIFICATIONS,
        payload: notifications,
    };
};

export const selectedNotification = (notification) => {
    return {
        type: ActionTypes.SELECTED_NOTIFICATION,
        payload: notification,
    };
};

export const removeSelectedNotification = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_NOTIFICATION,
    };
};

export const notifiationDelete = (notificationId) => async (dispatch) => {
        
  try {
    const response = await hivefolioApi.delete(`/notifications/${notificationId}`,
    
    {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })

      dispatch({
        type: ActionTypes.DELETE_NOTIFICATION,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
  }
}



/* Notification for Team */
export const createNotificationTeamMemberRequest = ( userId, teamId ) => async (dispatch) => {

    let newMember = {
        receiveruser: userId,
        senderteam: teamId,
        boolean_request: true,
        typenotification: "61f541db4721785b9085ea03"
    };

    try {
        const response = await hivefolioApi.post(`/notifications`, newMember, {headers: {
            'content-type': 'Application/json',
            }
        })
        
            dispatch({
            type: ActionTypes.CREATE_NOTIFICATION,
            payload: response.data
            })
        } catch(error) {
            console.log(error);
    }
  }

  export const notificationTeamMemberApprove = (userId, senderTeamId) => async (dispatch) => {

    let newMember = {
        receiverteam: senderTeamId,
        senderuser: userId,
        boolean_request: false,
        boolean_approve: true,
        boolean_read: false,
        typenotification: "61f541db4721785b9085ea03"
    };
    
    try {
      const response = await hivefolioApi.post(`/notifications`, newMember, {
        headers: {
        'content-type': 'Application/json',
        }, 
       
      })

        dispatch({
          type: ActionTypes.CREATE_NOTIFICATION,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  
}


/* Notification for organisation */

export const createNotificationOrganisationMemberRequest = ( userId, organisationId ) => async (dispatch) => {

  let newMember = {
      receiveruser: userId,
      senderorganisation: organisationId,
      boolean_request: true,
      typenotification: "61f541db4721785b9085ea03"
  };

  try {
      const response = await hivefolioApi.post(`/notifications`, newMember, {headers: {
          'content-type': 'Application/json',
          }
      })
      
          dispatch({
          type: ActionTypes.CREATE_NOTIFICATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
  }
}

export const notificationOrganisationMemberApprove = (userId, senderOrganisationId) => async (dispatch) => {

  let newMember = {
      receiverorganisation: senderOrganisationId,
      senderuser: userId,
      boolean_request: false,
      boolean_approve: true,
      boolean_read: false,
      typenotification: "61f541db4721785b9085ea03"
  };

  try {
    const response = await hivefolioApi.post(`/notifications`, newMember, {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })
      
      dispatch({
        type: ActionTypes.CREATE_NOTIFICATION,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
  }

}

export const createNotificationOrganisationTeamRequest = ( teamId, organisationId ) => async (dispatch) => {

  let newMember = {
      receiverteam: teamId,
      senderorganisation: organisationId,
      boolean_request: true,
      typenotification: "61f541ec4721785b9085ea04"
  };

  try {
      const response = await hivefolioApi.post(`/notifications`, newMember, {headers: {
          'content-type': 'Application/json',
          }
      })

          dispatch({
          type: ActionTypes.CREATE_NOTIFICATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
  }
}

export const notificationOrganisationTeamApprove = (teamId, senderOrganisationId) => async (dispatch) => {

  let newMember = {
      receiverorganisation: senderOrganisationId,
      senderteam: teamId,
      boolean_request: false,
      boolean_approve: true,
      boolean_read: false,
      typenotification: "61f541ec4721785b9085ea04"
  };
  
  try {
    const response = await hivefolioApi.post(`/notifications`, newMember, {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })
      
      dispatch({
        type: ActionTypes.CREATE_NOTIFICATION,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
  }
}

export const createNotificationOrganisationCommunityRequest = ( communityId, organisationId ) => async (dispatch) => {

  let newMember = {
      receivercommunity: communityId,
      senderorganisation: organisationId,
      boolean_request: true,
      typenotification: "61f542094721785b9085ea06"
  };

  try {
      const response = await hivefolioApi.post(`/notifications`, newMember, {headers: {
          'content-type': 'Application/json',
          }
      })
      
          dispatch({
          type: ActionTypes.CREATE_NOTIFICATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
  }
}

export const notificationOrganisationCommunityApprove = (communityId, senderOrganisationId) => async (dispatch) => {

  let newMember = {
      receiverorganisation: senderOrganisationId,
      sendercommunity: communityId,
      boolean_request: false,
      boolean_approve: true,
      boolean_read: false,
      typenotification: "61f542094721785b9085ea06"
  };

  try {
    const response = await hivefolioApi.post(`/notifications`, newMember, {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })
      
      dispatch({
        type: ActionTypes.CREATE_NOTIFICATION,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
  }
}

/* Notifications for community */

export const createNotificationCommunityMemberRequest = ( userId, communityId ) => async (dispatch) => {

  let newMember = {
      receiveruser: userId,
      sendercommunity: communityId,
      boolean_request: true,
      typenotification: "61f541db4721785b9085ea03"
  };

  try {
      const response = await hivefolioApi.post(`/notifications`, newMember, {headers: {
          'content-type': 'Application/json',
          }
      })
      
          dispatch({
          type: ActionTypes.CREATE_NOTIFICATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
  }
}

export const notificationCommunityMemberApprove = (userId, sendercommunityId) => async (dispatch) => {

  let newMember = {
      receivercommunity: sendercommunityId,
      senderuser: userId,
      boolean_request: false,
      boolean_approve: true,
      boolean_read: false,
      typenotification: "61f541db4721785b9085ea03"
  };
  
  try {
    const response = await hivefolioApi.post(`/notifications`, newMember, {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })
      
      dispatch({
        type: ActionTypes.CREATE_NOTIFICATION,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
  }

}

export const createNotificationCommunityTeamRequest = ( teamId, communityId ) => async (dispatch) => {

  let newMember = {
      receiverteam: teamId,
      sendercommunity: communityId,
      boolean_request: true,
      typenotification: "61f541ec4721785b9085ea04"
  };

  try {
      const response = await hivefolioApi.post(`/notifications`, newMember, {headers: {
          'content-type': 'Application/json',
          }
      })

          dispatch({
          type: ActionTypes.CREATE_NOTIFICATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
  }
}

export const notificationCommunityTeamApprove = (teamId, senderCommunityId) => async (dispatch) => {

  let newMember = {
      receivercommunity: senderCommunityId,
      senderteam: teamId,
      boolean_request: false,
      boolean_approve: true,
      boolean_read: false,
      typenotification: "61f541ec4721785b9085ea04"
  };

  try {
    const response = await hivefolioApi.post(`/notifications`, newMember, {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })
      
      dispatch({
        type: ActionTypes.CREATE_NOTIFICATION,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
  }
}


/* Other */

export const notificationRead = (notificationId) => async (dispatch) => {


    let newMember = {
        boolean_read: true,
    };

    try {
      const response = await hivefolioApi.put(`/notifications/${notificationId}`, newMember, {
        headers: {
        'content-type': 'Application/json',
        }, 
       
      })
      
        dispatch({
          type: ActionTypes.NOTIFICATION_READ,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  
}

