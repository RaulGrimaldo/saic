import React, { useEffect } from 'react';
import { Form, InputNumber} from 'antd';

const InformacionAsistentes = (
    {   asistenteshombres=0, asistentesmujeres=0, Asistentes=0,
        asistentes014=0, asistentes1518=0, asistentes1965=0,
        asistentes65mas=0, form}) => {

    useEffect(() => {
        setTimeout(() => {
            
            if(asistenteshombres !== 'undefined'){
                form.setFieldsValue({
                    asistenteshombres: asistenteshombres
                });
            }
            if(asistentesmujeres !== 'undefined'){
                form.setFieldsValue({
                    asistentesmujeres: asistentesmujeres
                });
            }
            if(Asistentes !== 'undefined'){
                form.setFieldsValue({
                    Asistentes: Asistentes
                });
            }
            if(asistentes014 !== 'undefined'){
                form.setFieldsValue({
                    asistentes014: asistentes014
                });
            }
            if(asistentes1518 !== 'undefined'){
                form.setFieldsValue({
                    asistentes1518: asistentes1518
                });
            }
            if(asistentes1965 !== 'undefined'){
                form.setFieldsValue({
                    asistentes1965: asistentes1965
                });
            }
            if(asistentes65mas !== 'undefined'){
                form.setFieldsValue({
                    asistentes65mas: asistentes65mas
                });
            }
            
        }, 1000);         
        // eslint-disable-next-line
        }, []
    );

    const changenumber = () => {

        form.setFieldsValue({
            Asistentes: Number(form.getFieldValue('asistentesmujeres')) + Number(form.getFieldValue('asistenteshombres'))
        });        
    }    
    
      
    return (
        <>
            <div className="row custom-collapse-content">

                <div className="col">

                    <Form.Item
                        name="asistentesmujeres"
                        label="N° de mujeres"
                        rules={[
                            {
                                required: true,
                                message: "N° requerido"
                            },
                        ]}                        
                            
                    >
                        <InputNumber 
                        onChange={changenumber}
                        style={{ width: '100%' }}   min={0} step={1} />
                    </Form.Item> 

                </div>
                <div className="col">

                    <Form.Item
                        name="asistenteshombres"
                        label="N° de hombres"
                        rules={[
                            {
                                required: true,
                                message: "N° requerido"
                            },
                        ]}
                        
                    >
                        <InputNumber
                        onChange={changenumber}
                        style={{ width: '100%' }}   min={0} step={1} />
                    </Form.Item> 
                </div>   
                
                <div className="col">

                    <Form.Item
                        name="Asistentes"
                        label="Total asistentes"
                        rules={[
                            {
                                required: true,
                                message: "Total requerido"
                            },
                        ]}
                        
                    >
                        <InputNumber disabled={true} style={{ width: '100%' }} />
                    </Form.Item>    
                </div>   

                <div className="col">
                    <br/>
                    <p></p>
                </div>          

            </div>

            <div className="row custom-collapse-content">

                <div className="col">

                    <Form.Item
                        name="asistentes014"
                        label="De 0-14 años"
                        rules={[
                            {
                                required: true,
                                message: "N° requerido"
                            },
                        ]}
                            
                    >
                        <InputNumber style={{ width: '100%' }}   min={0} step={1} />
                    </Form.Item> 

                </div>
                <div className="col">

                    <Form.Item
                        name="asistentes1518"
                        label="De 15-20 años"
                        rules={[
                            {
                                required: true,
                                message: "N° requerido"
                            },
                        ]}
                        
                    >
                        <InputNumber style={{ width: '100%' }}   min={0} step={1} />
                    </Form.Item> 
                </div>   
                
                <div className="col">

                    <Form.Item
                        name="asistentes1965"
                        label="De 21-65 años"
                        rules={[
                            {
                                required: true,
                                message: "Total requerido"
                            },
                        ]}
                        
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>    
                </div>   

                <div className="col">

                    <Form.Item
                        name="asistentes65mas"
                        label="De 65 y más años"
                        rules={[
                            {
                                required: true,
                                message: "Total requerido"
                            },
                        ]}
                        
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>    
                </div>          

            </div>
           
        </>
    )
}

export default InformacionAsistentes
