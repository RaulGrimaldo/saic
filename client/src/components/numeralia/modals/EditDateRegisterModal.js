import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {  Button, Input, Modal, Form } from 'antd'; 

import { updatedate, restartregister } from '../../../actions/register';
import SelectorLibre from '../selectorlibre/SelectorLibre';

const EditDateRegisterModal = (
    {user,  
    visibleEditDateRegisterModal,
    setVisibleEditDateRegisterModal,
    rowData={},
    updatedate, 
    restartregister,
    register: { updatedDate },
    QuincenaYear,z
}) => {
    const [form] = Form.useForm();
    const {_id, ID} = rowData;

    const [updateButton, setUpdateButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                id: _id,
              });
        }, 0);
    }, [rowData])

    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                id: _id,
              });
        }, 0);
    }, []);

    useEffect(() => {
        setUpdateButton(false);  
        return () => {
            setUpdateButton({}); 
          };   
    }, []);

    const onFinish = (values) => {

        setUpdateButton(true);
        updatedate(values);
        setTimeout(() => {
            setUpdateButton(false);
        }, 10000);   
    };

    if (updatedDate) { 
        console.log('yeseffect')   
        restartregister();
        setTimeout(() => {
            setVisibleEditDateRegisterModal(false);
        }, 200);    
    }
    return (
        <>
            <Modal
                title={'Cambiar fecha de: ' + ID}
                mask={false}
                style={{ top: 10 }}
                visible={visibleEditDateRegisterModal}
                onOk={() => setVisibleEditDateRegisterModal(false)}
                onCancel={() => setVisibleEditDateRegisterModal(false)}
                okButtonProps={{ disabled: true}}
                cancelButtonProps={{ disabled: true}}
                // el footer null oculta los botones por defecto del modal
                footer={null}
                width={1500}
                destroyOnClose={true}
                getContainer={false}
            >
                <Form
                    form={form}
                    preserve={false} 
                    name="control-hooks"
                    layout="vertical"
                    onFinish={onFinish}
                >
               
                    <div className="row">
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
                        <div className="col-6">
                            <SelectorLibre form={form} QuincenaYear={QuincenaYear} />
                        </div>
                        <div className="col-md-6">
                            <br />
                            <div className="row">
                                <div className="col">
                                    <Form.Item
                                    >                                                                
                                        <Button 
                                            disabled={updateButton}
                                            type="primary" 
                                            size="large" 
                                            block 
                                            htmlType="submit"
                                        >
                                            Cambiar fecha
                                        </Button>
                                    </Form.Item>
                                </div>
                                <div className="col">
                                    <Form.Item
                                    >
                                        <Button 
                                            type="secondary" 
                                            size="large" 
                                            block 
                                            onClick={() => setVisibleEditDateRegisterModal(false)}
                                        >
                                            Cancelar
                                        </Button>
                                    </Form.Item>
                                </div>
                                </div>
                            </div>
                    </div>

                </Form>                                       
            </Modal>
        </>
    )
}

EditDateRegisterModal.propTypes = {
    updatedate: PropTypes.func.isRequired,
    restartregister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    register: state.register,
    QuincenaYear: state.register.QuincenaYear
});

export default connect(mapStateToProps, { updatedate, restartregister })(EditDateRegisterModal);