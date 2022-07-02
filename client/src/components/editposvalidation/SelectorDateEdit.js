import React from 'react';
import {Form, DatePicker, Input } from 'antd';

const configFecha = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Fecha inicial requerida',
      },
    ],
};

const dateFormat = 'DD/MM/YYYY';


const SelectorDateEdit = ({setFechaQuery, queryedit}) => {

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        
        queryedit(values);

    };

    function onChange(date, dateString) {
           
        if(date){
            form.setFieldsValue({
                Fecha: dateString
            });
            setFechaQuery(form.getFieldsValue());
            onFinish(form.getFieldsValue());
            
        } else{

            form.setFieldsValue({
                Fecha: undefined
            });
            setFechaQuery(null);
                
        }
        
    }

    return (
        <>
            <Form
                form={form}
                name="control-hooks"
                layout="vertical"
                onFinish={onFinish}
            >
            <div className='row'>
                <div className='col'>
                    <Form.Item 
                        name="FechaSelector" 
                        label="Fecha"
                        {...configFecha}
                    >
                
                        <DatePicker 
                            onChange={onChange} 
                            format={dateFormat} 
                            style={{width: '100%'}} 
                            size="default" 
                        />
                        
                    </Form.Item>
                    <Form.Item 
                        name="Fecha" 
                        hidden={true}
                    >
                        <Input 
                        size="default" 
                        disabled={true}
                        />  
                            
                    </Form.Item>
                </div>
            </div>
            </Form>
        </>
    )
}

export default SelectorDateEdit;