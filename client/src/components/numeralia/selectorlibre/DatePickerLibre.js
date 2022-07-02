import React from 'react';
import {Form, DatePicker, message, notification, Input } from 'antd';


import {
    QuestionCircleOutlined
  } from '@ant-design/icons';

 




export const DatePickerLibre = ({form, QuincenaYear}) => {
    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Fecha es requerida',
          },
        ],
      };

    const openNotification = () => {
        notification.open({
          message: 'Información',
          description:
            'La fecha debe estar dentro del rango de la quincena actual',
            duration: 8,
        });
      };

    const dateFormat = 'DD/MM/YYYY';

    function onChange(date, dateString) {
        
        const quincenaActual = QuincenaYear; //[quincenaactualnum, año, dia]
        
        const key = 'updatable';
        console.log(quincenaActual)
        if(date){
            message.loading({ content: 'Revisando...', key });
            setTimeout(() => {
                message.success({ content: "Listo para realizar la acción", key, duration: 2 });
            }, 1000);
            form.setFieldsValue({ 
              FechaSimple: dateString
            });
            
        }
        
    }
    
      
    return (
        <>           
        
          <Form.Item 
              name="Fecha" 
              label="Fecha"
              tooltip={{icon: <QuestionCircleOutlined  onClick={openNotification} size="default"/>  }}
              {...config}
          >
          
            <DatePicker 
              onChange={onChange} 
              format={dateFormat} 
              style={{width: '100%'}} 
              size="default" 
            />
                  
          </Form.Item>
          <Form.Item 
              name="FechaSimple" 
              hidden={true}
          >
            <Input 
              size="default" 
              disabled={true}
            />  
                  
          </Form.Item>
        </>
    );
}
