import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {  Button, Input, Modal, Form } from 'antd'; 
import { SelectInd } from '../../selectors/SelectInd';

import { classifyOne, restartregister } from '../../../actions/register';

const ClassifyRegisterModal = (
    {user,  
    visibleClassifyModal,
    setVisibleClassifyModal,
    rowData={},
    classifyOne, 
    restartregister,
    register: { updatedClassify },
}) => {
    const [form] = Form.useForm();
    const {_id, ID, Etapa, uniclas, descclas, nomclas, areaclas, temaclas, publicodirigido} = rowData;

    const [updateButton, setUpdateButton] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            id: _id,
            descclas: descclas,
            nomclas: nomclas,
            areaclas: areaclas,
            temaclas: temaclas,
            publicodirigido: publicodirigido
          });
    }, [rowData])

    useEffect(() => {
        form.setFieldsValue({
            descclas: descclas,
            nomclas: nomclas,
            areaclas: areaclas,
            temaclas: temaclas,
            publicodirigido: publicodirigido
          });
    }, [])



    useEffect(() => {
        setUpdateButton(false);  
        return () => {            
            setUpdateButton({}); 
        }  
    }, []);

    const onFinish = (values) => {
        setUpdateButton(true);
        classifyOne(values);
        setTimeout(() => {
            setUpdateButton(false);
        }, 10000);   
    };

    if (updatedClassify) {    
        restartregister();
        setTimeout(() => {
            setVisibleClassifyModal(false);
        }, 200);    
    }
    return (
        <>
            <Modal
                title={'Clasificar: ' + ID}
                mask={false}
                style={{ top: 10 }}
                visible={visibleClassifyModal}
                onOk={() => setVisibleClassifyModal(false)}
                onCancel={() => setVisibleClassifyModal(false)}
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
                    <div className='row'>
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
                    <div className='col-1'>
                        <SelectInd
                            form={form}
                            value={Etapa}
                            direccion={user.direccion}
                            message="Etapa es requerida"
                            placeholder="Seleccionar etapa"
                            name="Etapa"
                            label="Etapa" 
                        />
                    </div>
                    <div className="col">
                        <SelectInd
                            form={form}
                            value={descclas}
                            direccion={user.direccion}
                            message="Descripción es requerido"
                            placeholder="Seleccionar Descripción"
                            name="descclas"
                            label="Descripción de actividad" 
                        />     
                    </div>
                    <div className='col'>
                        <SelectInd
                            form={form}
                            value={nomclas}
                            direccion={user.direccion}
                            message="Nombre es requerido"
                            placeholder="Seleccionar nombre"
                            name="nomclas"
                            label="Nombre de la actividad" 
                        />      
                </div>
                    <div className='col'>
                    <SelectInd
                        form={form}
                        value={uniclas}
                        direccion={user.direccion}
                        message="Unidad de medida es requerida"
                        placeholder="Seleccionar unidad de medida"
                        name="uniclas"
                        label="Unidad de medida" 
                    />
                    </div>
                    <div className="col">
                    <Form.Item                    
                        name="areaclas"
                        label="Área de solicitud"                    
                        rules={[
                            {
                                required:  true,
                                message: "Campo requerido"
                            },
                        ]}
                    >
                        <Input 
                            value={areaclas}
                            size="default" 
                            placeholder="Ingrese área" 
                        />                    
                    </Form.Item>
                    </div>                    
                </div> 
                <div className="row">
                <div className="col">
                    <Form.Item                    
                        name="temaclas"
                        label="Tema de solicitud"                    
                        rules={[
                            {
                                required:  true,
                                message: "Campo requerido"
                            },
                        ]}
                    >
                        <Input 
                            value={temaclas}
                            size="default" 
                            placeholder="Ingrese tema" 
                        />                    
                    </Form.Item>
                    </div>
        <div className="col">
            <Form.Item
            >
                <SelectInd
                            value={"undefined"}
                            direccion={user.direccion}
                            message="Público es requerido"
                            placeholder="Seleccionar público"
                            name="publicodirigido"
                            label="Público objetivo"
                        />
            </Form.Item>
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
                    Clasificar
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
                    onClick={() => setVisibleClassifyModal(false)}
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

ClassifyRegisterModal.propTypes = {
    classifyOne: PropTypes.func.isRequired,
    restartregister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    register: state.register,
});

export default connect(mapStateToProps, { classifyOne, restartregister })(ClassifyRegisterModal);

