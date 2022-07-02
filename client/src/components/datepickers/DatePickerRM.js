import React from 'react';
import {Form, DatePicker, message, notification, Input } from 'antd';

import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
import { quincena } from '../../helpers/dateInfo';

 
import dayjs from "dayjs";
import "dayjs/locale/es";
import moment from "moment";
import "moment/locale/es";
 

moment.locale("es");
dayjs.locale("es");



export const DatePickerRM = ({form, QuincenaYear}) => {
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
            const quincenaFechaSeleccionada = quincena(dateString)
            console.log(quincenaFechaSeleccionada)
            if((quincenaActual[0] === quincenaFechaSeleccionada[0]) && 
            (quincenaActual[1] === quincenaFechaSeleccionada[1]) &&
            (Number(quincenaFechaSeleccionada[2]) <= Number(quincenaActual[2]))){
                
                message.loading({ content: 'Revisando...', key });
                setTimeout(() => {
                    message.success({ content: "Pertenece a la quincena actual", key, duration: 2 });
                }, 1000);
                form.setFieldsValue({
                  FechaSimple: dateString
                });
            } else{
                message.loading({ content: 'Revisando...', key });
                setTimeout(() => {
                    message.error({ content: `${dateString} no pertenece a la quincena actual`, key, duration: 3 });
                    
                }, 1000);

                
                form.setFieldsValue({Fecha: null});
                form.setFieldsValue({
                  FechaSimple: undefined
                });
            }
            
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
