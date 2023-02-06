import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";
import axios from "axios";
import { callApis } from "../../utils/utils";



export const fetchUsers = () => async (dispatch) => {
  const response = await callApis({ path: "/users" });
  // const response = await hivefolioApi.get("/users?populate=*");
  //const response = await axios.get("https://hivefolio.herokuapp.com/api/users");
  // console.log("response=========",response)
  dispatch({ type: ActionTypes.FETCH_USERS, payload: response })
};

export const fetchUser = (username) => async (dispatch) => {
  // const usersRes = await hivefolioApi.get(`/users?populate=*`);
  const usersRes = await callApis({ path: "/users" });
  // console.log("usersRes=========",usersRes)

  const IdOfUser = usersRes.find(user => user.username === username);
  // const response = await hivefolioApi.get(`/users/${IdOfUser.id}?populate=*`);
  // console.log("IdOfUser=========",IdOfUser);

  const response = await callApis({ path: `/users/${IdOfUser.id}` });
  // console.log("response=========",response);

  dispatch({ type: ActionTypes.SELECTED_USER, payload: response })
  // console.log("userActions fetchUser response", response)
};

export const fetchUserId = (id) => async (dispatch) => {
  // const response = await hivefolioApi.get(`/users/${id}?populate=*`);
  const response = await callApis({ path: `/users/${id}` });
  // console.log("response",response)
  dispatch({ type: ActionTypes.SELECTED_USER_ID, payload: response })
};


export const setUsers = (users) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: users,
  };
};

export const selectedUser = (user) => {
  return {
    type: ActionTypes.SELECTED_USER,
    payload: user,
  };
};

export const removeSelectedUser = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_USER,
  };
};

export const editUser = (formData, id) => {
  return async (dispatch) => {
    try {

      const response = await hivefolioApi.put(`/users/${id}`, formData, {
        headers: {
          // 'content-type': 'multipart/form-data',
          "Accept": ["multipart/form-data", "Application/json"]
        }
      })

      dispatch({
        type: ActionTypes.EDIT_USER,
        payload: response.data

      })

      //dispatch(fetchUsers())

      console.log("response editUser", response.data)
    } catch (error) {
      console.log(error);
    }
  }
}

