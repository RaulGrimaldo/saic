import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {  Modal, Form, Button, Collapse, Upload, message, Spin } from 'antd';

import { addregister, restartregister } from '../../actions/register';

import './addregister.css';
import JudElement from './datosregisto/JudElement';
import SelectorQuincenal from './datosregisto/SelectorQuincenal';
import ElementosAsociados from './personalasociado/ElementosAsociados';
import PresenciaOtrasAreas from './presenciadeareas/PresenciaOtrasAreas';
import DatosActividad from './datosactividad/DatosActividad';
import InformacionLugar from './informacionlugar/InformacionLugar';
import InformacionContacto from './datoscontacto/InformacionContacto';
import InformacionAsistentes from './informacionasistentes/InformacionAsistentes';
import RecursosScreen from './recursos/RecursosScreen';


const { Panel } = Collapse;


const AddRegisterModal = (
  {setVisible, 
  visible, user, addregister, QuincenaYear, register: { registers, restart }, restartregister }) => {

  const [fileList, setFileList] = useState([]);
  const [addButton, setAddButton] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const  handleConnectionChange = () => {
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
          setAddButton(false);
          }    
      });
    setAddButton(false);
    return () => {
      setAddButton({});
      setIsDisconnected({});
      window.removeEventListener('keydown', function (event) {
        
      });
    }
  }, [])

  const onChange = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj

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


  

  const onFinish = (values) => {

    const key = 'updatable';
    if((!form.getFieldValue('Email')) && 
    (!form.getFieldValue('Telefono'))){
      message.loading({ content: 'Revisando...', key });
      setTimeout(() => {
          message.error({ content: "Debe especificar un método de contacto", key, duration: 2 });
      }, 1000);
    }else if(Number(form.getFieldValue('Asistentes')) === 0){
      message.loading({ content: 'Revisando...', key });
      setTimeout(() => {
          message.error({ content: "Debe especificar un numero mínimo de asistentes", key, duration: 2 });
      }, 1000);
    } else if((Number(form.getFieldValue('Asistentes'))) !== 
    (Number(form.getFieldValue('asistentes014')) + Number(form.getFieldValue('asistentes1518')) +
    Number(form.getFieldValue('asistentes1965')) + Number(form.getFieldValue('asistentes65mas')))){

      message.loading({ content: 'Revisando...', key });
      setTimeout(() => {
          message.error({ content: "El número de asistentes no coincide", key, duration: 2 });
      }, 1000);

    } else{
      window.scrollTo(0, 0);
      //Agregar datos y las imagenes si existen
      let formData = new FormData();
      for(const key of Object.keys(fileList)){
        formData.append('image', fileList[key].originFileObj);
        console.log(fileList[key])
      }
      for (let key in values) {
      
        Array.isArray(values[key]) 
          ? values[key].forEach(value => formData.append(key + '[]', value))
          : formData.append(key, values[key]) ;
      }
      
    //data.append();
/*     axios.post("https://httpbin.org/anything", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err)); */
        //setAddButton(true);
        handleConnectionChange();

        setTimeout(() => {

          if(!isDisconnected){
            setAddButton(true);
            addregister(formData); 
          }   else{  
            const key2 = 'updatable';  

            message.loading({ content: 'Revisando...', key2 });
            
            setTimeout(() => {
              message.error({ content: "Revisa la conexión a internet", key2, duration: 2 });
            }, 1000);  
          } 

        }, 1000); 
               
      //addregister(values);
      /* setTimeout(() => {
        form.resetFields();
        form.setFieldsValue({
            jud: user ? user.jud : '',
            solicitudes: 0,
          });
          setFileList([]);
      }, 2000); */
    }
    
  };

  const [form] = Form.useForm();

  
  //Si la respuesta es positiva limpiar el formulario para cargar nuevo usuario

  useEffect(() => {
    if (restart) {    
      restartregister();
      setVisible(false);   
    }  else{
      setAddButton(false);
    }
  }, [restart]);

  const onClose = () => {
    
    restartregister();
    setVisible(false); 
  };
  
  return (
    <>
      <Modal
          centered
          visible={visible}
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

            <h3 className="mt-2 text-center">AGREGAR REGISTRO</h3>

            <Collapse 
              className="custom-collapse-titles" 
              expandIconPosition='right' 
              defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']} 
              onChange={callback}
            >
              
              <Panel header="RECURSOS " key="9"  >
                <div className="row g-4 custom-collapse-content" >   
                
                        <div className="col">
                          <RecursosScreen />
                        </div>
                </div>
              </Panel>

              <Panel header="I. DATOS DE REGISTRO" key="1"  >
                <div className="row g-4 custom-collapse-content" >   
                
                        <div className="col-6 ">
                          <JudElement form={form} user={user}/>
                        </div>
                        <div className="col-6">
                          <SelectorQuincenal form={form} QuincenaYear={QuincenaYear} />
                        </div>
                </div>
              </Panel>

              <Panel header="II. PERSONAL ASOCIADO" key="2" >   

                  <ElementosAsociados form={form} />   

              </Panel>
              <Panel header="III. DATOS DE LA ACTIVIDAD" key="3">

                <DatosActividad form={form} user={user} /> 

              </Panel>
              <Panel header="IV. PRESENCIA DE OTRA ÁREA (SSC)" key="4">

                <PresenciaOtrasAreas form={form} user={user}/>

              </Panel>

              <Panel header="V. INFORMACIÓN DE LUGAR O INSTITUCIÓN" key="5">
                <InformacionLugar form={form} user={user} />
              </Panel>

              <Panel header="VI. INFORMACIÓN DE CONTACTO" key="6">
                <InformacionContacto form={form} user={user}/> 
              </Panel>

              <Panel header="VII. INFORMACIÓN DE LOS ASISTENTES" key="7">
                <InformacionAsistentes form={form} user={user}/>
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
            
            <div className="row mt-4">
              <div className="col-md-6">

              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                  <Spin spinning={addButton} delay={4000} tip="Cargando... la conexión parece lenta">
                    <Form.Item
                      >                                                                
                          <Button 
                              type="primary" 
                              size="large" 
                              block 
                              htmlType="submit"
                              disabled={addButton}
                          >
                              Agregar
                          </Button>
                      </Form.Item>
                  </Spin>
                    
                  </div>
                  <div className="col">
                    <Form.Item
                    >
                        <Button 
                            type="secondary" 
                            size="large" 
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
  );
}

const mapStateToProps = (state) => ({
    register: state.register,
    user: state.auth.user,    
    QuincenaYear: state.register.QuincenaYear
});


export default connect(mapStateToProps, { addregister, restartregister })(AddRegisterModal);
