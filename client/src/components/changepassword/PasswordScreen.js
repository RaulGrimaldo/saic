
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateuserpassword } from '../../actions/usersdata';
import { message, Popconfirm, Form, Input, Button } from 'antd';

import { MailOutlined } from '@ant-design/icons';
import NavbarUsers from '../ui/NavbarUsers';

const PasswordScreen = ({ auth: { isAuthenticated }, updateuserpassword, user }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if(user){
            form.setFieldsValue({
                id: user._id,
                email: user.email
              });
        }
    }, [user]);

      // Manejo del estado del formulario para poder pasar los valores cuando se confirma
    // el envio del formulario
    const [formvalues, setFormvalues] = useState();
    
    // manejar la visibilidad del mensaje de confirmación
    const [visiblePop, setVisiblePop] = useState(false);

    //Revisar si las contraseñas coinciden
    const onFinish = async (values) => {
        if (values.password !== values.password2) {
            const key = 'updatable';
            message.loading({ content: 'Revisando...', key });
            setTimeout(() => {
                message.error({ content: 'las contraseñas no coinciden', key, duration: 3 });
                
            }, 1000);            
        } else {
            setVisiblePop(true);
            setFormvalues(values);
        }               
    };    

    // Si se confirma el mensaje, ocultar mensaje, enviar datos del registro,
    // ascender la pantalla para dispositivo móvil
    const confirm = () =>{
        setVisiblePop(false);   
        console.log(formvalues)     
        updateuserpassword(formvalues);
        window.scrollTo(0, 0);     
    }

    //Si presiona no simplemente ocultar la ventana de confirmación
    const cancel = () =>{
        setVisiblePop(false);
    }    

    return (
        <>
        
        <NavbarUsers />
            <div className="card-body">             
               <Form          
                   onFinish={onFinish}
                   name="edituserpassword"
                   form={form}
                   autoComplete="off"
                   layout="vertical"
               >
               
               <h4 className="mt-2 text-center">Editar contraseña de usuario</h4>
               
               
               <div className="row g-4 mt-2 cardadduser ">
                <div className="col"></div>
                   <div className="col-md-6">
                   <Form.Item
                           className="ml-2 "
                           label="Correo electrónico"
                           name="email"
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
                           <Input
                           disabled
                               size="large"
                               prefix={<MailOutlined />} type="email"
                               placeholder="Correo electrónico"
                           />
                    </Form.Item>
                       
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
                                label="Nueva contraseña"
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
                                    size="large"
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
                                    size="large"
                                    placeholder="Contraseña"
                                />
                            </Form.Item>
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
                                   title="Seguro que quieres actualizar la contraseña"
                                   visible={visiblePop}
                                   onConfirm={confirm}
                                   onCancel={cancel}
                                   size="large"
                                   onVisibleChange={() => console.log('visible change')}
                               >
                               </Popconfirm>
                           </Form.Item>
                       </div>
                   </div>
                   </div> 
                   <div className="col"></div>                     
               </div>
               
               </Form>                
           </div>
        </> 
    )

}
PasswordScreen.propTypes = {
    updateuserpassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
});

export default connect(mapStateToProps, { updateuserpassword })(PasswordScreen);
