import {
    ADD_REGISTER_SUCCESS,
    ADD_REGISTER_FAIL,
    GET_REGISTERS_FAIL,
    GET_REGISTERS,
    RESTART_REGISTER,
    DELETE_REGISTER,
    SEND_REGISTER,
    CANCEL_REGISTER,
    UPDATE_REGISTER_SUCCESS,
    UPDATE_REGISTER_FAIL,
    VALIDATE_REGISTER_SUCCESS,
    POST_QUERY_SUCCESS,
    POST_QUERY_FAIL,
    GET_GOALS_SUCCESS,
    GET_GOALS_FAIL,
    POST_GOALS_SUCCESS,
    POST_GOALS_FAIL,
    POST_QUERY_EDIT_SUCCESS,
    POST_QUERY_EDIT_FAIL,
    GET_CLASSIFY_SUCCESS,
    GET_CLASSIFY_FAIL,
    POST_CLASSIFY_SUCCESS,
    POST_CLASSIFY_FAIL,
    UPDATE_VALIDATE_REGISTER_SUCCESS,
    POST_QUERY_WORKFORCE_SUCCESS,
    RESTART_QUERY,
    RESTART_QUERY_CLASSIFY,
    UPDATE_DATE_REGISTER_SUCCESS,
    POST_AGREGGATE_SUCCESS,
    POST_AGREGGATE_FAIL,
} from '../actions/types';


