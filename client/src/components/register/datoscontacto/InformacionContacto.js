import React, { useState, useEffect } from 'react';
import { Form,  Input, AutoComplete} from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Option } = AutoComplete;






const InformacionContacto = (
    {   Contacto='undefined',
        Cargo='undefined',
        Email='N/A',
        Telefono='N/A',
        form
    }) => {


    const [result, setResult] = useState([]);

    const handleSearch = (value) => {
        let res = [];
        
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['gmail.com', 'hotmail.com', 'outlook.com', 
                    'outlook.es', 'aefcm@.bob.mx', 'yahoo.com.mx',
                    'cfe.mx'].map((domain) => `${value}@${domain}`);
        }
        
        setResult(res);
    };

    useEffect(() => {
        if(Contacto !== 'undefined'){
            form.setFieldsValue({
                "Contacto": Contacto
            });
        }
        if(Cargo !== 'undefined'){
            form.setFieldsValue({
                "Cargo": Cargo
            });
        }
        if(Email !== 'N/A'){
            form.setFieldsValue({
                "Email": Email
            });
        }
        if(Telefono !== 'N/A'){
            form.setFieldsValue({
                "Telefono": Telefono
            });
        }
    // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="row custom-collapse-content">

                <div className="col">
                    <Form.Item                    
                        name="Contacto"
                        label="Contacto"                    
                        rules={[
                            {
                                required:  true,
                                message: "Campo requerido"
                            },
                        ]}
                    >
                        <Input 
                            value={Contacto}
                            size="default" 
                            placeholder="Ingrese el nombre del contacto" 
                        />                    
                    </Form.Item>
                </div>

                <div className="col">
                    <Form.Item                    
                        name="Cargo"
                        label="Cargo"                    
                        rules={[
                            {
                                required:  true,
                                message: "Cargo requerido"
                            },
                        ]}
                    >
                        <Input 
                            value={Cargo}
                            size="default" 
                            placeholder="Ingrese el cargo del contacto" 
                        />                    
                    </Form.Item>
                </div>

                <div className='col'>

                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                            {
                                required: false,
                                message: 'Ingresar el correo electrónico'
                            },
                            {
                                pattern: new RegExp("^[a-zA-ZñÑ-ú\-0-9@_. ]*$"),
                                message: "El campo no coincide con el patrón"
                            }
                        ]}
                    >
                        <AutoComplete
                            onSearch={handleSearch}
                            placeholder="Ingrese email"
                            size="default"
                            value={Email}
                            prefix={<MailOutlined />} type="email"
                            >
                            {result.map((email_) => (
                                <Option key={email_} value={email_}>
                                    {email_}
                                </Option>
                            ))}
                        </AutoComplete>
                    </Form.Item>

                </div>

                <div className="col">
                    <Form.Item                    
                        name="Telefono"
                        label="Teléfono"                    
                        rules={[
                            {
                                required:  false,
                                message: "Campo requerido"
                            },
                        ]}
                    >
                        <Input 
                            value={Telefono}
                            size="default" 
                            placeholder="Ingrese el teléfono del contacto" 
                        />                    
                    </Form.Item>
                </div>
                
            </div>
        </>
    )
}

export default InformacionContacto;
