import {
    GET_CONSECUTIVES,
    GET_CONSECUTIVES_FAIL,    
    UPSERT_CONSECUTIVES,
    UPSERT_CONSECUTIVES_FAIL
  } from '../actions/types';
  
  const initialState = {   
    response: false,
    consecutives: null,
    status: null
  };

  
  function consecutivesReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_CONSECUTIVES:
            return {
                response: true,
                consecutives: payload,
                status: true
            };
        case GET_CONSECUTIVES_FAIL:
            return {
                ...state,
                response: false,
                consecutives: null,
                status: false
            };        
        case UPSERT_CONSECUTIVES:
          return {
            ...state,
            response: true,
            status: true
          };        
        case UPSERT_CONSECUTIVES_FAIL:
          return {
            ...state,
            response: true,
            status: false
          };        
      default:
        return state;
    }
  }
  
  export default consecutivesReducer;