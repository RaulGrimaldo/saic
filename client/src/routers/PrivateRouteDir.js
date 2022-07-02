/* import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';
import { LOGOUT } from '../actions/types';


const PrivateRouteDir = (
    {
    component: Component,
    auth: { isAuthenticated, loading }, user,
    ...rest
}) => (

    
    <Route
        {...rest}
        render={props =>
            (((!isAuthenticated) && (!loading)) || (user ?(Number(user.Nivel) !== 1): false)) ? (                              
                store.dispatch({ type: LOGOUT }),
                <Redirect to='/' />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PrivateRouteDir.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
});

export default connect(mapStateToProps)(PrivateRouteDir); */

import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';
import { LOGOUT } from '../actions/types';
import Spinner from '../components/ui/Spinner';

const PrivateRouteDir = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
}) => {

    if (loading) return <Spinner />
    if (!isAuthenticated) return <Navigate to="/" />;
    if( ( user ?( Number(user.Nivel) !== 1 ):'' ) ){
         store.dispatch({ type: LOGOUT }); 
        return <Navigate to="/" />;
    }  
    if (isAuthenticated) return <Component />;
};

PrivateRouteDir.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({    
    auth: state.auth,
    user: state.auth.user
});

export default connect(mapStateToProps)(PrivateRouteDir);

