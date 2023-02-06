import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";

export const fetchJobs = () => async (dispatch) => {
    const response = await hivefolioApi.get("/jobs?populate=*");

    dispatch({type: ActionTypes.FETCH_JOBS, payload: response.data})
};

export const fetchJob = (id) => async (dispatch) => {
    const response = await hivefolioApi.get(`/jobs/${id}?populate=*`);
    dispatch({type: ActionTypes.SELECTED_JOB, payload: response.data})
};


export const setJobs = (jobs) => {
    return {
        type: ActionTypes.SET_JOBS,
        payload: jobs,
    };
};

export const selectedJob = (job) => {
    return {
        type: ActionTypes.SELECTED_JOB,
        payload: job,
    };
};

export const removeSelectedJob = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_JOBS,
    };
};

export const createJob = (formData, history, setShowModal) => {

  console.log("formData", );
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.post(`/jobs`, formData, {headers: {
      'content-type': 'multipart/form-data',
        }
    })

      history.push(`/job/${response.data.id}`)
      setShowModal(true);
      dispatch({
        type: ActionTypes.CREATE_JOB,
        payload: response.data
      })
      console.log("createJob Action data", data)
    } catch(error) {
      console.log(error);
    }
  }
}

export const editJob = (formData, id) => {
  return async (dispatch) => {
    try {
    const response = await hivefolioApi.put(`/jobs/${id}`, formData, {headers: {
      // 'content-type': 'multipart/form-data',
      "Accept": ["multipart/form-data", "Application/json"]
        }
    })
    
      dispatch({
        type: ActionTypes.EDIT_JOB,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
    }
  }
}


/* Add game to games list */
export const addGameToJob = (id, job, games, gameId) => {
  event.preventDefault();


  // first get the job object from jobs prop
  const isExistingGame = job.games.find(x => x.id === gameId);

  if (!isExistingGame) {

    const game = games.find(game => game.id === gameId)
    // add it to members
    const newGames = [...job.games, game]

    let data = {
      games: newGames
    };

    return async (dispatch) => {
      try {
      const response = await hivefolioApi.put(`/jobs/${id}`, data, {
          headers: {
          'content-type': 'Application/json',
          }, 
      
      })

          dispatch({
          type: ActionTypes.ADD_GAME_TO_JOB,
          payload: response.data
          })
      } catch(error) {
          console.log(error);
      }
    }

  }
};


/* Remove game to games list */
export const removeGameFromJob = (id, job, removeId) => async (dispatch) => {

  const existingGame = job['games']?.find(x => x.id === removeId);

  if (existingGame) {

    const data = {
      ...job,
      games: job.games.filter(item => item.id !== removeId).map(item => item),
    };

    try {
      const response = await hivefolioApi.put(`/jobs/${id}`, data,
      
      {
        headers: {
        'content-type': 'Application/json', 
        }, 
       
      })
      
        dispatch({
          type: ActionTypes.REMOVE_GAME_FROM_JOB,
          payload: response.data
        })
      } catch(error) {
        console.log(error);
    }
  }
}


/* Add type_job to type_job list */
export const addTypejob = (id, job, type_jobs, typeJobId) => {

      // first get the job object from jobs prop
      const existingTypejob = job.type_job?.find(x => x.id === typeJobId);
  
      if (!existingTypejob) {
  
        const typejob = type_jobs.find(item => item.id === typeJobId)
        // add it to members
        const newTypejob = [...job.type_job, typejob]
  
        let data = {
          type_job: newTypejob
        };
  
        return async (dispatch) => {
          try {
          const response = await hivefolioApi.put(`/jobs/${id}`, data, {
              headers: {
              'content-type': 'Application/json',
              }, 
          
          })
          
              dispatch({
              type: ActionTypes.ADD_TYPE_JOB_TO_JOB,
              payload: response.data
              })
          } catch(error) {
              console.log(error);
          }
        }
  
      }
    };
  
    /* Remove type_job from type_job list */
    export const removeTypejob = (id, job, removeId) => async (dispatch) => {
  
      const existingTypejob = job.type_job?.find(x => x.id === removeId);
  
      if (existingTypejob) {
  
        const data = {
          ...job,
          type_job: job.type_job?.filter(item => item.id !== removeId).map(item => item),
        };
  
        try {
          const response = await hivefolioApi.put(`/jobs/${id}`, data,
          
          {
            headers: {
            'content-type': 'Application/json', 
            }, 
           
          })
          
            dispatch({
              type: ActionTypes.REMOVE_TYPE_JOB_FROM_JOB,
              payload: response.data
            })
          } catch(error) {
            console.log(error);
        }
      }
    }