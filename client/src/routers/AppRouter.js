import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route
} from "react-router-dom";
import LoginScreen from '../components/login/LoginScreen';
import { LOGOUT } from '../actions/types';
import PrivateRouteUser from './PrivateRouteUser';
import PrivateRouteDir from './PrivateRouteDir';
import PrivateRouteSub from './PrivateRouteSub';
import PrivateRoutJud from './PrivateRoutJud';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import QueryAdminScreen from '../components/queryadmins/QueryAdminScreen';
import NumeraliaScreen from '../components/numeralia/NumeraliaScreen';
import UsersScreen from '../components/setusers/UsersScreen';
import PasswordScreen from '../components/changepassword/PasswordScreen';
import NumeraliaUsersScreen from '../components/numeraliausers/NumeraliaUsersScreen';
import AgreggateScreen from '../components/agreggate/AgreggateScreen';
import GoalsUserScreen from '../components/goals/GoalsUserScreen';
import QueryUserScreen from '../components/querys/QueryUserScreen';
import EditUserScreen from '../components/editposvalidation/EditUserScreen';
import ClassifyScreen from '../components/numeralia/Registros/ClassifyScreen';
import GoalsScreen from '../components/numeralia/Registros/GoalsScreen';
import EditRegisterScreen from '../components/numeralia/Registros/EditRegisterScreen';

//Redux
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import ConsecutiveScreen from '../components/numeralia/Registros/ConsecutiveScreen';
import RegisterViewScreen from '../components/register/RegisterViewScreen';





export const AppRouter = () => {

  useEffect(() => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      store.dispatch(loadUser());
  
      // log user out from all tabs if they log out in one tab
      window.addEventListener('storage', () => {
        if (!localStorage.token){
          store.dispatch({ type: LOGOUT });
          <Navigate to="/" />
        } 
      });
      
  }, []);


  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />

            <Route
              path="/admin/numeralia"
              element={<PrivateRouteAdmin component={NumeraliaScreen} />}
            />
            
            <Route
              path="/admin/users"
              element={<PrivateRouteAdmin component={UsersScreen} />}
            />

            <Route
              path="/admin/query"
              element={<PrivateRouteAdmin component={QueryAdminScreen} />}
            />
            <Route
              path="/admin/agreggate"
              element={<PrivateRouteAdmin component={AgreggateScreen} />}
            />    
            <Route
              path="/admin/classify"
              element={<PrivateRouteAdmin component={ClassifyScreen} />}
            />    
            <Route
              path="/admin/goals"
              element={<PrivateRouteAdmin component={GoalsScreen} />}
            />    
            <Route
              path="/admin/edit"
              element={<PrivateRouteAdmin component={EditRegisterScreen} />}
            />    
            <Route
              path="/admin/consecutive"
              element={<PrivateRouteAdmin component={ConsecutiveScreen} />}
            />   
            <Route
              path="/admin/rstpsw"
              element={<PrivateRouteAdmin component={PasswordScreen} />}
            />

            <Route
              path="/dir/numeralia"
              element={<PrivateRouteDir component={NumeraliaUsersScreen} />}
            />
            <Route
              path="/dir/agreggate"
              element={<PrivateRouteDir component={AgreggateScreen} />}
            />
            <Route
              path="/dir/rstpsw"
              element={<PrivateRouteDir component={PasswordScreen} />}
            />
            <Route
              path="/dir/edit"
              element={<PrivateRouteDir component={EditUserScreen} />}
            />
            <Route
              path="/dir/goals"
              element={<PrivateRouteDir component={GoalsUserScreen} />}
            />
            <Route
              path="/dir/query"
              element={<PrivateRouteDir component={QueryUserScreen} />}
            />
            <Route
              path="/sub/numeralia"
              element={<PrivateRouteSub component={NumeraliaUsersScreen} />}
            />
            <Route
              path="/sub/agreggate"
              element={<PrivateRouteSub component={AgreggateScreen} />}
            />
            <Route
              path="/sub/rstpsw"
              element={<PrivateRouteSub component={PasswordScreen} />}
            />
            <Route
              path="/sub/goals"
              element={<PrivateRouteSub component={GoalsUserScreen} />}
            />
            <Route
              path="/sub/query"
              element={<PrivateRouteSub component={QueryUserScreen} />}
            />
            <Route
              path="/jud/numeralia"
              element={<PrivateRoutJud component={NumeraliaUsersScreen} />}
            />
            <Route
              path="/jud/agreggate"
              element={<PrivateRoutJud component={AgreggateScreen} />}
            />
            <Route
              path="/jud/rstpsw"
              element={<PrivateRoutJud component={PasswordScreen} />}
            />

            <Route
              path="/user/numeralia"
              element={<PrivateRouteUser component={NumeraliaUsersScreen} />}
            />
            <Route
              path="/user/agreggate"
              element={<PrivateRouteUser component={AgreggateScreen} />}
            />
            <Route
              path="/user/rstpsw"
              element={<PrivateRouteUser component={PasswordScreen} />}
            />
            <Route
              path="/docview"
              element={<PrivateRouteAdmin component={RegisterViewScreen} />}
            />
              <Route
                  path="*"
                  element={<Navigate to="/" />}
              />
          </Routes>
      </Router>
    </Provider>
  );
}
