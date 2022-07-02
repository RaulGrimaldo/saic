import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register, restart } from '../../actions/usersdata';
import { message, Modal, Popconfirm, Form, Input, Button, Checkbox } from 'antd';

import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { SelectDep } from '../selectors/TwoSelectsDep';


const AddUserModal = ({ register, restart, restartuser, setVisible, visible }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            mirror: false
        });
    }, [])



    // Manejo del estado del formulario para poder pasar los valores cuando se confirma
    // el envio del formulario
    const [formvalues, setFormvalues] = useState();

    // manejar la visibilidad del mensaje de confirmación
    const [visiblePop, setVisiblePop] = useState(false);

    //manejo del estado del selector del espejo
    const [checkMirror, setCheckMirror] = useState(false);

    const onCheckboxMirrorChange = (e) => {
        setCheckMirror(e.target.checked);
        form.setFieldsValue({
            mirror: e.target.checked
        });
    };

    
    //Revisar si las contraseñas coinciden
    const onFinish = async (values) => {

        if (values.password !== values.password2) {
            console.log(values)
            const key = 'updatable';
            message.loading({ content: 'Revisando...', key });
            setTimeout(() => {
                message.error({ content: 'las contraseñas no coinciden', key, duration: 3 });

            }, 500);
        } else {
            setVisiblePop(true);
            setFormvalues(values);
        }

    };

    // Si se confirma el mensaje, ocultar mensaje, enviar datos del registro,
    // ascender la pantalla para dispositivo móvil
    const confirm = () => {
        setVisiblePop(false);
        register(formvalues);
        window.scrollTo(0, 0);
    }

    //Si presiona no simplemente ocultar la ventana de confirmación
    const cancel = () => {
        setVisiblePop(false);
    }


    //Si la respuesta es positiva limpiar el formulario para cargar nuevo usuario
    if (restartuser) {

        form.resetFields();
        setTimeout(() => {
            setCheckMirror(false);
            form.setFieldsValue({
                mirror: false,
            });
        }, 500);
        window.scrollTo(0, 0);
        restart();

    }



    return (
        <>
            <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                // el footer null oculta los botones por defecto del modal
                footer={null}
                width={1000}
                getContainer={false}
            >
                <div className="card-body">
                    <Form
                        onFinish={onFinish}
                        name="adduser"
                        form={form}
                        autoComplete="off"
                        layout="vertical"
                    >

                        <h4 className="mt-2 text-center">Agregar usuario</h4>


                        <div className="row g-4 mt-2 cardadduser ">

                            <div className="col-md-6 ">
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
                                        size="default"
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
                                        size="default"
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
                                        size="default"
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
                                        size="default"
                                        prefix={<MailOutlined />} type="email"
                                        placeholder="Ingrese email"
                                    />
                                </Form.Item>


                            </div>
                            <div className="col-md-6">
                                <SelectDep
                                    form={form}
                                    direccion="DGPC"
                                    indMessage="Rol es requerido"
                                    indPlaceholder="Seleccionar rol"
                                    indName="ROL"
                                    indLabel="Rol"
                                    depMessage="Mando es requerido"
                                    depPlaceholder="Seleccionar mando"
                                    depName="jud"
                                    depLabel="Mando"
                                />
                                <Form.Item
                                    label="Contraseña"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresar contraseña',
                                        },
                                        {
                                            pattern: new RegExp("^[a-zA-ZñÑ-ú\-0-9@_. ]*$"),
                                            message: "El campo no coincide con el patrón"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        size="default"
                                        placeholder="Contraseña"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Confirmar contraseña"
                                    name="password2"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Confirmar contraseña',
                                        },
                                        {
                                            pattern: new RegExp("^[a-zA-ZñÑ-ú\-0-9@_. ]*$"),
                                            message: "El campo no coincide con el patrón"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        size="default"
                                        placeholder="Contraseña"
                                    />
                                </Form.Item>
                                
                            </div>
                            <div className="col-md-6">                            
                                <div className="row text-center">
                                        <Form.Item
                                            name="mirror"

                                        >
                                            <Checkbox checked={checkMirror} onChange={onCheckboxMirrorChange}>Espejo</Checkbox>
                                         </Form.Item>

                                   
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                        >
                                            <Button
                                                type="primary"
                                                size="default"
                                                block
                                                htmlType="submit"
                                            >
                                                Agregar
                                            </Button>
                                            <Popconfirm
                                                title="Seguro que quieres agregar al usuario"
                                                visible={visiblePop}
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                size="default"
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
                                                size="default"
                                                block
                                                onClick={() => setVisible(false)}
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


AddUserModal.propTypes = {
    register: PropTypes.func.isRequired,
    response: PropTypes.bool,
    restart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    restartuser: state.usersdata.restartuser
});

export default connect(mapStateToProps, { register, restart })(AddUserModal);