/*
* Action generator for management reducer.
*/

import axios from '../../axios';
import {
  LOAD_COMPLETED_TASKS,
  LOAD_COMPLETED_TASKS_FAILED,
  LOAD_COMPLETED_TASKS_SUCCESSFULL,
  LOAD_TODO_TASKS,
  LOAD_TODO_TASKS_FAILED,
  LOAD_TODO_TASKS_SUCCESSFULL,
  LOAD_ANALYTICS_COMMON_WORD,
  LOAD_ANALYTICS_COMMON_WORD_FAILED,
  LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL,
  LOAD_ANALYTICS_MAXIMUM_COMMON_WORD,
  LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
  LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_SUCCESSFUL,
  LOAD_ANALYTICS_KEYWORD_SEARCH,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
  LOAD_ANALYTICS_KEYWORD_SEARCH_SUCCESSFUL,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
  LOAD_ANALYTICS_FILTER,
  LOAD_ANALYTICS_FILTER_SUCCESSFUL,
  LOAD_ANALYTICS_FILTER_FAILED
} from "../types/management";
import { setAlert } from './alerts';


// ++++++++++++++ Utility functions ++++++++++++++++++++

// function to create config object
const createConfig = (token) => {

    //// create object
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    //// return object
    return config
  }

// ++++++++++++++++++++++++++++++++++++++++++++++++





// Action generator to fetch/load completed tasks
export const loadCompletedTasks = () => (dispatch) => {

    // dispatch laod completed tasks
    dispatch({
        type: LOAD_COMPLETED_TASKS
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_COMPLETED_TASKS_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }

    // create config header object
    const config = createConfig(token)

    // send request to server
    axios.get('/task/completed-tasks', config)
        .then((res) => {
            dispatch({
                type: LOAD_COMPLETED_TASKS_SUCCESSFULL,
                payload: {
                    tasks: res.data.tasks
                }
            })
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_COMPLETED_TASKS_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_COMPLETED_TASKS_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load common words between cases
export const loadAnalyticsCommonWord = (case1, case2) => (dispatch) => {
    
    // dispatch laod analytics common word
    dispatch({
        type: LOAD_ANALYTICS_COMMON_WORD
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }
    // create config header object
    const config = createConfig(token)


    const data = {
        case1: case1,
        case2: case2
    }
    
    // send request to server
    axios.post('/common/Case1/Case2',data ,config)
        .then((res) => {
            
            const commonword_json = (res.data)
            
            dispatch({
                type: LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL,
                payload: {
                    commonwords: commonword_json
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load maximum common words between cases
export const loadAnalyticsMaxCommonWord = (case1, case2) => (dispatch) => {
    
    // dispatch laod analytics common word
    dispatch({
        type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }
    // create config header object
    const config = createConfig(token)


    const data = {
        case1: case1,
        case2: case2
    }
    
    // send request to server
    axios.post('/common/words/<case1>/<case2>',data ,config)
        .then((res) => {
            let max_commonword_json = (res.data)
            
            dispatch({
                type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_SUCCESSFUL,
                payload: {
                    maxcommonwords: max_commonword_json
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
              type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
              payload: {
                error: "Something Went Wrong.",
              },
            });
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load todo tasks
export const loadTodoTasks = () => (dispatch) => {

    // dispatch laod completed tasks
    dispatch({
        type: LOAD_TODO_TASKS
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_TODO_TASKS_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }

    // create config header object
    const config = createConfig(token)

    // send request to server
    axios.get('/task/todo-tasks', config)
        .then((res) => {
            dispatch({
                type: LOAD_TODO_TASKS_SUCCESSFULL,
                payload: {
                    tasks: res.data.tasks
                }
            })
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_TODO_TASKS_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_TODO_TASKS_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load common words between cases
export const loadAnalyticsKeyword = (keyword) => (dispatch) => {
    
    // dispatch laod analytics common word
    dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }
    // create config header object
    const config = createConfig(token)


    const data = {
        keyword: keyword
    }
    
    // send request to server
    axios.post('/keyword/search',data ,config)
        .then((res) => {
            
            const case_data = (res.data)
            
            dispatch({
                type: LOAD_ANALYTICS_KEYWORD_SEARCH_SUCCESSFUL,
                payload: {
                    keyword: case_data
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load common words from case
export const loadKeywordfromCase = (keyword, keywordfromcase) => (dispatch) => {
  // dispatch laod analytics common word
  dispatch({
    type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE,
  })

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      }
    })
    return
  }
  // create config header object
  const config = createConfig(token)

  const data = {
    keyword: keyword,
    case_name: keywordfromcase
  }

  // send request to server
  axios.post('/keyword/<case_name>/search', data, config)
    .then((res) => {
      
      const case_data = res.data

      dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL,
        payload: {
          keywordfromcase: case_data
        }
      })
      dispatch(setAlert(res.data.message, "success"))
    })
    .catch((err) => {
      const res = err.response
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
          payload: {
            error: res.data.message
          }
        })
        dispatch(setAlert(res.data.message))
      }
      dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
        payload: {
          error: "Something Went Wrong.",
        }
      })
      dispatch(setAlert("Something Went Wrong."))
    })
}


// Action generator to fetch/load filtered cases
export const loadFilteredCase = (from_date, to_date) => (dispatch) => {
  // dispatch laod filtered cases
  dispatch({
    type: LOAD_ANALYTICS_FILTER,
  })

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_FILTER_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      }
    })
    return
  }
  // create config header object
  const config = createConfig(token)

  const data = {
    starting_date: from_date,
    end_date: to_date
  }

  // send request to server
  axios.post('/case/filter', data, config)
    .then((res) => {
      
      const case_data = res.data

      dispatch({
        type: LOAD_ANALYTICS_FILTER_SUCCESSFUL,
        payload: {
          filtercase: case_data
        }
      })
      dispatch(setAlert(res.data.message, "success"))
    })
    .catch((err) => {
      const res = err.response
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_FILTER_FAILED,
          payload: {
            error: res.data.message
          }
        })
        dispatch(setAlert(res.data.message))
      }
      dispatch({
        type: LOAD_ANALYTICS_FILTER_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      })
      dispatch(setAlert("Something Went Wrong."))
    })
}