import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESTART,
    GET_USERS,
    GET_USERS_FAIL,
    DELETE_USER,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAIL,
    RESTART_USERS
  } from '../actions/types';
  
  const initialState = {   
    response: false,
    users: null,
    status: null,
    restartuser: null
  };
  
  //Dependiendo de la aplicación el REGISTER_SUCCESS cambiará
  //el isAuthenticated
  
  function usersDataReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case RESTART_USERS:
          return {
            response: false,
            users: null,
            status: null,
            restartuser: null
          };
        case GET_USERS:
            return {
                ...state,
                response: null,
                users: payload,
                status: true
            };
        case GET_USERS_FAIL:
            return {
                ...state,
                response: false,
                users: null,
                status: false
            };
        case DELETE_USER:
          return {
              ...state,
              status: null
          };
        case REGISTER_SUCCESS:
          return {
            ...state,
            response: true,
            status: true,
            restartuser: true
          };       
        case REGISTER_FAIL:
          return {
            ...state,
            response: true,
            status: false
          };
        case RESTART:
            return {
              ...state,
              response: null,
              status: false,
              restartuser: null
            };
            
        case UPDATE_USER_DATA_SUCCESS:
          return {
            ...state,
            response: false,
            status: true
          }; 
        case UPDATE_USER_DATA_FAIL:
          return {
            ...state,
            response: false,
            status: true
          }; 
      default:
        return state;
    }
  }
  
  export default usersDataReducer;