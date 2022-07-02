import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateuserdata } from '../../actions/usersdata';
import { Modal, Popconfirm, Form, Input, Button, Checkbox, Switch } from 'antd';

import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { SelectDep } from '../selectors/TwoSelectsDep';

const EditUserModal = (
    {   updateuserdata, 
        setVisibleEditModal, 
        visibleEditModal, 
        rowData={id: "",
            username: "",
            email: "",
            ROL: "",
            jud: "",
            numeroEmpleadoPlaca: "",
            phonenumber: "",
            active: true,
            mirror: false
        } 
    }) => {
    
    const [form] = Form.useForm();

    const {username, email, ROL, jud, numeroEmpleadoPlaca, phonenumber, mirror, active, _id} = rowData;
    
    //manejo del estado del selector del espejo
    const [checkMirror, setCheckMirror] = useState(false);

    const onCheckboxMirrorChange = (e) => {
        setCheckMirror(e.target.checked);
        form.setFieldsValue({
            mirror: e.target.checked
          });
    }; 
    //manejo del estado activo del usuario
    const [checkActive, setCheckActive] = useState(true);

    const onCheckboxActiveChange = (e) => {
        setCheckActive(!checkActive);
        form.setFieldsValue({
            active: !checkActive
        });
    };

    useEffect(() => {
        setCheckMirror(mirror);
        setCheckActive(active);
        form.setFieldsValue({
            id: _id,
            username: username,
            email: email,
            ROL: ROL,
            jud: jud,
            numeroEmpleadoPlaca: numeroEmpleadoPlaca,
            phonenumber: phonenumber,
            mirror: mirror,
            active: active
        });
        return () => {
            setCheckMirror({});
            setCheckActive({});
        }
    }, [rowData])

    // Manejo del estado del formulario para poder pasar los valores cuando se confirma
    // el envio del formulario
    const [formvalues, setFormvalues] = useState();
    
    // manejar la visibilidad del mensaje de confirmación
    const [visiblePop, setVisiblePop] = useState(false);

    // manejar un estado para revisar el cambio del responseSetUsers

    //Revisar si las contraseñas coinciden
    const onFinish = async (values) => {
        setFormvalues(values);
        setVisiblePop(true);        
    };    

    // Si se confirma el mensaje, ocultar mensaje, enviar datos del registro,
    // ascender la pantalla para dispositivo móvil
    const confirm = () =>{
        setVisiblePop(false);        
        updateuserdata(formvalues);
        window.scrollTo(0, 0);     
    }

    //Si presiona no simplemente ocultar la ventana de confirmación
    const cancel = () =>{
        setVisiblePop(false);
    }    

    
    return (
        <>
            <Modal
                centered
                visible={visibleEditModal}
                onOk={() => setVisibleEditModal(false)}
                onCancel={() => setVisibleEditModal(false)}
                okButtonProps={{ disabled: true}}
                cancelButtonProps={{ disabled: true}}
                // el footer null oculta los botones por defecto del modal
                footer={null}
                width={1000}
                getContainer={false}
            >
                <div className="card-body">             
                    <Form          
                        onFinish={onFinish}
                        name="edituser"
                        form={form}
                        autoComplete="off"
                        layout="vertical"
                    >
                    
                        <h4 className="mt-2 text-center">Editar usuario</h4>
                                        
                        <div className="row g-4 mt-2 cardadduser ">
                    
                            <div className="col-md-6 ">
                                <Form.Item
                                    hidden
                                    label="id"
                                    name="id"                           
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input
                                    />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Nombre completo"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa el nombre completo',
                                        },
                                        {
                                            pattern: new RegExp("^[a-zA-ZñÑ-ú ]*$"),
                                            message: "El campo no coincide con el patrón"
                                        }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Ingrese nombre completo"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="ml-2 mt-2"
                                    label="N° de empleado / Placa"
                                    name="numeroEmpleadoPlaca"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa el n° de empleado ó placa',
                                        },
                                        {
                                            pattern: new RegExp("^[0-9 ]*$"),
                                            message: "El campo no coincide con el patrón"
                                        }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Ingrese número de placa o empleado"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="ml-2 mt-2"
                                    label="Número de teléfono"
                                    name="phonenumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa el número de teléfono',
                                        },
                                        {
                                            pattern: new RegExp("^[0-9 ]*$"),
                                            message: "El campo no coincide con el patrón"
                                        }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Ingrese número telefónico"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="ml-2 mt-2"
                                    label="Correo electrónico"
                                    name="email"
                                    rules={[
                                        {                                        
                                            required: true,
                                            message: 'Ingresar el correo electrónico'
                                        },
                                        {
                                            pattern: new RegExp("^[a-zA-ZñÑ-ú\-0-9@_. ]*$"),
                                            message: "El campo no coincide con el patrón"
                                        }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />} type="email"
                                        placeholder="Ingrese email"
                                    />
                                </Form.Item>
                            
                            </div>
                            <div className="col-md-6">
                                <SelectDep
                                    form={form}
                                    direccion="DVC"
                                    indMessage="Rol es requerido"
                                    indPlaceholder="Seleccionar rol"
                                    indName="ROL"
                                    indLabel="Rol"
                                    depMessage="Mando es requerido"
                                    depPlaceholder="Seleccionar mando"
                                    depName="jud"
                                    depLabel="Mando" 
                                />  
                                <div className="row text-center">
                                    <div className="col">
                                        <Form.Item
                                            name="mirror"

                                        >
                                            <Checkbox checked={checkMirror} onChange={onCheckboxMirrorChange}>Espejo</Checkbox>
                                         </Form.Item>
                                    </div>
                                    <div className="col">
                                        <Form.Item
                                            name="active"

                                        >
                                            <Switch checked={checkActive} onChange={onCheckboxActiveChange} checkedChildren="Activo" unCheckedChildren="Baja" />
                                        </Form.Item>
                                    </div>
                                </div>    
                                <div className="row">
                                <div className="col">
                                    <Form.Item
                                    >                                                                
                                        <Button 
                                            type="primary" 
                                            size="large" 
                                            block 
                                            htmlType="submit"
                                        >
                                            Actualizar
                                        </Button>
                                        <Popconfirm
                                            title="Seguro que quieres editar este usuario"
                                            visible={visiblePop}
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            size="large"
                                            onVisibleChange={() => console.log('visible change')}
                                        >
                                        </Popconfirm>
                                    </Form.Item>
                                </div>
                                <div className="col">
                                    <Form.Item
                                    >
                                        <Button 
                                            type="secondary" 
                                            size="large" 
                                            block 
                                            onClick={() => setVisibleEditModal(false)}
                                        >
                                            Cancelar
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>                      
                            </div>
                            
                    </div>
                    
                    </Form>                
                </div>
            </Modal>
       
        </>
    )
}

EditUserModal.propTypes = {
    updateuserdata: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { updateuserdata })(EditUserModal);