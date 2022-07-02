import api from '../utils/api';

import { setAlert, setAlert2 } from './alert';
import {
    // Los register pueden ir en auth dependiendo del tipo de aplicación
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
} from './types';

// Register User
export const addregister = formData => async dispatch => {
  
  try {
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    const res = await api.post('/registers/addregister', formData, config);

    dispatch({
      type: ADD_REGISTER_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_REGISTER_FAIL
    });
  }
};

export const updateregister = formData => async dispatch => {
    
  try {
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    const res = await api.post('/registers/updateregister', formData, config);

    dispatch({
      type: UPDATE_REGISTER_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_REGISTER_FAIL
    });
  }
};
export const getregisters = () => async dispatch => {
  
  try {
    const res = await api.get('/registers/registers');

    dispatch({
      type: GET_REGISTERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al conseguir los registros', 'error'));
  }
};

export const restartquery = () => async dispatch => {
  
  try {

    dispatch({
      type: RESTART_QUERY,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al conseguir los registros', 'error'));
  }
};

export const restartqueryclassify = () => async dispatch => {
  
  try {

    dispatch({
      type: RESTART_QUERY_CLASSIFY,
    });
  } catch (err) {
    

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert2('Error al conseguir los registros', 'error'));
  }
};



export const send = () => async dispatch => {
  
  try {
    const res = await api.post('/registers/send');

    dispatch({
      type: SEND_REGISTER,
      payload: res.data
    });
    const msg = res.data.msg;
    
    dispatch(setAlert2(msg, 'success'));

    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al enviar', 'error'));
  }
};

export const restartregister = () => async dispatch => {
  
  try {

    dispatch({
      type: RESTART_REGISTER,
      payload: null
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al reiniciar el store', 'error'));
  }
};

export const deleteregister = id => async dispatch => {
  
  try {
    const res = await api.delete(`/registers/deleteregister/${id}`);

    dispatch({
      type: DELETE_REGISTER,
      payload: res.data
    });
    const msg = res.data.msg;    
    dispatch(setAlert2(msg, 'success'));
    
    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 

  } catch (err) {
    
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert2('Error al eliminar el registro', 'error'));
  }
};

export const sendregister = id => async dispatch => {

  try {
    const res = await api.post(`/registers/sendregister/${id}`);

    dispatch({
      type: SEND_REGISTER,
      payload: res.data
    });
    const msg = res.data.msg;    
    dispatch(setAlert2(msg, 'success'));

    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al enviar el registro', 'error'));
  }
};

export const cancelregister = id => async dispatch => {

  try {
    const res = await api.post(`/registers/cancelregister/${id}`);

    dispatch({
      type: CANCEL_REGISTER,
      payload: res.data
    });
    
    dispatch(setAlert2("Registro cancelado", 'success'));

    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al cancelar el registro', 'error'));
  }
};

export const validateregister = id => async dispatch => {

  try {
    const res = await api.post(`/registers/validateregister/${id}`);

    dispatch({
      type: VALIDATE_REGISTER_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    
    dispatch(setAlert2(msg, 'success'));

    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch(setAlert2('Error al validar el registro', 'error'));
  }
};


export const queryregisters = formData => async dispatch => {
  
  try {
    const res = await api.post('/registers/query', formData);

    dispatch({
      type: POST_QUERY_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: POST_QUERY_FAIL
    });
  }
};

export const getgoals = () => async dispatch => {
  
  try {
    const res = await api.get('/registers/goals');

    dispatch({
      type: GET_GOALS_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: GET_GOALS_FAIL
    });
  }
};

export const postgoals = formData => async dispatch => {
  
  try {
    const res = await api.post('/registers/goals', formData);

    dispatch({
      type: POST_GOALS_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: POST_GOALS_FAIL
    });
  }
};

export const queryedit = formData => async dispatch => {
  console.log(formData)
  try {
    const res = await api.post('/registers/queryedit', formData);
 
    dispatch({
      type: POST_QUERY_EDIT_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: POST_QUERY_EDIT_FAIL
    });
  }
};

export const queryregistersfull = formData => async dispatch => {
  
  try {
    const res = await api.post('/registers/queryfull', formData);

    dispatch({
      type: POST_QUERY_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: POST_QUERY_FAIL
    });
  }
};

export const getregisterstoclassify = () => async dispatch => {
  
  try {
    const res = await api.get('/registers/classify');

    dispatch({
      type: GET_CLASSIFY_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    //dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: GET_CLASSIFY_FAIL
    });
  }
};

export const postregisterstoclassify = formData => async dispatch => {
  
  try {
    const res = await api.post('/registers/classify', formData);

    dispatch({
      type: POST_CLASSIFY_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: POST_CLASSIFY_FAIL
    });
  }
};

export const classifyOne = formData => async dispatch => {
    
  try {

    const res = await api.post('/registers/classifyOne', formData);

    dispatch({
      type: UPDATE_VALIDATE_REGISTER_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
    const registers = await api.get('/registers/registers');

    dispatch({
      type: GET_REGISTERS,
      payload: registers.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_REGISTER_FAIL
    });
  }
};


export const returnregister = id => async dispatch => {

  try {
    const res = await api.post(`/registers/returnregister/${id}`);

    dispatch({
      type: CANCEL_REGISTER,
      payload: res.data
    });
    dispatch(setAlert2("Registro regresado a subdirección", 'success'));
    const registers = await api.get('/registers/registers');

    dispatch({
      type: GET_REGISTERS,
      payload: registers.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al cancelar el registro', 'error'));
  }
};

export const workforce = formData => async dispatch => {
  
  try {
    const res = await api.post('/registers/workforce', formData);

    dispatch({
      type: POST_QUERY_WORKFORCE_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: POST_QUERY_FAIL
    });
  }
};

export const cancelregisterE = formD => async dispatch => {

  const id = formD[0];
  const formData = formD[1];
  console.log(formData)
  try {
    const res = await api.post(`/registers/cancelregister/${id}`);

    dispatch({
      type: CANCEL_REGISTER,
      payload: res.data
    });
    
    dispatch(setAlert2("Registro cancelado", 'success'));

    if(res){


      const registers = await api.post('/registers/queryedit', formData);
 
      dispatch({
        type: POST_QUERY_EDIT_SUCCESS,
        payload: registers.data
      });
    } 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al cancelar el registro', 'error'));
  }
};


export const returnregisterE = formD => async dispatch => {

  const id = formD[0];
  const formData = formD[1];

  try {
    const res = await api.post(`/registers/returnregister/${id}`);

    dispatch({
      type: CANCEL_REGISTER,
      payload: res.data
    });
    dispatch(setAlert2("Registro regresado a subdirección", 'success'));
    
    if(res){
      const registers = await api.post('/registers/queryedit', formData);
 
      dispatch({
        type: POST_QUERY_EDIT_SUCCESS,
        payload: registers.data
      });
    } 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert('Error al cancelar el registro', 'error'));
  }
};



export const review = () => async dispatch => {
  
  try {
    const res = await api.post('/registers/review');

    dispatch({
      type: SEND_REGISTER,
      payload: res.data
    });
    const msg = res.data.msg;
    
    dispatch(setAlert2(msg, 'success'));

    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 
  } catch (err) {
    

    dispatch({
      type: GET_REGISTERS_FAIL
    });
    dispatch(setAlert2('Error al conseguir los registros', 'error'));
  }
};


export const pass = id => async dispatch => {

  try {
    const res = await api.post(`/registers/pass/${id}`);

    dispatch({
      type: VALIDATE_REGISTER_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    
    dispatch(setAlert2(msg, 'success'));

    if(res){
      const registers = await api.get('/registers/registers');

      dispatch({
        type: GET_REGISTERS,
        payload: registers.data
      });
    } 
  } catch (err) {
    

    dispatch(setAlert2('Error al aprobar el registro', 'error'));
  }
};

export const updatedate = formData => async dispatch => {
    
  try {

    const res = await api.post('/registers/updatedate', formData);

    dispatch({
      type: UPDATE_DATE_REGISTER_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_REGISTER_FAIL
    });
  }
};


export const queryagreggate = formData => async dispatch => {
  
  try {
    const res = await api.post('/registers/agreggate', formData);

    dispatch({
      type: POST_AGREGGATE_SUCCESS,
      payload: res.data
    });
    const msg = res.data.msg;
    dispatch(setAlert2(msg, 'success'));
  } catch (err) {
    
    dispatch(setAlert2('Error en la explotación', 'error'));

    dispatch({
      type: POST_AGREGGATE_FAIL
    });
  }

};