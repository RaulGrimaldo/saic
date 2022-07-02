import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import register from './register';
import usersdata from './usersdata';
import consecutives from './consecutives';
/*import profile from './profile';
import post from './post'; */

export default combineReducers({
   alert,
  auth,
  register,
  usersdata,
  consecutives
  /*profile,
  post */
});