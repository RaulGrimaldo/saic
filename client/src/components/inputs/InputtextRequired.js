import React from 'react';
import { Form,  Input} from 'antd';

const InputtextRequired = (
    {
        message, placeholder, name, label, form, isHideen=false, isrequired=true
    }) => {
    return (
        <>
            <Form.Item
                name={name}
                label={label}   
                hidden={isHideen}              
                rules={[
                    {
                        required: isrequired,
                        message: `${message}`
                    },
                ]}
            >
                <Input 
                    size="default" 
                    placeholder={placeholder} 
                />                    
            </Form.Item> 
        </>
    )
}

export default InputtextRequired;
