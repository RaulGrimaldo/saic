import api from '../utils/api';

import { setAlert, setAlert2 } from './alert';
import {
    // Los register pueden ir en auth dependiendo del tipo de aplicación
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_USERS_FAIL,
    GET_USERS,
    DELETE_USER,
    RESTART,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAIL,
    LOGOUT,
    RESTART_REGISTER
} from './types';
 
// Register User
export const register = formData => async dispatch => {

  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert2('Usuario Agregado', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const getusers = () => async dispatch => {

  try {
    const res = await api.get('/users/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
    //dispatch(setAlert('Usuarios consultados', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_USERS_FAIL
    });
    dispatch(setAlert('Error al conseguir los usuarios', 'error'));
  }
};

export const deleteuser = id => async dispatch => {
  
  try {
    const res = await api.delete(`/users/deleteuser/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
    dispatch(setAlert("Usuario eliminado", 'success'));
    const user1 = res.data.user1;
    const user2 = res.data.user2;
    if(user1 === user2){
      dispatch({
        type: RESTART_REGISTER
      });
      dispatch({
        type: LOGOUT
      });  
      dispatch(setAlert('Ha cerrado sesión', 'success'));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_USERS_FAIL
    });
    dispatch(setAlert('Error al eliminar el usuario', 'error'));
  }
};

export const restart = () => async dispatch => {
  
  try {

    dispatch({
      type: RESTART,
      payload: null
    });
    //dispatch(setAlert2("Restart", 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_USERS_FAIL
    });
    dispatch(setAlert('Error al eliminar el usuario', 'error'));
  }
};


// Register User
export const updateuserdata = formData => async dispatch => {

  try {
    const res = await api.post('/users/updateuser', formData);

    dispatch({
      type: UPDATE_USER_DATA_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert2('Datos del usuario actualizados', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    //Falta agregar un UPDATE_USER_DATA_FAIL
    dispatch({
      type: UPDATE_USER_DATA_FAIL
    });
  }
};

// Register User
export const updateuserpassword = formData => async dispatch => {

  try {
    const res = await api.post('/users/updateuserpassword', formData);

    dispatch({
      type: UPDATE_USER_DATA_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert2('Contraseña actualizada', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    //Falta agregar un UPDATE_USER_DATA_FAIL
    dispatch({
      type: UPDATE_USER_DATA_FAIL
    });
  }
};
