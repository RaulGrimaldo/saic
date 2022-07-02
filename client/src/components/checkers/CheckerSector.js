import React from 'react';
import { Form, Input , notification, Tooltip, Button} from 'antd';
import { establecerSector } from '../../helpers/establecerSector';

const CheckerSector = ({name, message, form, cuadrante='undefined'}) => {


    const CheckSector = () => {                    

        if(cuadrante !== 'undefined'){

            const cuadranteSplit1 = cuadrante.split('-');

            const sector = establecerSector(cuadranteSplit1[0], cuadrante)
            const openNotification = () => {
                notification.open({
                message: 'Información',
                description:
                    'Sector: ' + `${sector}`,
                    duration: 8,
                });
            };
            openNotification();
            form.setFieldsValue({
                [`${name}`]: sector
            });
        } else{
            const openNotification = () => {
                notification.open({
                message: 'Información',
                description:
                    'Seleccione un cuadrante',
                    duration: 8,
                });
            };
            openNotification();
        }
        
    }; 
    return (
        <>
            <Form.Item
                    name={name}
                    label={
                    <Tooltip>
                        
                     <Button type="primary" size="small" onClick={CheckSector} >
                        Establecer sector 
                         </Button>
                    </Tooltip>
                    }                    
                    rules={[
                        {
                            required:  true,
                            message: `${message}`
                        },
                    ]}
                >
                    <Input 
                        size="default" 
                        placeholder={"Sector"} 
                        disabled={true}                        
                    /> 
                </Form.Item>  
        </>
    )
}

export default CheckerSector
