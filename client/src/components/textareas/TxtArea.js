

import React, { useEffect } from 'react';
import { Form, Input} from 'antd';
const { TextArea } = Input;

export const TxtArea = ({ name, label, message, maxl, placeholder, form, value='undefined'}) => {
    
    useEffect(() => {
        if(value !== 'undefined'){
            form.setFieldsValue({
                [`${name}`]: value
            })
            ;
        }
        // eslint-disable-next-line
        }, []);

    return (

        <>
            <Form.Item        
                name={name}
                label={label}
                rules={[
                    {
                        required:  true,
                        message: `${message}`
                    },
                ]}
            >
                
                <TextArea       
                    placeholder={placeholder} 
                    showCount 
                    maxLength={maxl}
                />

            </Form.Item>
        </>
    )
}
    