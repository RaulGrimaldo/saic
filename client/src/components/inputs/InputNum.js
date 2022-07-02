import React, { useEffect } from 'react';
import { Form, InputNumber} from 'antd';

export const InputNum = ({ name, label, message, min, step, form, 
    value='undefined', isHideen=false, isrequired=true 
}) => {
    //Evitar este set para no poner un default validado

            

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
                <InputNumber style={{ width: '100%' }}   min={min} step={step} />
            </Form.Item>

    )
}
