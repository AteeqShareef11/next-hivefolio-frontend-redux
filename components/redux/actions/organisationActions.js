import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchOrganisations = () => async (dispatch) => {
    const response = await hivefolioApi.get("/organisations");
    dispatch({type: ActionTypes.FETCH_ORGANISATIONS, payload: response.data})
};

export const fetchOrganisation = (username) => async (dispatch) => {
    const organisationsRes = await hivefolioApi.get(`/organisations?populate=*`);
    const IdOfOrganisation = organisationsRes.data.data.find(organisation => organisation.attributes.username === username || organisation.id === username );
    const response = await hivefolioApi.get(`/organisations/${IdOfOrganisation.id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_ORGANISATION, payload: response.data.data})
};

export const fetchOganisationId = (id) => async (dispatch) => {
  const response = await hivefolioApi.get(`/organisations/${id}?populate=*`);
  dispatch({type: ActionTypes.SELECTED_ORGANISATION_ID, payload: response.data})
};

export const setOrganisations = (organisations) => {
    return {
        type: ActionTypes.SET_ORGANISATIONS,
        payload: organisations,
    };
};

export const selectedOrganisation = (organisation) => {
    return {
        type: ActionTypes.SELECTED_ORGANISATION,
        payload: organisation,
    };
};

export const removeSelectedOrganisation = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_ORGANISATION,
    };
};

export const createOrganisation = (formData, history) => {
    return async (dispatch) => {
      try {
      const response = await hivefolioApi.post(`/organisations`, formData, {headers: {
        'content-type': 'multipart/form-data'
          }
      })

        //history.push(`/organisation/${response.data.username}`)
        dispatch({
          type: ActionTypes.CREATE_ORGANISATION,
          payload: response.data
        })

        if(response) {
          history.push(`/onboarding/organisation/${response.data.id}`);
        }
        
      } catch(error) {
        console.log(error);
      }
    }
}

export const editOrganisation = (formData, id) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.put(`/organisations/${id}`, formData, {headers: {
      // 'content-type': 'multipart/form-data',
      "Accept": ["multipart/form-data", "Application/json"]
        }
    })

      dispatch({
        type: ActionTypes.EDIT_ORGANISATION,
        payload: response.data
      })

    } catch(error) {
      console.log(error);
    }
  }
}

export const organisationAddMember = (id, userId, users, organisationDataMember) => async (dispatch) => {

    // first get the user object from users prop
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      organisationDataMember.push(newUser.id);

      let newMember = {
        members: organisationDataMember,
      };

      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_MEMBER_TO_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationRemoveMember = (id, userId, organisation) => async (dispatch) => {

  const existingUser = organisation['members']?.find(x => x.id === userId);

    if (existingUser) {

      const removeData = {
        ...organisation,
        admins: organisation.admins.filter(item => item.id !== userId).map(item => item.id),
        members: organisation.members.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 

         
        })
        
          dispatch({
            type: ActionTypes.REMOVE_MEMBER_FROM_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationAddAdmin = (id, userId, users, user, organisation, organisationDataAdmin) => async (dispatch) => {

    // first get the user object from users prop
    const newUser = users.find(x => x.id == userId);

    if (newUser) {
      // add it to captains
      organisationDataAdmin.push(newUser.id);

      let newMember = {
        admins: organisationDataAdmin,
      };

      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_ADMIN_TO_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationRemoveAdmin = (id, userId, organisation) => async (dispatch) => {

  const existingUser = organisation['admins']?.find(x => x.id === userId);

    if (existingUser) {

      const removeData = {
        ...organisation,
        admins: organisation.admins.filter(item => item.id !== userId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
        })

          dispatch({
            type: ActionTypes.REMOVE_ADMIN_FROM_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationAddTeam = (id, teamId, teams, organisationDataTeams) => async (dispatch) => {

    // first get the team object from teams prop
    const newUser = teams.find(x => x.id == teamId);

    if (newUser) {
      // add it to teams
      organisationDataTeams.push(newUser.id);

      let newMember = {
        teams: organisationDataTeams,
      };

      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_TEAM_TO_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationRemoveTeam = (id, teamId, organisation) => async (dispatch) => {

  const existingUser = organisation['teams']?.find(x => x.id === teamId);

    if (existingUser) {

      const removeData = {
        ...organisation,
        teams: organisation.teams.filter(item => item.id !== teamId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          },          
        })

          dispatch({
            type: ActionTypes.REMOVE_TEAM_FROM_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationAddCommunity = (id, communityId, communities, organisationDataCommunity) => async (dispatch) => {

    // first get the user object from communities prop
    const newUser = communities.find(x => x.id == communityId);

    if (newUser) {
      // add it to captains
      organisationDataCommunity.push(newUser.id);

      let newMember = {
        communities: organisationDataCommunity,
      };

      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, newMember, {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.ADD_COMMUNITY_TO_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

export const organisationRemoveCommunity = (id, communityId, organisation) => async (dispatch) => {

  const existingUser = organisation['communities']?.find(x => x.id === communityId);

    if (existingUser) {

      const removeData = {
        ...organisation,
        communities: organisation.communities.filter(item => item.id !== communityId).map(item => item.id),
      };
      
      try {
        const response = await hivefolioApi.put(`/organisations/${id}`, removeData,
        
        {
          headers: {
          'content-type': 'Application/json',
          }, 
         
        })

          dispatch({
            type: ActionTypes.REMOVE_COMMUNITY_FROM_ORGANISATION,
            payload: response.data
          })
        } catch(error) {
          console.log(error);
      }
    }
}

/* Add game to games list */
export const addGameToOrganisation = (id, organisation, games, gameId) => {
  event.preventDefault();

  // first get the organisation object from organisations prop
  const isExistingGame = organisation.games.find(x => x.id === gameId);

  if (!isExistingGame) {
    const game = games.find(game => game.id === gameId)
    // add it to members
    const newGames = [...organisation.games, game]

    let data = {
      games: newGames
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/organisations/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })
      
          dispatch({
          type: ActionTypes.ADD_GAME_TO_ORGANISATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGameFromOrganisation = (id, organisation, removeId) => async (dispatch) => {

  const existingGame = organisation['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...organisation,
      games: organisation.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/organisations/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })

        dispatch({
          type: ActionTypes.REMOVE_GAME_FROM_ORGANISATION,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


/* Add type_organisation from type_organisation list */
export const addTypeorganisation = (id, organisation, type_organisations, typeOrganisationId) => {

      // first get the organisation object from organisations prop
      const existingTypeorganisation = organisation.type_organisation?.find(x => x.id === typeOrganisationId);
  
      if (!existingTypeorganisation) {
  
        const typeorganisation = type_organisations.find(item => item.id === typeOrganisationId)
        // add it to members
        const newTypeorganisation = [...organisation.type_organisation, typeorganisation]
  
        let data = {
          type_organisation: newTypeorganisation
        };
  
        return async (dispatch) => {
          try {
          const response = await hivefolioApi.put(`/organisations/${id}`, data, {
              headers: {
              'content-type': 'Application/json',
              }, 
          
          })
          
              dispatch({
              type: ActionTypes.ADD_TYPE_ORGANISATION_TO_ORGANISATION,
              payload: response.data
              })
          } catch(error) {
              console.log(error);
          }
        }
  
      }
    };
  
    /* Remove typeorganisation from typeorganisation list */
    export const removeTypeorganisation = (id, organisation, removeId) => async (dispatch) => {
  
      const existingTypeorganisation = organisation.type_organisation?.find(x => x.id === removeId);
  
      if (existingTypeorganisation) {
  
        const data = {
          ...organisation,
          type_organisation: organisation.type_organisation?.filter(item => item.id !== removeId).map(item => item),
        };
  
        try {
          const response = await hivefolioApi.put(`/organisations/${id}`, data,
          
          {
            headers: {
            'content-type': 'Application/json', 
            }, 
           
          })

            dispatch({
              type: ActionTypes.REMOVE_TYPE_ORGANISATION_FROM_ORGANISATION,
              payload: response.data
            })
          } catch(error) {
            console.log(error);
        }
      }
    }


/* Onboarding Organisation */
export const onboardingOrganisation = (id, organisation, history, setShowLoading) => {
  event.preventDefault();

  const onboardingIsTrue = (organisation.boolean_onboarding === true);

  if (!onboardingIsTrue) {
    setShowLoading(true);
    let data = {
      boolean_onboarding: true
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/organisations/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ONBOARDING_ORGANISATION,
          payload: response.data
          })
          if(response.data.boolean_onboarding === true) {
            setShowLoading(false);
            
            history.push(`/organisation/${organisation.username}`);
            window.location.reload();
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
      const response = await hivefolioApi.put(`/organisations/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ONBOARDING_ORGANISATION,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};