/* Add game to games list */
export const addGame = (id, user, games, gameId) => {
  event.preventDefault();

  // first get the user object from users prop
  const isExistingGame = user.games.find(x => x.id === gameId);

  if (!isExistingGame) {
    const game = games.find(game => game.id === gameId)
    // add it to members
    const newGames = [...user.games]

    let data = {
      games: newGames
    };

    return async (dispatch) => {
      try {
        const response = await hivefolioApi.put(`/users/${id}`, data, {
          headers: {
            'content-type': 'Application/json',
          },

        })

        dispatch({
          type: ActionTypes.ADD_GAME_TO_USER,
          payload: response.data
        })
      } catch (error) {
        console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGame = (id, user, removeId) => async (dispatch) => {

  const existingGame = user['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...user,
      games: user.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/users/${id}`, data,

        {
          headers: {
            'content-type': 'Application/json',
          },

        })

      dispatch({
        type: ActionTypes.REMOVE_GAME_FROM_USER,
        payload: response.data
      })
      console.log("response removeGame", response.data)
    } catch (error) {
      console.log(error);
    }
  }
}

/* Add character to characters list */
export const addCharacter = (id, user, characters, characterId) => {

  // first get the user object from users prop
  const existingCharacter = user.characters.find(x => x.id === characterId);

  if (!existingCharacter) {

    const character = characters.find(character => character.id === characterId)
    // add it to members
    const newCharacter = [...user.characters, character]

    let data = {
      characters: newCharacter
    };

    return async (dispatch) => {
      try {
        const response = await hivefolioApi.put(`/users/${id}`, data, {
          headers: {
            'content-type': 'Application/json',
          },

        })

        dispatch({
          type: ActionTypes.ADD_CHARACTER_TO_USER,
          payload: response.data
        })
      } catch (error) {
        console.log(error);
      }
    }

  }
};


/* Remove character to character list */
export const removeCharacter = (id, user, removeId) => async (dispatch) => {

  const existingCharacter = user.characters?.find(x => x.id === removeId);

  if (existingCharacter) {

    const data = {
      ...user,
      characters: user.characters.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/users/${id}`, data,

        {
          headers: {
            'content-type': 'Application/json',
          },

        })

      dispatch({
        type: ActionTypes.REMOVE_CHARACTER_FROM_USER,
        payload: response.data
      })
      console.log("response removeCharacter", response.data)
    } catch (error) {
      console.log(error);
    }
  }
}

/* Add type_user from type_user list */
export const addTypeuser = (id, user, typeusers, typeUserId) => {

  // first get the user object from users prop
  const existingTypeuser = user.type_user?.find(x => x.id === typeUserId);

  if (!existingTypeuser) {

    const typeuser = typeusers.find(item => item.id === typeUserId)
    // add it to members
    const newTypeuser = [...user.type_user, typeuser]

    let data = {
      type_user: newTypeuser
    };

    return async (dispatch) => {
      try {
        const response = await hivefolioApi.put(`/users/${id}`, data, {
          headers: {
            'content-type': 'Application/json',
          },

        })

        dispatch({
          type: ActionTypes.ADD_TYPE_USER_TO_USER,
          payload: response.data
        })
        console.log("response addGame", response.data)
      } catch (error) {
        console.log(error);
      }
    }

  }
};

/* Remove typeuser to typeuser list */
export const removeTypeuser = (id, user, removeId) => async (dispatch) => {

  const existingTypeuser = user.type_user?.find(x => x.id === removeId);

  if (existingTypeuser) {

    const data = {
      ...user,
      type_user: user.type_user?.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/users/${id}`, data,

        {
          headers: {
            'content-type': 'Application/json',
          },

        })

      dispatch({
        type: ActionTypes.REMOVE_TYPE_USER_FROM_USER,
        payload: response.data
      })
      console.log("response removeType", response.data)
    } catch (error) {
      console.log(error);
    }
  }
}


/* Add user image */
export const addUserImage = (setShowLoading, request, id) => {

  return async (dispatch) => {
    try {

      const response = await hivefolioApi.put(`/users/${id}`, request, {
        headers: {
          // 'content-type': 'multipart/form-data',
          "Accept": ["multipart/form-data", "Application/json"]
        }
      })

      dispatch({
        type: ActionTypes.ADD_USER_IMAGE,
        payload: response.data

      })
      setShowLoading(false);
      console.log("response addUserImage", response.data)
    } catch (error) {
      setShowLoading(false);
      console.log(error);
    }
  }

};

/* Remove user image */
export const removeUserImage = (id, user, typeusers, typeUserId) => {

};



/* Onboarding User */
export const onboardingUser = (id, user, history, setShowLoading, fetchCoreData, removeCoreData) => {
  event.preventDefault();

  const onboardingIsTrue = (user.onboarding === true);


  if (!onboardingIsTrue) {
    setShowLoading(true);
    let data = {
      onboarding: true
    };

    return async (dispatch) => {

      try {
        const response = await hivefolioApi.put(`/users/${id}`, data, {
          headers: {
            'content-type': 'Application/json',
          },

        })

        dispatch({
          type: ActionTypes.ONBOARDING_USER,
          payload: response.data
        })

        if (response) {
          dispatch(removeCoreData())
          dispatch(fetchCoreData())
          if (response) {
            setShowLoading(false);
            history.push(`/user/${response.data.username}`);
            history.push(`/user/${response.data.username}`);
          }

        }

      } catch (error) {
        console.log(error);
        setShowLoading(false);
      }
    }

  } else {

    let data = {
      onboarding: false
    };

    return async (dispatch) => {
      try {
        const response = await hivefolioApi.put(`/users/${id}`, data, {
          headers: {
            'content-type': 'Application/json',
          },

        })

        //history.push(`/team/${response.data.username}`)
        dispatch({
          type: ActionTypes.ONBOARDING_USER,
          payload: response.data
        })
      } catch (error) {
        console.log(error);
      }
    }

  }
};