
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';
import { LOGOUT } from '../actions/types';
import Spinner from '../components/ui/Spinner';


const PrivateRouteAdmin = ({
  component: Component,
  auth: { isAuthenticated, loading, user}
}) => {
    
    if (loading) return <Spinner />
    if (!isAuthenticated) return <Navigate to="/" />;
    if( ( user ?( Number(user.Nivel) !== 0 ):'' ) ){
         store.dispatch({ type: LOGOUT }); 
        return <Navigate to="/" />;
    }  
    if (isAuthenticated) return <Component />;
};

PrivateRouteAdmin.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({    
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);