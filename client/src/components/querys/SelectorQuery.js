import React from 'react';
import {Form, DatePicker, message, notification, Input } from 'antd';

import {
    QuestionCircleOutlined
} from '@ant-design/icons';

import dayjs from "dayjs";
import "dayjs/locale/es";
import moment from "moment";
import "moment/locale/es";
import CheckStrategy from '../selectors/CheckStrategy';
 

moment.locale("es");
dayjs.locale("es");

const configFechaI = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Fecha inicial requerida',
      },
    ],
};

const configfechaF = {
    rules: [
        {
        type: 'object',
        required: true,
        message: 'Fecha final requerida',
        },
    ],
};

const openNotification = () => {
    notification.open({
      message: 'Información',
      description:
        'Seleccione primero la fecha inicial y posteriormente la fecha final, la fecha inicial debe ser menor a la fecha final',
        duration: 8,
    });
};

const dateFormat = 'DD/MM/YYYY';


const SelectorQuery = ({queryregisters='undefined', informativas='NO', user='', queryregistersfull='undefined', queryagreggate='undefined', setIsTableLoading}) => {

    const [form] = Form.useForm();
    
    const onFinish = async (values) => {
        setIsTableLoading(true);
        if(queryregisters !== 'undefined'){             
            queryregisters(values);
        }

        if(queryregistersfull !== 'undefined'){
            queryregistersfull(values);
            
        }

        if(queryagreggate !== 'undefined'){
            queryagreggate(values);
            
        }

    };
    
    function onChange(date, dateString) {                   
    
        if(date){
            form.setFieldsValue({
                FechaInicial: dateString
              });
            form.setFieldsValue({FechaF: null});
                form.setFieldsValue({
                  fecharango: undefined
                });
            
        } else{

                form.setFieldsValue({
                  FechaInicial: undefined
                });
                form.setFieldsValue({FechaF: null});

                form.setFieldsValue({
                  fecharango: undefined
                });
                
        }
        
    }

    function onChange2(date, dateString) {
           
        const key = 'updatable';
        const FechaInit = form.getFieldValue('FechaInicial')
     
        if(date && FechaInit){

            let rangedayI = FechaInit.slice(0, 2);
            let rangemonthI = FechaInit.slice(3, 5);
            let rangeyearI = FechaInit.slice(6, 10);
            let RangeI = rangeyearI + rangemonthI + rangedayI;
        
            let rangedayF = dateString.slice(0, 2);
            let rangemonthF = dateString.slice(3, 5);
            let rangeyearF = dateString.slice(6, 10);
            let RangeF = rangeyearF + rangemonthF + rangedayF;

            if(Number(RangeI) > Number(RangeF)){
                form.setFieldsValue({FechaF: null});

                form.setFieldsValue({
                  fecharango: undefined
                });

                form.setFieldsValue({FechaI: null});

                form.setFieldsValue({
                  FechaInicial: undefined
                });

                message.loading({ content: 'Revisando...', key });

                setTimeout(() => {
                    message.error({ content: `Fecha incial mayor a la final`, key, duration: 3 });
                    
                }, 1000);

            } else{     

                form.setFieldsValue({
                    fecharango: dateString
                });

                onFinish(form.getFieldsValue());
            }
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
                {
                    Number(user.Nivel) === 0 ? 

                    <CheckStrategy 
                        form={form}
                        value={informativas}
                        name="informativas"
                        label="Informativas" 
                    />
                        
                    : ''
                }
                
                <div className='col'>
                    
                
                    <Form.Item 
                        name="FechaI" 
                        label="Fecha inicial"
                        tooltip={{icon: <QuestionCircleOutlined  onClick={openNotification} size="default"/>  }}
                        {...configFechaI}
                    >
                
                        <DatePicker 
                            onChange={onChange} 
                            format={dateFormat} 
                            style={{width: '100%'}}  
                            size="default" 
                        />
                        
                    </Form.Item>

                    <Form.Item 
                        name="FechaInicial" 
                        hidden={true}
                    >
                        <Input 
                        size="default" 
                        disabled={true}
                        />  
                            
                    </Form.Item>

                </div>
                <div className='col'>
                    <Form.Item 
                        name="FechaF" 
                        label="Fecha final"
                        {...configfechaF}
                    >
                
                        <DatePicker 
                            onChange={onChange2} 
                            format={dateFormat} 
                            style={{width: '100%'}} 
                            size="default" 
                        />
                        
                    </Form.Item>
                    <Form.Item 
                        name="fecharango" 
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

export default SelectorQuery;