const initialState = {   
  response: false,
  registers: null,
  registersQuery: null,
  status: null,
  QuincenaYear: null,
  restart: null,
  updated:null,
  goals:null,
  registersQueryEdit:null,
  registersToClassify:null,
  updatedClassify: null,
  registersWorkForce:null,
  updateQuery: null,
  cleanQueryClassify: null,
  updatedDate: null,
  registersAgreggate: null,
  registersActividades: null,
  registersJuds: null,
};
  
  //Dependiendo de la aplicación el REGISTER_SUCCESS cambiará
  //el isAuthenticated
  
  function registersDataReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_REGISTERS:
            return {
                ...state,
                response: null,
                registers: payload.registers,
                QuincenaYear: payload.datosQuincena,
                status: true,
                updated: false,
                registersQuery: null,
                goals: null,
                registersQueryEdit: null,
                updatedClassify: null,
                updateQuery: true,
                registersAgreggate: null,
                registersActividades: null,
                registersJuds: null,
            };
        case RESTART_QUERY:
          return {
              ...state,
              updateQuery: false
          };
        case GET_REGISTERS_FAIL:
            return {
                ...state,
                response: false,
                registers: null,
                status: false,
                updated: false,
                updatedClassify: null,
                registersAgreggate: null,
                registersActividades: null,
                registersJuds: null,
            };
        case ADD_REGISTER_SUCCESS:
          return {
            ...state,
            response: true,
            status: true,
            restart: true,
            updated: false,
            updatedClassify: null,
            registersAgreggate: null,
            registersActividades: null,
            registersJuds: null,
          };        
        case ADD_REGISTER_FAIL:
        case UPDATE_REGISTER_FAIL:
        case UPDATE_REGISTER_SUCCESS:
          return {
            ...state,
            response: true, 
            status: true,
            updated: true
          };
        case UPDATE_VALIDATE_REGISTER_SUCCESS:
          return {
            ...state,
            response: true,
            status: true,
            updatedClassify: true
          };
        case UPDATE_DATE_REGISTER_SUCCESS:
          return {
            ...state,
            response: true,
            status: true,
            updatedDate: true
          };
        case VALIDATE_REGISTER_SUCCESS:
          return {
            ...state,
            response: true,
            status: true,
            updatedClassify: null
          };
        case RESTART_REGISTER:
            return {
              ...state,
              response: false,
              registers: null,
              registersQuery: null,
              status: null,
              restart: null,
              updated:null,
              goals:null,
              registersToClassify:null,
              updatedClassify: null,
              registersWorkForce:null,
              updatedDate: null,  
        };     
        case DELETE_REGISTER:
          return {
            ...state,
            response: true,
            status: true,
            updatedClassify: null
        };  
        case SEND_REGISTER:
          return {
            ...state,
            response: true,
            status: true,
            updatedClassify: null
        };  
        case CANCEL_REGISTER:
          return {
            ...state,
            response: true,
            status: true,
            updatedClassify: null
        };          

        case GET_GOALS_SUCCESS:
          return {
          ...state,
          registersQuery: null,
          goals: payload.registers,
          registersQueryEdit: null,
          registersAgreggate: null,
          registersActividades: null,
          registersJuds: null,
        };

        case GET_GOALS_FAIL:
          return {
          ...state,
          registersQuery: null,
          goals: null
        };

        case POST_GOALS_SUCCESS:
          return {
          ...state,
          registersQuery: null,
          goals: payload.registers,
          registersQueryEdit: null,
          updatedClassify: null,
          registersAgreggate: null,
          registersActividades: null,
          registersJuds: null,
        };

        case POST_GOALS_FAIL:
          return {
          ...state,
          registersQuery: null,
          goals: null,
          registersQueryEdit: null,
          updatedClassify: null,
          registersAgreggate: null,
          registersActividades: null,
          registersJuds: null,
        };
        case POST_QUERY_SUCCESS:
            return {
            ...state,
            registersQuery: payload.registers,
            goals: null,
            registersQueryEdit: null,
            updatedClassify: null,
            registersWorkForce: null,
            registersAgreggate: null,
            registersActividades: null,
            registersJuds: null,
        };
        case POST_QUERY_WORKFORCE_SUCCESS:
            return {
            ...state,
            registersQuery: null,
            goals: null,
            registersQueryEdit: null,
            updatedClassify: null,
            registersWorkForce: payload.registers,
            registersAgreggate: null,
            registersActividades: null,
            registersJuds: null,
        };
        case POST_QUERY_FAIL:
          return {
              ...state,
              registersQuery: null,
              registersQueryEdit: null,
              updatedClassify: null,
              registersWorkForce: null,
              registersAgreggate: null,
              registersActividades: null,
              registersJuds: null,
        };
        case POST_QUERY_EDIT_SUCCESS:
            return {
            ...state,
            registersQuery: null,
            goals: null,
            registersQueryEdit: payload.registers,
            updatedClassify: null,
            registersAgreggate: null,
            registersActividades: null,
            registersJuds: null,
        };
        case POST_QUERY_EDIT_FAIL:
          return {
              ...state,
              registersQuery: null,
              goals: null,
              registersQueryEdit: null,
              updatedClassify: null,
              registersAgreggate: null,
              registersActividades: null,
              registersJuds: null,
        };

        case GET_CLASSIFY_SUCCESS:
            return {
            ...state,
            registersToClassify:payload.registers,
            QuincenaYear: payload.datosQuincena,
            cleanQueryClassify: true,
            
        };
        case RESTART_QUERY_CLASSIFY:
          return {
              ...state,
              cleanQueryClassify: false
          };
        case GET_CLASSIFY_FAIL:
          return {
              ...state,
              registersQuery: null,
              registersQueryEdit: null,
              registersToClassify:null,
              registersAgreggate: null,
              registersActividades: null,
              registersJuds: null,
        };
        case POST_CLASSIFY_SUCCESS:
            return {
            ...state,
            registersToClassify:payload.registers,
            QuincenaYear: payload.datosQuincena,
            cleanQueryClassify: true
        };
        case POST_CLASSIFY_FAIL:
          return {
              ...state,
              registersQuery: null,
              goals: null,
              registersQueryEdit: null,
              registersToClassify:null,
              updatedClassify: null,
              registersAgreggate: null,
              registersActividades: null,
              registersJuds: null,
        };
        case POST_AGREGGATE_SUCCESS:
            return {
            ...state,
            registersAgreggate: payload.rubros,
            registersActividades: payload.actividades,
            registersJuds: payload.juds,
            goals: null,
            registersQueryEdit: null,
            updatedClassify: null,
            registersWorkForce: null,
            registersQuery: null
        };
        case POST_AGREGGATE_FAIL:
          return {
              ...state,
              registersQuery: null,
              registersQueryEdit: null,
              updatedClassify: null,
              registersWorkForce: null,
              registersAgreggate: null,
              registersActividades: null,
              registersJuds: null,
        };
      default:
        return state;
    }
  }
  
  export default registersDataReducer;


  