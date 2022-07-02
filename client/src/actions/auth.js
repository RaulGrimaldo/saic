import api from '../utils/api';

import { setAlert } from './alert';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESTART_REGISTER,
  RESTART_USERS
} from './types';

// Load User
export const loadUser = () => async dispatch => {

  try {

    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };
console.log(body)
  try {
    const res = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async dispatch => {

  dispatch({
    type: RESTART_REGISTER
  });
  dispatch({
    type: RESTART_USERS
  });  
  dispatch({
    type: LOGOUT
  });  
  dispatch(setAlert('Ha cerrado sesión', 'success'));
};