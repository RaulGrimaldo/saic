
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';
import { LOGOUT } from '../actions/types';
import Spinner from '../components/ui/Spinner';

const PrivateRouteUser = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
}) => {
    if (loading) return <Spinner />
    if (!isAuthenticated) return <Navigate to="/" />;
    if( ( user ?( Number(user.Nivel) !== 4 ):'' ) ){
         store.dispatch({ type: LOGOUT }); 
        return <Navigate to="/" />;
    }  
    if (isAuthenticated) return <Component />;
};

PrivateRouteUser.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({    
    auth: state.auth,
    user: state.auth.user
});

export default connect(mapStateToProps)(PrivateRouteUser);