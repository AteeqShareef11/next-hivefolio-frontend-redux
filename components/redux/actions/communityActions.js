import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchCommunities = () => async (dispatch) => {
    const response = await hivefolioApi.get("/communities?populate=*");
    dispatch({type: ActionTypes.FETCH_COMMUNITIES, payload: response.data})
};

export const fetchCommunity = (username) => async (dispatch) => {
    const communitiesRes = await hivefolioApi.get(`/communities?populate=*`);
    const IdOfCommunity = communitiesRes.data.data.find(community => community.attributes.username === username);
    const response = await hivefolioApi.get(`/communities/${IdOfCommunity.id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_COMMUNITY, payload: response.data})
};

export const fetchCommunityId = (id) => async (dispatch) => {
  const response = await hivefolioApi.get(`/communities/${id}?populate=*`);
  dispatch({type: ActionTypes.SELECTED_COMMUNITY_ID, payload: response.data})
};


export const setCommunities = (communities) => {
    return {
        type: ActionTypes.SET_COMMUNITIES,
        payload: communities,
    };
};

export const selectedCommunity = (community) => {
    return {
        type: ActionTypes.SELECTED_COMMUNITY,
        payload: community,
    };
};

export const removeSelectedCommunity = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_COMMUNITY,
    };
};

export const createCommunity = (formData, history, fetchCommunity) => {
    return async (dispatch) => {
      try {
      const response = await hivefolioApi.post(`/communities`, formData, {headers: {
        'content-type': 'multipart/form-data'
          }
      })
      
        
        dispatch({
          type: ActionTypes.CREATE_COMMUNITY,
          payload: response.data
        })

        if(response.data.username) {
          history.push(`/community/${response.data.username}`)
          dispatch(fetchCommunity(response.data.username))
        }
      } catch(error) {
        console.log(error);
      }
    }
}

export const editCommunity = (formData, id) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.put(`/communities/${id}`, formData, {headers: {
      // 'content-type': 'multipart/form-data',
      "Accept": ["multipart/form-data", "Application/json"]
        }
    })
    
      dispatch({
        type: ActionTypes.EDIT_COMMUNITY,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
    }
  }
}

export const communityAddMember = (id, userId, users, communityDataMember) => async (dispatch) => {
  /* if (user === community.members) {
      setError('Please sign in first');
      return;
    } */
    // first get the user object from users prop
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      communityDataMember.push(newUser.id);

      let newMember = {
        members: communityDataMember,
      };

      try {
        const response = await hivefolioApi.put(`/communities/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })
        
          dispatch({
            type: ActionTypes.ADD_MEMBER_TO_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const communityRemoveMember = (id, userId, community) => async (dispatch) => {

  const existingUser = community['members']?.find(x => x.id === userId);

    if (existingUser) {

      const removeData = {
        ...community,
        admins: community.admins.filter(item => item.id !== userId).map(item => item.id),
        members: community.members.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/communities/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })
        
          dispatch({
            type: ActionTypes.REMOVE_MEMBER_FROM_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const communityAddAdmin = (id, userId, users, user, community, communityDataAdmin) => async (dispatch) => {
  if (user === community.admins) {
      setError('Please sign in first');
      return;
    }
    // first get the user object from users prop
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      communityDataAdmin.push(newUser.id);

      let newMember = {
        admins: communityDataAdmin,
      };

      try {
        const response = await hivefolioApi.put(`/communities/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_ADMIN_TO_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const communityRemoveAdmin = (id, userId, community) => async (dispatch) => {

  const existingUser = community['admins']?.find(x => x.id === userId);

    if (existingUser) {

      const removeData = {
        ...community,
        admins: community.admins.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/communities/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
        })
        
          dispatch({
            type: ActionTypes.REMOVE_ADMIN_FROM_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const communityAddTeam = (id, teamId, teams, communityDataTeams) => async (dispatch) => {

    // first get the user object from teams prop
    const newUser = teams.find(x => x.id == teamId);

    if (newUser) {
      // add it to captains
      communityDataTeams.push(newUser.id);

      let newMember = {
        teams: communityDataTeams,
      };

      try {
        const response = await hivefolioApi.put(`/communities/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })
        
          dispatch({
            type: ActionTypes.ADD_TEAM_TO_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const communityRemoveTeam = (id, teamId, community) => async (dispatch) => {

  const existingUser = community['teams']?.find(x => x.id === teamId);

    if (existingUser) {

      const removeData = {
        ...community,
        teams: community.teams.filter(item => item.id !== teamId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/communities/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
        })
        
          dispatch({
            type: ActionTypes.REMOVE_TEAM_FROM_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}


export const communityAddOrganisation = (id, organisationId, communities, communityDataOrganisation) => async (dispatch) => {

  // first get the user object from communities prop
  const newUser = communities.find(x => x.id == organisationId);

  if (newUser) {
    // add it to captains
    communityDataOrganisation.push(newUser.id);

    let newMember = {
      organisations: communityDataOrganisation,
    };

    try {
      const response = await hivefolioApi.put(`/communities/${id}`, newMember, {
        headers: {
        'content-type': 'Application/json',
        }, 
       
      })
      
        dispatch({
          type: ActionTypes.ADD_ORGANISATION_TO_COMMUNITY,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}

export const communityRemoveOrganisation = (id, organisationId, community) => async (dispatch) => {

  const existingUser = community['organisations']?.find(x => x.id === organisationId);

    if (existingUser) {

      const removeData = {
        ...community,
        teams: community.organisations.filter(item => item.id !== organisationId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          },          
        })
        
          dispatch({
            type: ActionTypes.REMOVE_ORGANISATION_FROM_COMMUNITY,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}


/* Add game to games list */
export const addGameToCommunity = (id, community, games, gameId) => {
  event.preventDefault();

  // first get the community object from communities prop
  const isExistingGame = community.games.find(x => x.id === gameId);

  if (!isExistingGame) {

    const game = games.find(game => game.id === gameId)
    // add it to members
    const newGames = [...community.games, game]

    let data = {
      games: newGames
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/communities/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })
      
          dispatch({
          type: ActionTypes.ADD_GAME_TO_COMMUNITY,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGameFromCommunity = (id, community, removeId) => async (dispatch) => {

  const existingGame = community['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...community,
      games: community.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/communities/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })
      
        dispatch({
          type: ActionTypes.REMOVE_GAME_FROM_COMMUNITY,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


/* Add type_community from type_community list */
export const addTypecommunity = (id, community, typecommunities, typeCommunityId) => {
      // first get the community object from communities prop
      const existingTypecommunity = community.type_community?.find(x => x.id === typeCommunityId);
  
      if (!existingTypecommunity) {
  
        const typecommunity = typecommunities.find(item => item.id === typeCommunityId)
        // add it to members
        const newTypecommunity = [...community.type_community, typecommunity]
  
        let data = {
          type_community: newTypecommunity
        };
  
        return async (dispatch) => {
          try {
          const response = await hivefolioApi.put(`/communities/${id}`, data, {
              headers: {
              'content-type': 'Application/json',
              }, 
          
          })
          
              dispatch({
              type: ActionTypes.ADD_TYPE_COMMUNITY_TO_COMMUNITY,
              payload: response.data
              })
          } catch(error) {
              console.log(error);
          }
        }
  
      }
    };
  
    /* Remove type_community to type_community list */
    export const removeTypecommunity = (id, community, removeId) => async (dispatch) => {
  
      const existingTypecommunity = community.type_community?.find(x => x.id === removeId);
  
      if (existingTypecommunity) {
  
        const data = {
          ...community,
          type_community: community.type_community?.filter(item => item.id !== removeId).map(item => item),
        };
  
        try {
          const response = await hivefolioApi.put(`/communities/${id}`, data,
          
          {
            headers: {
            'content-type': 'Application/json', 
            }, 
           
          })
          
            dispatch({
              type: ActionTypes.REMOVE_TYPE_COMMUNITY_FROM_COMMMUNITY,
              payload: response.data
            })
          } catch(error) {
            console.log(error);
        }
      }
    }

/* Onboarding Community */
export const onboardingCommunity = (id, community, history, setShowLoading) => {
  event.preventDefault();

  const onboardingIsTrue = (community.boolean_onboarding === true);

  if (!onboardingIsTrue) {
    setShowLoading(true);
    let data = {
      boolean_onboarding: true
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/communities/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ONBOARDING_COMMUNITY,
          payload: response.data
          })
          if(response.data.boolean_onboarding === true) {
            setShowLoading(false);
            
            history.push(`/community/${community.username}`);
            //window.location.reload();
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
      const response = await hivefolioApi.put(`/communities/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ONBOARDING_COMMUNITY,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};