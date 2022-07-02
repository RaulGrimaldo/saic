import React, { useState } from 'react';
import { connect } from 'react-redux';
import {  upsertconsecutive } from '../../../actions/consecutives';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Popconfirm } from 'antd';
import { SelectInd } from '../../selectors/SelectInd';;

const UpsertConsecutivesModal = (
    {   visible,
        setVisible, 
        upsertconsecutive
    }) => {

    const [form] = Form.useForm();


    // Manejo del estado del formulario para poder pasar los valores cuando se confirma
    // el envio del formulario
    const [formvalues, setFormvalues] = useState()
    //Revisar si las contraseñas coinciden
    const onFinish = async (values) => {
        setVisiblePop(true);
        setFormvalues(values);        
    };    

    // manejar la visibilidad del mensaje de confirmación
    const [visiblePop, setVisiblePop] = useState(false);


     // Si se confirma el mensaje, ocultar mensaje, enviar datos del registro,
    // ascender la pantalla para dispositivo móvil
    const confirm = () => {
        setVisiblePop(false);
        upsertconsecutive(formvalues);
    }

    //Si presiona no simplemente ocultar la ventana de confirmación
    const cancel = () => {
        setVisiblePop(false);
    }



    return (
        <>
             <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                okButtonProps={{ disabled: true}}
                cancelButtonProps={{ disabled: true}}
                // el footer null oculta los botones por defecto del modal
                footer={null}
                width={500}
                getContainer={false}
            >
               <Form          
                    onFinish={onFinish}
                    name="upsertConsecutive"
                    form={form}
                    autoComplete="off"
                    layout="vertical"
                >
                    
                    <h4 className="mt-2 text-center">Insertar o reiniciar consecutivo</h4>
                        <div className="row">
                            <div className="col-8">
                                <SelectInd
                                    direccion="DGPC"
                                    message="Área es requerido"
                                    placeholder="Seleccionar área"
                                    name="areafull"
                                    label="Área" 
                                />
                            </div>
                            <div className="col mt-2">
                                <br />
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    htmlType="submit"
                                >
                                    Confirmar
                                </Button>
                                <Popconfirm
                                    title="¿Seguro que quieres realizar esta acción?"
                                    visible={visiblePop}
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    size="large"
                                    onVisibleChange={() => console.log('visible change')}
                                >
                                </Popconfirm>
                            </div>
                        </div>
                    </Form>
            </Modal>
        </>
    )
}

UpsertConsecutivesModal.propTypes = {
    upsertconsecutive: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
  loading: state.auth.loading
});
  
export default connect(mapStateToProps, { upsertconsecutive })(UpsertConsecutivesModal);