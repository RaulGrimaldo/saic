import React from 'react';
import RegisterScreen from '../../register/RegisterScreen';
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();

const DashboardScreen = () => {
    return (
        <>
           <RegisterScreen  key={id}/>
        </>
    )
}

export default DashboardScreen
