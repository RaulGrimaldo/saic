import React from 'react';
import EditUserScreen from '../../editposvalidation/EditUserScreen';
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
 
const EditRegisterScreen = () => {
    return (
        <>
            <EditUserScreen key={id} />
        </>
    )
}

export default EditRegisterScreen
