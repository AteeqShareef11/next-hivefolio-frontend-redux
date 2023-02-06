import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchTeams = () => async (dispatch) => {
    const response = await hivefolioApi.get("/teams?populate=*");
    dispatch({type: ActionTypes.FETCH_TEAMS, payload: response.data})
};

export const fetchTeam = (username) => async (dispatch) => {
    const teamsRes = await hivefolioApi.get(`/teams?populate=*`);
    // console.log(teamsRes)
    const IdOfTeam = teamsRes?.data.data?.find(team => team.attributes.username === username);
    // console.log("The Id Of Team is finded here",IdOfTeam?.id);

    const response = await hivefolioApi.get(`/teams/${IdOfTeam?.id}?populate=*`);

    //  console.log('The Data Of Team is finded here', response);
    dispatch({type: ActionTypes.SELECTED_TEAM, payload: response.data})
};

export const fetchTeamId = (id) => async (dispatch) => {
    const response = await hivefolioApi.get(`/teams/${id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_TEAM_ID, payload: response.data})
};


export const setTeams = (teams) => {
    return {
        type: ActionTypes.SET_TEAMS,
        payload: teams,
    };
};

export const selectedTeam = (team) => {
    return {
        type: ActionTypes.SELECTED_TEAM,
        payload: team,
    };
};

export const removeSelectedTeam = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_TEAM,
    };
};

export const createTeam = (formData, history, fetchTeam) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.post(`/teams`, formData, {headers: {
      'content-type': 'multipart/form-data',
        }
    })
    
      
      dispatch({
        type: ActionTypes.CREATE_TEAM,
        payload: response.data
      })

      if(response.data.username) {
        history.push(`/team/${response.data.username}`)
        dispatch(fetchTeam(response.data.username))
      }
      
    } catch(error) {
      console.log(error);
    }
  }
}

export const editTeam = (formData, id, toaster) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.put(`/teams/${id}`, formData, {headers: {
      // 'content-type': 'multipart/form-data',
      "Accept": ["multipart/form-data", "Application/json"]
        }
    })

      dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: response.data
      })
      toaster(true)
    } catch(error) {
      console.log(error);
    }
  }
}

export const teamAddMember = (id, userId, users, teamDataMember, team) => async (dispatch) => {

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

export const teamRemoveMember = (id, userId, team) => async (dispatch) => {

  const existingUser = team['members']?.find(x => x.id === userId);

    if (existingUser) {

      const data = {
        ...team,
        admins: team.admins.filter(item => item.id !== userId).map(item => item.id),
        members: team.members.filter(item => item.id !== userId).map(item => item.id),
        coaches: team.coaches.filter(item => item.id !== userId).map(item => item.id),
        captains: team.captains.filter(item => item.id !== userId).map(item => item.id)
      };
      
      try {
        const response = await hivefolioApi.put(`/teams/${id}`, data,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.REMOVE_MEMBER_FROM_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const teamAddAdmin = (id, userId, users, user, team, teamDataAdmin) => async (dispatch) => {
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
        const response = await hivefolioApi.put(`/teams/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_ADMIN_TO_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const teamRemoveAdmin = (id, userId, team) => async (dispatch) => {

  const existingUser = team['admins']?.find(x => x.id === userId);

    if (existingUser) {

      const data = {
        ...team,
        admins: team.admins.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/teams/${id}`, data,
        
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

export const teamAddCaptain = (id, userId, users, user, team, teamDataCaptain, setShowLoading) => async (dispatch) => {
    if (user === team.captains) {
        setError('Please sign in first');
        return;
      }

      // first get the user object from users prop
      const newUser = users.find(x => x.id == userId);
  
      if (newUser) {
        // add it to captains
        teamDataCaptain.push(newUser.id);
  
        let newMember = {
          captains: teamDataCaptain,
        };

        try {
          const response = await hivefolioApi.put(`/teams/${id}`, newMember, {
            headers: {
            'content-type': 'Application/json',
            }, 
           
          })

            dispatch({
              type: ActionTypes.ADD_CAPTAIN_TO_TEAM,
              payload: response.data
            })
          } catch(error) {
            console.log(error);
        }
      }
}

export const teamRemoveCaptain = (id, userId, team) => async (dispatch) => {

  const existingUser = team['captains']?.find(x => x.id === userId);

    if (existingUser) {

      let removeData = {
        ...team,
        captains: team.captains.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/teams/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
          /* removeData: {
            ...team,
            captains: team.captains.filter(item => item.id !== userId).map(item => item.id),
          }, */
         
        })

          dispatch({
            type: ActionTypes.REMOVE_CAPTAIN_FROM_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const teamAddCoach = (id, userId, users, user, team, teamDataCoach) => async (dispatch) => {
  if (user === team.coaches) {
      setError('Please sign in first');
      return;
    }
    // first get the user object from users prop
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      teamDataCoach.push(newUser.id);

      let newMember = {
        coaches: teamDataCoach,
      };

      try {
        const response = await hivefolioApi.put(`/teams/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })
        
          dispatch({
            type: ActionTypes.ADD_COACH_TO_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const teamRemoveCoach = (id, userId, team) => async (dispatch) => {

  const existingUser = team['coaches']?.find(x => x.id === userId);

    if (existingUser) {

      let removeData = {
        ...team,
        coaches: team.coaches.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/teams/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
        })

          dispatch({
            type: ActionTypes.REMOVE_COACH_FROM_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const teamAddOrganisation = (id, organisationId, teams, teamDataOrganisation) => async (dispatch) => {

  // first get the user object from teams prop
  const newUser = teams.find(x => x.id == organisationId);

  if (newUser) {
    // add it to captains
    teamDataOrganisation.push(newUser.id);

    let newMember = {
      organisations: teamDataOrganisation,
    };

    try {
      const response = await hivefolioApi.put(`/teams/${id}`, newMember, {
        headers: {
        'content-type': 'Application/json',
        }, 
       
      })

        dispatch({
          type: ActionTypes.ADD_ORGANISATION_TO_TEAM,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}

export const teamRemoveOrganisation = (id, organisationId, team) => async (dispatch) => {

  const existingUser = team['organisations']?.find(x => x.id === organisationId);

    if (existingUser) {

      const removeData = {
        ...team,
        teams: team.organisations.filter(item => item.id !== organisationId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/teams/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          },          
        })

          dispatch({
            type: ActionTypes.REMOVE_ORGANISATION_FROM_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}


export const teamAddCommunity = (id, communityId, communities, teamDataCommunity) => async (dispatch) => {

    // first get the user object from communities prop
    const newUser = communities.find(x => x.id == communityId);

    if (newUser) {
      // add it to captains
      teamDataCommunity.push(newUser.id);

      let newMember = {
        communities: teamDataCommunity,
      };

      try {
        const response = await hivefolioApi.put(`/teams/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_COMMUNITY_TO_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}


export const teamRemoveCommunity = (id, communityId, team) => async (dispatch) => {

  const existingUser = team['communities']?.find(x => x.id === communityId);

    if (existingUser) {

      const removeData = {
        ...team,
        community: team.communities.filter(item => item.id !== communityId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/teams/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.REMOVE_COMMUNITY_FROM_TEAM,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

/* Add game to games list */
export const addGameToTeam = (id, team, games, gameId) => {
  event.preventDefault();

  // first get the team object from teams prop
  const isExistingGame = team.games.find(x => x.id === gameId);

  if (!isExistingGame) {

    const game = games.find(game => game.id === gameId)
    // add it to games
    const newGames = [...team.games, game]

    let data = {
      games: newGames
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/teams/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ADD_GAME_TO_TEAM,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGameFromTeam = (id, team, removeId) => async (dispatch) => {

  const existingGame = team['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...team,
      games: team.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/teams/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })

        dispatch({
          type: ActionTypes.REMOVE_GAME_FROM_TEAM,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


/* Add type_team to type_team list */
export const addTypeteam = (id, team, type_teams, typeTeamId) => {

      // first get the team object from teams prop
      const existingTypeteam = team.type_team?.find(x => x.id === typeTeamId);

      if (!existingTypeteam) {
  
        const typeteam = type_teams.find(item => item.id === typeTeamId)
        // add it to members
        const newTypeteam = [...team.type_team, typeteam]
  
        let data = {
          type_team: newTypeteam
        };
  
        return async (dispatch) => {
          try {
          const response = await hivefolioApi.put(`/teams/${id}`, data, {
              headers: {
              'content-type': 'Application/json',
              }, 
          
          })

              dispatch({
              type: ActionTypes.ADD_TYPE_TEAM_TO_TEAM,
              payload: response.data
              })
          } catch(error) {
              console.log(error);
          }
        }
  
      }
    };
  
    /* Remove type_team from type_team list */
    export const removeTypeteam = (id, team, removeId) => async (dispatch) => {
  
      const existingTypeteam = team.type_team?.find(x => x.id === removeId);
  
      if (existingTypeteam) {
  
        const data = {
          ...team,
          type_team: team.type_team?.filter(item => item.id !== removeId).map(item => item),
        };
  
        try {
          const response = await hivefolioApi.put(`/teams/${id}`, data,
          
          {
            headers: {
            'content-type': 'Application/json', 
            }, 
           
          })

            dispatch({
              type: ActionTypes.REMOVE_TYPE_TEAM_FROM_TEAM,
              payload: response.data
            })
          } catch(error) {
            console.log(error);
        }
      }
    }

/* Onboarding Team */
export const onboardingTeam = (id, team, history, setShowLoading) => {
  event.preventDefault();

  const onboardingIsTrue = (team.boolean_onboarding === true);

  if (!onboardingIsTrue) {
    setShowLoading(true);
    let data = {
      boolean_onboarding: true
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/teams/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ONBOARDING_TEAM,
          payload: response.data
          })
          if(response) {
            setShowLoading(false);
            
            history.push(`/team/${response.data.username}`);
            history.push(`/team/${response.data.username}`);
            //window.location.reload();
            console.log("onboardingTeam response", response)
          }
          
      } catch(error) {
          console.log(error);
          setShowLoading(false);
      }
    }

  } else {

    let data = {
      boolean_onboarding: false
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/teams/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ONBOARDING_TEAM,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};