 import {message} from 'antd';
 import { v4 as uuidv4 } from 'uuid';
 import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert2 = ( msg, alertType ) => () => {
  const key = 'updatable';
  
  if(alertType === 'success'){

    message.loading({ content: 'Cargando...', key });

    setTimeout(() => {
      message.success({ content: msg, key, duration: 4 });
    }, 1000);


  } else if(alertType === 'danger'){

    message.loading({ content: 'Cargando...', key });

    setTimeout(() => {
      message.error({ content: msg, key, duration: 4 });                    
    }, 1000);
  }
};



export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};