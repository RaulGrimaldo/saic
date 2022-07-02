

import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';
import { LOGOUT } from '../actions/types';
import Spinner from '../components/ui/Spinner';


const PrivateRoutJud = ({
  component: Component,
  auth: { isAuthenticated, loading, user}
}) => {
    console.log(isAuthenticated)
    if (loading) return <Spinner />
    if (!isAuthenticated) return <Navigate to="/" />;
    if( ( user ?( Number(user.Nivel) !== 3 ):'' ) ){
         store.dispatch({ type: LOGOUT }); 
        return <Navigate to="/" />;
    }  
    if (isAuthenticated) return <Component />;
};

PrivateRoutJud.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({    
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoutJud);

