import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchExperiences = () => async (dispatch) => {
    const response = await hivefolioApi.get("/experiences?populate=*");
    dispatch({type: ActionTypes.FETCH_EXPERIENCES, payload: response.data})
};

export const fetchExperience = (id) => async (dispatch) => {
    const response = await hivefolioApi.get(`/experiences/${id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_EXPERIENCE, payload: response.data})
};

export const createExperienceUser = (formData, setShowEditExperiencesModal01, setShowCreateExperienceModal, setShowToastCreate, fetchExperiences, fetchUsers) => {

    return async (dispatch) => {

      try {
      const response = await hivefolioApi.post(`/experiences`, formData, {headers: {
        'content-type': 'multipart/form-data',
          }
      })
        
        dispatch({
          type: ActionTypes.CREATE_EXPERIENCE,
          payload: response.data
        })

        /* dispatch({
          type: ActionTypes.FETCH_USERS,
        }) */
  
        /* dispatch({
          type: ActionTypes.EDIT_EXPERIENCE,
        }) */

        /* dispatch({
          type: ActionTypes.SELECTED_USER,
        }) */

        if(response.data) {
        setShowEditExperiencesModal01(true);
        setShowCreateExperienceModal(false);
        setShowToastCreate(true);
        fetchExperiences();
        fetchExperiences();
        //fetchUsers();
        }

        console.log("response createExperienceUser action", response.data);
      } catch(error) {
        console.log(error);
      }
    }
  }


  export const createExperience = (formData, setShowEditExperiencesModal01, setShowCreateExperienceModal, setShowToastCreate, fetchExperiences) => {

    return async (dispatch) => {

      try {
      const response = await hivefolioApi.post(`/experiences`, formData, {headers: {
        'content-type': 'multipart/form-data',
          }
      })
        
        dispatch({
          type: ActionTypes.CREATE_EXPERIENCE,
          payload: response.data
        })

        if(response.data) {
        setShowEditExperiencesModal01(true);
        setShowCreateExperienceModal(false);
        setShowToastCreate(true);
        fetchExperiences();
        fetchExperiences();
        }

        console.log("response createExperience action", response.data);
      } catch(error) {
        console.log(error);
      }
    }
  }

export const userAddRelatedUsers = (id, userId, teamDataMember, team) => async (dispatch) => {
    /* if (user === team.members) {
      setError('Please sign in first');
      return;
    } */
    const existingUser = team['members']?.find(x => x.id !== userId);

    // first get the user object from users prop

    if (existingUser) {
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      teamDataMember.push(newUser.id);

      let newMember = {
        members: teamDataMember,
      };

      try {
        const response = await hivefolioApi.put(`/teams/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })
        
          dispatch({
            type: ActionTypes.ADD_MEMBER_TO_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
  }
}


export const editExperience = (formData, id) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.put(`/experiences/${id}`, formData, {headers: {
      // 'content-type': 'multipart/form-data',
      "Accept": ["multipart/form-data", "Application/json"]
        }
    })

      dispatch({
        type: ActionTypes.EDIT_EXPERIENCE,
        payload: response.data
      })



      console.log("experienceAction editExperience", response.data)
    } catch(error) {
      console.log(error);
    }
  }
}


export const experienceAddAdmin = (id, userId, users, user, team, teamDataAdmin) => async (dispatch) => {
  if (user === team.admins) {
      setError('Please sign in first');
      return;
    }
    // first get the user object from users prop
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      teamDataAdmin.push(newUser.id);

      let newMember = {
        admins: teamDataAdmin,
      };

      try {
        const response = await hivefolioApi.put(`/experiences/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })
        
          dispatch({
            type: ActionTypes.ADD_ADMIN_TO_EXPERIENCE,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}


export const experienceRemoveAdmin = (id, userId, team) => async (dispatch) => {

  const existingUser = team['admins']?.find(x => x.id === userId);

    if (existingUser) {

      const data = {
        ...team,
        admins: team.admins.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/experiences/${id}`, data,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
          /* data: {
            ...team,
            captains: team.captains.filter(item => item.id !== userId).map(item => item.id),
          }, */
         
        })

          dispatch({
            type: ActionTypes.REMOVE_ADMIN_FROM_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}


/* Add game to games list */
export const addGameToExperience = (id, team, games, gameId) => {
  event.preventDefault();


  // first get the team object from teams prop
  const isExistingGame = team.games.find(x => x.id === gameId);

  if (!isExistingGame) {

    const game = games.find(game => game.id === gameId)
    // add it to members
    const newGames = [...team.games, game]

    let data = {
      games: newGames
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/experiences/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })
      
          dispatch({
          type: ActionTypes.ADD_GAME_TO_EXPERIENCE,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGameFromExperience = (id, team, removeId) => async (dispatch) => {

  const existingGame = team['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...team,
      games: team.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/experiences/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })

        dispatch({
          type: ActionTypes.REMOVE_GAME_FROM_EXPERIENCE,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


/* Add type_experience to type_experience list */
export const addTypeExperience = (id, team, type_teams, typeTeamId) => {

      // first get the team object from teams prop
      const existingTypeteam = team.type_experiences?.find(x => x.id === typeTeamId);

      if (!existingTypeteam) {
  
        const typeteam = type_teams.find(item => item.id === typeTeamId)
        // add it to members
        const newTypeteam = [...team?.type_experiences, typeteam]
  
        let data = {
          type_experiences: newTypeteam
        };
  
        return async (dispatch) => {
          try {
          const response = await hivefolioApi.put(`/experiences/${id}`, data, {
              headers: {
              'content-type': 'Application/json',
              }, 
          
          })
          
              dispatch({
              type: ActionTypes.ADD_TYPE_EXPERIENCE_TO_EXPERIENCE,
              payload: response.data
              })
          } catch(error) {
              console.log(error);
          }
        }
  
      }
    };


/* Remove type_experience from type_experience list */
export const removeTypeExperience = (id, team, removeId) => async (dispatch) => {
  
  const existingTypeteam = team.type_experiences?.find(x => x.id === removeId);

  if (existingTypeteam) {

    const data = {
      ...team,
      type_experiences: team.type_experiences?.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/experiences/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })
      
        dispatch({
          type: ActionTypes.REMOVE_TYPE_EXPERIENCE_FROM_EXPERIENCE,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


export const deleteExperience = (id, setShowDeleteExperiencesModal, setShowEditExperiencesModal01, fetchExperiences, fetchUser, username) => async (dispatch) => {
        
  try {
    const response = await hivefolioApi.delete(`/experiences/${id}`,
    
    {
      headers: {
      'content-type': 'Application/json',
      }, 
     
    })
    
      dispatch({
        type: ActionTypes.DELETE_EXPERIENCE,
        payload: response.data
      })

      /* dispatch({
        type: ActionTypes.FETCH_USERS,
      }) */

      /* dispatch({
        type: ActionTypes.EDIT_EXPERIENCE,
      }) */

      //fetchExperiences();
      //fetchUser(username);
      setShowDeleteExperiencesModal(false);
      setShowEditExperiencesModal01(false);
      
    } catch(error) {
      console.log(error);
  }
}