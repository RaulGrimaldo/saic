import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Form, Collapse, Input, Upload} from 'antd';
import ElementosAsociados from './personalasociado/ElementosAsociados';
import DatosActividad from './datosactividad/DatosActividad';
import PresenciaOtrasAreas from './presenciadeareas/PresenciaOtrasAreas';
import InformacionLugar from './informacionlugar/InformacionLugar';
import InformacionContacto from './datoscontacto/InformacionContacto';
import InformacionAsistentes from './informacionasistentes/InformacionAsistentes';

import { updateregister, restartregister } from '../../actions/register';
 
const { Panel } = Collapse;

const InspectRegisterModal = (
    {   user,  
        visibleInspectRegisterModal,
        setVisibleInspectRegisterModal,
        rowData={} , register: { updated }, updateregister, restartregister
    }) => {

    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const [updateButton, setUpdateButton] = useState(false);
    const [isDisconnected, setIsDisconnected] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setUpdateButton(false);
          }, 500);        
    }, []);

    const  handleConnectionChange = () => {
        console.log(2)  
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
          const webPing = setInterval(
            () => {
              fetch('//google.com', {
                mode: 'no-cors',
                })
              .then(() => {
                setIsDisconnected(false)
                return clearInterval(webPing)
              }).catch(() => setIsDisconnected(true))
            }, 2000);
          return;
        }
    
        return setIsDisconnected(true);
        
      }    

    useEffect(() => {
        window.addEventListener('keydown', function (event) {
          if (event.ctrlKey && event.shiftKey && event.code === 'KeyU') {
            setUpdateButton(false);
          }
      });
      setUpdateButton(false);
        return () => {
            setUpdateButton({});
            window.removeEventListener('keydown', function (event) {
                
            });
        }
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            id: _id,
          });
    }, [rowData])

    const onChange = ({ fileList }) => {
      setFileList(fileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
      function callback(key) {
        console.log(key);
      }

    const {_id, ID, JUD,fecharango } = rowData;
    

    let { datospersona1, datospersona2, datospersona3, datospersona4,
            datospersona5, datospersona6, datospersona7, datospersona8} = rowData;

    const {/* userprograma1,
    userprograma2, */ estrategia, Tipo, Actividad, Rubro, Subrubro, turno,  claveCCT, matricula, sectoreducativo} = rowData;

    const { grupovulnerable, Solicitudes} = rowData;

    const { TemasTratados, Acuerdos, observaciones, foliosasociados } = rowData;

    const { actividaddgpd, actividadcdhcdmx, actividadccsjcdmx,
        actividadsdicp, actividadsopaft, actividaducs,
        actividaddgicot, actividaddgcse, actividadddsi,
        actividadsct, actividaddsb, actividadddh, 
        actividadcvm, actividadbva, actividaderum,
        actividaddse, actividadmultiplicadores, actividadalcoholimetro,
        actividadusec, otrasareas, } = rowData;
    
    const { institucion, Calle, Numero, Alcaldia, Colonia, 
        Cuadrante, sector, coordx, coordy } = rowData;

    const { Contacto, Cargo, Email, Telefono } = rowData;
    const { Asistentes,  asistentesmujeres, asistenteshombres,
            asistentes014, asistentes1518, asistentes1965, asistentes65mas } = rowData;


    const onFinish = (values) => {

       console.log("end")
    };

    /* if (updated) {    
        restartregister();
        setTimeout(() => {
            setUpdateButton(false);
            setVisibleInspectRegisterModal(false);
        }, 200);    
    } */

    const onClose = () => {
    
        restartregister();
        setVisibleInspectRegisterModal(false); 
    };

    return (
        <>
            <Modal
                centered
                visible={visibleInspectRegisterModal}
                onOk={() => onClose()}
                onCancel={() => onClose()}
                okButtonProps={{ disabled: true}}
                cancelButtonProps={{ disabled: true}}
                // el footer null oculta los botones por defecto del modal
                footer={null}
                width={1500}
                destroyOnClose={true}
                getContainer={false}
            >
                <div className="card-body">             
                              
                    <Form
                        form={form}
                        preserve={false} 
                        name="control-hooks"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                    
                        <h3 className="mt-2 text-center">INSPECCIONAR REGISTRO</h3>
                    
                        <Collapse 
                            className="custom-collapse-titles" 
                            expandIconPosition='right' 
                            defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']} 
                            onChange={callback}
                        >
                                  
                            <Panel header="I. DATOS DE REGISTRO" key="1"  >
                                <div className="row g-4 custom-collapse-content" >   
                                        <div className="col-4 "> 
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
                                            <b>ID: </b>{ID}
                                        </div>
                                        <div className="col-4 ">
                                            <b>JUD/SUB: </b>{JUD}
                                        </div>
                                        <div className="col-4">
                                            <b>FECHA: </b>{fecharango}
                                        </div>
                                </div>
                            </Panel>

                            <Panel header="II. PERSONAL ASOCIADO" key="2" >   

                                <ElementosAsociados 
                                    form={form} 
                                    datospersona1={datospersona1}
                                    datospersona2={datospersona2}
                                    datospersona3={datospersona3}
                                    datospersona4={datospersona4}
                                    datospersona5={datospersona5}
                                    datospersona6={datospersona6}
                                    datospersona7={datospersona7}
                                    datospersona8={datospersona8}
                                />   

                            </Panel>

                            <Panel header="III. DATOS DE LA ACTIVIDAD" key="3">

                                <DatosActividad 
                                    form={form} 
                                    user={user} 
                                    Tipo={Tipo}
                                    Actividad={Actividad}
                                    Rubro={Rubro}
                                    Subrubro={Subrubro}
                                    /* userprograma1={userprograma1}
                                    userprograma2={userprograma2} */
                                    estrategia={estrategia}
                                    turno={turno}
                                    claveCCT={claveCCT}
                                    matricula={matricula}
                                    sectoreducativo={sectoreducativo}
                                    grupovulnerable={grupovulnerable} 
                                    //publicodirigido={publicodirigido} 
                                    Solicitudes={Number(Solicitudes)}
                                    TemasTratados={TemasTratados} 
                                    Acuerdos={Acuerdos}
                                    observaciones={observaciones} 
                                    foliosasociados={foliosasociados}
                                />

                            </Panel>

                            <Panel header="IV. PRESENCIA DE OTRA ÁREA (SSC)" key="4">

                                <PresenciaOtrasAreas 
                                    form={form} 
                                    user={user}
                                    actividaddgpd={actividaddgpd} 
                                    actividadcdhcdmx={actividadcdhcdmx} 
                                    actividadccsjcdmx={actividadccsjcdmx}
                                    actividadsdicp={actividadsdicp} 
                                    actividadsopaft={actividadsopaft} 
                                    actividaducs={actividaducs}
                                    actividaddgicot={actividaddgicot} 
                                    actividaddgcse={actividaddgcse} 
                                    actividadddsi={actividadddsi}
                                    actividadsct={actividadsct} 
                                    actividaddsb={actividaddsb} 
                                    actividadddh={actividadddh} 
                                    actividadcvm={actividadcvm} 
                                    actividadbva={actividadbva} 
                                    actividaderum={actividaderum}
                                    actividaddse={actividaddse} 
                                    actividadmultiplicadores={actividadmultiplicadores} 
                                    actividadalcoholimetro={actividadalcoholimetro}
                                    actividadusec={actividadusec} 
                                    otrasareas={otrasareas}
                                />

                            </Panel>

                            <Panel header="V. INFORMACIÓN DE LUGAR O INSTITUCIÓN" key="5">

                                <InformacionLugar 
                                    institucion={institucion}
                                    Calle={Calle} 
                                    Numero={Numero}
                                    Alcaldia={Alcaldia}
                                    Colonia={Colonia}
                                    Cuadrante={Cuadrante}
                                    sector={sector}
                                    coordx={coordx}
                                    coordy={coordy}
                                    form={form} 
                                    user={user} 
                                />

                            </Panel>

                            <Panel header="VI. INFORMACIÓN DE CONTACTO" key="6">

                                <InformacionContacto 
                                    Contacto={Contacto} 
                                    Cargo={Cargo} 
                                    Email={Email} 
                                    Telefono={Telefono}
                                    form={form} 
                                    user={user}
                                /> 
                            </Panel>    

                            <Panel header="VII. INFORMACIÓN DE LOS ASISTENTES" key="7">

                                <InformacionAsistentes
                                    Asistentes={Asistentes}  
                                    asistentesmujeres={asistentesmujeres} 
                                    asistenteshombres={asistenteshombres}
                                    asistentes014={asistentes014} 
                                    asistentes1518={asistentes1518} 
                                    asistentes1965={asistentes1965} 
                                    asistentes65mas={asistentes65mas}
                                    form={form} 
                                    user={user}                                
                                />

                            </Panel>

                            <Panel header="VIII. EVIDENCIA FOTOGRÁFICA" key="8">
                            <div className="row custom-collapse-content" >
                            <Form.Item >

                                <Upload        
                                disabled={true} 
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                beforeUpload={() => false}
                                >
                                {fileList.length < 2 && '+ Subir'}
                                </Upload>

                            </Form.Item>
                            
                            </div>          
                        </Panel>
                        </Collapse>,                                     
                    </Form>
                </div>
            </Modal> 
        </>
    )
}

InspectRegisterModal.propTypes = {
    updateregister: PropTypes.func.isRequired,
    restartregister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    register: state.register,
});

export default connect(mapStateToProps, { updateregister, restartregister })(InspectRegisterModal);
