import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchAchievements = () => async (dispatch) => {
    const response = await hivefolioApi.get("/achievements?populate=*");
    dispatch({type: ActionTypes.FETCH_ACHIEVEMENTS, payload: response.data})
};

export const fetchAchievement = (id) => async (dispatch) => {
    const response = await hivefolioApi.get(`/achievements/${id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_ACHIEVEMENT, payload: response.data})
};

export const createAchievementUser = (formData, setShowEditExperiencesModal01, setShowCreateExperienceModal, setShowToastCreate, fetchExperiences, fetchUsers) => {

    return async (dispatch) => {

      try {
      const response = await hivefolioApi.post(`/achievements`, formData, {headers: {
        'content-type': 'multipart/form-data',
          }
      })
        
        dispatch({
          type: ActionTypes.CREATE_ACHIEVEMENT,
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

        console.log("response createAchievementUser action", response.data);
      } catch(error) {
        console.log(error);
      }
    }
  }

export const achievementAddRelatedUsers = (id, userId, teamDataMember, team) => async (dispatch) => {
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
        const response = await hivefolioApi.put(`/achievements/${id}`, newMember, {
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


export const editAchievement = (formData, id) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.put(`/achievements/${id}`, formData, {headers: {
      // 'content-type': 'multipart/form-data',
      "Accept": ["multipart/form-data", "Application/json"]
        }
    })

      dispatch({
        type: ActionTypes.EDIT_ACHIEVEMENT,
        payload: response.data
      })



      console.log("achievementAction editAchievement", response.data)
    } catch(error) {
      console.log(error);
    }
  }
}


export const achievementAddAdmin = (id, userId, users, user, team, teamDataAdmin) => async (dispatch) => {
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


export const achievementRemoveAdmin = (id, userId, team) => async (dispatch) => {

  const existingUser = team['admins']?.find(x => x.id === userId);

    if (existingUser) {

      const data = {
        ...team,
        admins: team.admins.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/achievements/${id}`, data,
        
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
export const addGameToAchievement = (id, team, games, gameId) => {
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
      const response = await hivefolioApi.put(`/achievement/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })
      
          dispatch({
          type: ActionTypes.ADD_GAME_TO_ACHIEVEMENT,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGameFromAchievement = (id, team, removeId) => async (dispatch) => {

  const existingGame = team['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...team,
      games: team.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/achievement/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })

        dispatch({
          type: ActionTypes.REMOVE_GAME_FROM_ACHIEVEMENT,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


/* Add type_achievement to type_achievement list */
export const addTypeAchievement = (id, team, type_teams, typeTeamId) => {

      // first get the team object from teams prop
      const existingTypeteam = team.type_achievements?.find(x => x.id === typeTeamId);

      if (!existingTypeteam) {
  
        const typeteam = type_teams.find(item => item.id === typeTeamId)
        // add it to members
        const newTypeteam = [...team?.type_achievements, typeteam]
  
        let data = {
          type_achievements: newTypeteam
        };
  
        return async (dispatch) => {
          try {
          const response = await hivefolioApi.put(`/achievements/${id}`, data, {
              headers: {
              'content-type': 'Application/json',
              }, 
          
          })
          
              dispatch({
              type: ActionTypes.ADD_TYPE_ACHIEVEMENT_TO_ACHIEVEMENT,
              payload: response.data
              })
          } catch(error) {
              console.log(error);
          }
        }
  
      }
    };


/* Remove type_achievement from type_achievement list */
export const removeTypeAchievement = (id, team, removeId) => async (dispatch) => {
  
  const existingTypeteam = team.type_achievements?.find(x => x.id === removeId);

  if (existingTypeteam) {

    const data = {
      ...team,
      type_achievements: team.type_achievements?.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/achievements/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })
      
        dispatch({
          type: ActionTypes.REMOVE_TYPE_ACHIEVEMENT_FROM_ACHIEVEMENT,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


export const deleteAchievement = (id, setShowDeleteExperiencesModal, setShowEditExperiencesModal01, fetchExperiences, fetchUser, username) => async (dispatch) => {
        
  try {
    const response = await hivefolioApi.delete(`/achievements/${id}`,
    
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