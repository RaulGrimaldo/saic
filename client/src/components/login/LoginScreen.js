
import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alertd from '../ui/Alertd';

import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { orgData } from '../../data/formInfo';

import "./loginStyles.css";
import 'animate.css';
import store from '../../store';
import setAuthToken from '../../utils/setAuthToken';
import { LOGOUT } from '../../actions/types';
const orgData_ = orgData();

const nombreOrgEmp = orgData_[0];

const nombreSistema = orgData_[1];

const titulo1 = orgData_[2];

const titulo2 = orgData_[3];
const LoginScreen = ({ login, isAuthenticated, user }) => {

    const onSubmit = async (values) => {

        login(values.email, values.password);

    };

    if (isAuthenticated) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            if(user){
                return <Navigate to={"/" + user.baseURL + '/numeralia'} />;
            }
          }
         
      
          // log user out from all tabs if they log out in one tab
          window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
            <Navigate to='/' />
          });
    }

    return (
        <>
            <div className="row row-cols-md-2 g-1">
                <div className="col-md-4">
                    <div className="card h-130 logincard animate__animated animate__fadeInLeft">
                        <div className="card-body login">
                            <Alertd />
                            <div className="card-header text-center">
                                <h6>Acceso</h6>
                            </div>
                            <Form
                                name="basic"
                                onFinish={e => onSubmit(e)}
                                autoComplete="off"
                                layout="vertical"
                            >
                                <Form.Item
                                    className="ml-2 mt-2"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa el correo electrónico',
                                        },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />} type="email"
                                        placeholder="Correo electrónico"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresar contraseña',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Contraseña"
                                    />
                                </Form.Item>

                                <Form.Item
                                >
                                    <Button type="primary" size="large" block htmlType="submit">
                                        Acceder
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 ">
                    <div className="card h-130 logincard animate__animated animate__fadeInRight">
                        <div className="card-body">
                            <div className="card-header text-center ">
                                <h2>{nombreOrgEmp}</h2>
                                {/* <h6>{nombreSistema}</h6> */}
                            </div>
                            <div className=" card-body estructura" >
                                <div className="row">
                                    <img className="form-group logodep" src="../assets/logodep.png" alt="../assets/logodep.png" />
                                </div>
                                <p className="paraph">{titulo1}</p><br />
                                <p className="paraph">{titulo2}</p><br />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

LoginScreen.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { login })(LoginScreen);