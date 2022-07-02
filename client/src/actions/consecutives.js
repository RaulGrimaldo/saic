import api from '../utils/api';

import { setAlert, setAlert2 } from './alert';
import {
    GET_CONSECUTIVES,
    GET_CONSECUTIVES_FAIL,    
    UPSERT_CONSECUTIVES,
    UPSERT_CONSECUTIVES_FAIL
} from './types';


export const getconsecutives = () => async dispatch => {
  
  try {
    const res = await api.get('/admin/consecutives');

    dispatch({
      type: GET_CONSECUTIVES,
      payload: res.data
    });
    console.log("consulta consec")
    dispatch(setAlert2('Consecutivos consultados', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GET_CONSECUTIVES_FAIL
    });
    dispatch(setAlert('Error al conseguir los consecutivos', 'error'));
  }
};




// Upsert consecutive
export const upsertconsecutive = formData => async dispatch => {

  try {
    const res = await api.post('/admin/upsertconsecutive', formData);

    dispatch({
      type: UPSERT_CONSECUTIVES,
      payload: res.data
    });
    dispatch(setAlert2('Consecutivos actualizados', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert2(error.msg, 'danger')));
    }

    dispatch({
        type: UPSERT_CONSECUTIVES_FAIL
    });
    dispatch(setAlert('Error al upsertear el consecutivo', 'error'))

  }
};

