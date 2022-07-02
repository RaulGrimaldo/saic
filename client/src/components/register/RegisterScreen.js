import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {  getregisters, 
          deleteregister, 
          sendregister, 
          cancelregister, 
          send, 
          validateregister,
          review,
          pass,
          restartquery} from '../../actions/register';
import AddNewButton from '../ui/AddNewButton';
import { Table } from "ant-table-extensions";
import { DeleteOutlined, 
  EditOutlined, CloseOutlined, CheckCircleTwoTone, 
  ReloadOutlined, CheckCircleFilled,
  ZoomInOutlined, FileTextOutlined } from '@ant-design/icons';
import Alertd from '../ui/Alertd';
import { Space, Button, Tooltip, Popconfirm, Spin} from 'antd'; 
import AddRegisterModal from './AddRegisterModal';
import PropTypes from 'prop-types';
import EditRegisterModal from './EditRegisterModal';
import InspectRegisterModal from './InspectRegisterModal';
import _ from "lodash";

import 'antd/dist/antd.min.css';
import './register.css';

const RegisterScreen = (
  { getregisters, 
    deleteregister, 
    sendregister, 
    send,
    cancelregister,
    validateregister,
    review,
    pass,
    restartquery,
    register: { registers, updateQuery }, user }) => {
  // Manejar el estado de la fila seleccionada

  // Manejo de la visibilidad del modal
  const [visible, setVisible] = useState(false);
  const [visibleEditRegisterModal, setVisibleEditRegisterModal] = useState(false);
  const [visibleInspectRegisterModal, setVisibleinspectRegisterModal] = useState(false);

  //on mount useEffect
  useEffect(() => {
   if(!visible){
    getRegisters()
   }
  }, [visible]);

  useEffect(() => {
    if(!visibleEditRegisterModal){
      getRegisters()
     }
  }, [visibleEditRegisterModal]);

  useEffect(() => {
    if(!visibleInspectRegisterModal){
      getRegisters()
     }
  }, [visibleInspectRegisterModal]);
  //api calls functions ====>

  //get cases function
  const getRegisters = async () => {
    const response = await getregisters();

  };  

  // Manejo de los datos a usar en las acciones de los registros
  // idRegister[0] = id
  // idRegister[1] = mensaje => 'eliminar a '
  // idRegister[2] = ID
  // idRegister[3] = accion => DELETE
  const [idRegister, setIdRegister] = useState([]);
  const [record, setRecord] = useState()

  // Estado del mensaje de confirmación
  const [visiblePop, setVisiblePop] = useState(false);
  const [visiblePopSendMultiple, setVisiblePopSendMultiple] = useState(false);
  const [visiblePopReviewMultiple, setVisiblePopReviewMultiple] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [msgTableLoading, setMsgTableLoading] = useState("");

  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyQ') {
        setIsTableLoading(false);
      }
    });
    return () => {
        window.removeEventListener('keydown', function (event) {
            
        });
    }
  }, []);

  const confirmSendMultiple = () => {
    // Ocultar mensaje pop
    setVisiblePopSendMultiple(false);
    setIsTableLoading(true);
    send();
  }

  const confirmReviewMultiple = () => {
    // Ocultar mensaje pop
    setVisiblePopReviewMultiple(false);
    setIsTableLoading(true);
    review();
  }

  // Confirmación del mensaje pop
  const confirm = () => {
    // Ocultar mensaje pop
    setVisiblePop(false);
    setIsTableLoading(true);
    // Condicional para seleccionar accion con idRegister[3]
    if (idRegister[3] === 'DELETE') {
      // Eliminar registro 
      deleteregister([idRegister[0]]);
      // Actualizar registros 
      //Necesitamos respuesta del delete y posteriormente respuesta 
      //del getregister

    } else if(idRegister[3] === 'SEND'){
      // Eliminar registro 
      sendregister([idRegister[0]]);
      // Actualizar registros


    } else if(idRegister[3] === 'CANCEL'){
      // Eliminar registro 
      cancelregister([idRegister[0]]);
      // Actualizar registros

    } else if(idRegister[3] === 'EDIT'){
      // Editar registro 
      setVisibleEditRegisterModal(true);
    } else if(idRegister[3] === 'VALID'){
      // Validar registro 
      validateregister([idRegister[0]]);

    } else if(idRegister[3] === 'INSPECT'){
      // Inspeccionar registro 
      setVisibleinspectRegisterModal(true);

    } else if(idRegister[3] === 'PASS'){
      // Inspeccionar registro 
      pass([idRegister[0]]);

    }
  }

  // Si presiona 'no' simplemente ocultar la ventana de confirmación
  const cancel = () => {
    setVisiblePop(false);
  }

  const cancelSendMultiple = () => {
    setVisiblePopSendMultiple(false);
  }

  const cancelReviewMultiple = () => {
    setVisiblePopReviewMultiple(false);
  }

  function filtrarPorEstadoEnvio(obj) {
      if (
        ((obj.estadogeneral ===  'BORRADOR') && 
        (obj.email ===  user.email))
        ) {
        return true;
      } else {
        return false;
      }
  }

  function filtrarPorEstadoAprobacion(obj) {
    if (
      ((obj.estadogeneral ===  'APROBADO') && 
      (obj.email ===  user.email))
      ) {
      return true;
    } else {
      return false;
    }
  }

  

  const [registers_info, setRegistersInfo] = useState([]);
  const [registers_send, setRegistersSend] = useState([]);
  const [registers_aprobed, setRegistersAprobed] = useState([]);
  const [message_button, setMessageButton] = useState([]);
  /* let registers_send = [];
  let registers_info = []; */
  
  function filtrarButtonMsg( send, aprobed) {
    if(user?(Number(user.Nivel) === 4) && (user.jud !== user.subdireccion):''){
      setMessageButton(aprobed)
    } else{
      setMessageButton(send)
    }
  }

  if((updateQuery) && (registers !== null)){
    setTimeout(() => {
      setIsTableLoading(true); 
      restartquery();
    }, 500);
    //setRegistersInfo(registers);
    //setRegistersInfo(registers.filter(filtrarPorEstadoEnvio));
    /* registers_send = [];
    registers_info = [];
    registers_info = registers;
    registers_send = registers_info.filter(filtrarPorEstadoEnvio);    */
    //Esto reolveria por lo menos una de las promesas pero falta la de cada función CRUD   
     
    
    setTimeout(() => {
      let registerskey = registers;
      registerskey.forEach(function (register) {
        register.key = register._id;      
      });
      setRegistersInfo(registerskey);
      setRegistersSend(registers.filter(filtrarPorEstadoEnvio));
      setRegistersAprobed(registers.filter(filtrarPorEstadoAprobacion));      
      setIsTableLoading(false); 
      
    }, 3000);
    
  }

  useEffect(() => {
    filtrarButtonMsg(registers_send.length, registers_aprobed.length)
  }, [registers_send,registers_aprobed ])
  

  
 

  const filterData = data => formatter => data.map( item => ({
    text: formatter(item),
    value: formatter(item),
    //Esto elimina el warning del unique key por cada elemento -->
    key: formatter(item.ID)
  }));

  //let total;

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', filters , );
    if(filters[1] === null){
      setTotal(registers_info.length)
      //total = registers_info.length;
    } else{
      setTotal(filters[1].length)
      //total = filters[1].length;
    }
  };
  
  const columns = [
    
    {      
      title: 'Estado',
      width: 'auto',
      dataIndex: 'estadogeneral',
      key: '0',
      fixed: 'left',
      filters: _.uniqWith(filterData(registers_info)(i => i.estadogeneral), _.isEqual),
      onFilter: (value, record) => record.estadogeneral.includes(value),
      filterSearch: true, 
    },
    {
      title: 'ID',
      width: 'auto',
      dataIndex: 'ID',      
      key: '1',
      fixed: 'left',
      filters: filterData(registers_info)(i => i.ID),
      onFilter: (value, record) => record.ID.includes(value),
      filterSearch: true,      
      render: (text, record) => { return {
        children: <div>{record.ID}{
          (record._id === idRegister[0] ) && 
          <>  
            <Popconfirm
                placement="right"
                title={"Seguro que quieres " + [idRegister[1]] + [idRegister[2]]}
                visible={visiblePop}
                onConfirm={confirm}
                onCancel={cancel}
                size="large"
              >
            </Popconfirm> 
          </>            
        }</div>
      }},
     },
    { 
      title: 'Capturista', dataIndex: 'capturista', key: '2',
      filters: _.uniqWith(filterData(registers_info)(i => i.capturista), _.isEqual),
      onFilter: (value, record) => record.capturista.includes(value),
      filterSearch: true, 
    },
    { 
      title: 'Fecha', dataIndex: 'fecharango', key: '3', 
      filters: _.uniqWith(filterData(registers_info)(i => i.fecharango), _.isEqual),
      onFilter: (value, record) => record.fecharango.includes(value),
      filterSearch: true,
    },/* 
    { 
      title: 'Estrategia 1', dataIndex: 'userprograma1', key: '101',
      filters: _.uniqWith(filterData(registers_info)(i => i.userprograma1), _.isEqual),
      onFilter: (value, record) => record.userprograma1?record.userprograma1.includes(value):'',
      filterSearch: true, 
    },
    { 
      title: 'BA', dataIndex: 'userprograma2', key: '102', 
      filters: _.uniqWith(filterData(registers_info)(i => i.userprograma2), _.isEqual),
      onFilter: (value, record) => record.userprograma2?record.userprograma2.includes(value):'',
      filterSearch: true,
    },  */
    { 
      title: 'Estrategia', dataIndex: 'estrategia', key: '101', 
      filters: _.uniqWith(filterData(registers_info)(i => i.estrategia), _.isEqual),
      onFilter: (value, record) => record.estrategia.includes(value),
      filterSearch: true, 
    },
    { 
      title: 'Tipo', dataIndex: 'Tipo', key: '4', 
      filters: _.uniqWith(filterData(registers_info)(i => i.Tipo), _.isEqual),
      onFilter: (value, record) => record.Tipo.includes(value),
      filterSearch: true, 
    },
    { title: 'Actividad', dataIndex: 'Actividad', key: '5', 
      filters: _.uniqWith(filterData(registers_info)(i => i.Actividad), _.isEqual),
      onFilter: (value, record) => record.Actividad.includes(value),
      filterSearch: true, 
    },
    { title: 'Rubro', dataIndex: 'Rubro', key: '6',
      filters: _.uniqWith(filterData(registers_info)(i => i.Rubro), _.isEqual),
      onFilter: (value, record) => record.Rubro.includes(value),
      filterSearch: true, 
    },
    { title: 'Subrubro', dataIndex: 'Subrubro', key: '7',
      filters: _.uniqWith(filterData(registers_info)(i => i.Subrubro), _.isEqual),
      onFilter: (value, record) => record.Subrubro.includes(value),
      filterSearch: true, 
    },
    { title: 'Institución', dataIndex: 'institucion', key: '8',
      filters: _.uniqWith(filterData(registers_info)(i => i.institucion), _.isEqual),
      onFilter: (value, record) => record.institucion.includes(value),
      filterSearch: true, 
    },
    { title: 'Nombre del Contacto', dataIndex: 'Contacto', key: '9',
      filters: _.uniqWith(filterData(registers_info)(i => i.Contacto), _.isEqual),
      onFilter: (value, record) => record.Contacto.includes(value),
      filterSearch: true,
    },
    { title: 'Cargo', dataIndex: 'Cargo', key: '10',
      filters: _.uniqWith(filterData(registers_info)(i => i.Cargo), _.isEqual),
      onFilter: (value, record) => record.Cargo.includes(value),
      filterSearch: true,
    },
    { title: 'Correo electrónico', dataIndex: 'Email', key: '11',
      filters: _.uniqWith(filterData(registers_info)(i => i.Email), _.isEqual),
      onFilter: (value, record) => record.Email.includes(value),
      filterSearch: true,
    },
    { title: 'Teléfono', dataIndex: 'Telefono', key: '12',
      filters: _.uniqWith(filterData(registers_info)(i => i.Telefono), _.isEqual),
      onFilter: (value, record) => record.Telefono.includes(value),
      filterSearch: true, 
    },
    { title: 'Calle', dataIndex: 'Calle', key: '13',
      filters: _.uniqWith(filterData(registers_info)(i => i.Calle), _.isEqual),
      onFilter: (value, record) => record.Calle.includes(value),
      filterSearch: true,
    },
    { title: 'Número', dataIndex: 'Numero', key: '14',
      filters: _.uniqWith(filterData(registers_info)(i => i.Numero), _.isEqual),
      onFilter: (value, record) => record.Numero.includes(value),
      filterSearch: true,
    },
    { title: 'Colonia', dataIndex: 'Colonia', key: '15',
      filters: _.uniqWith(filterData(registers_info)(i => i.Colonia), _.isEqual),
      onFilter: (value, record) => record.Colonia.includes(value),
      filterSearch: true,
    },
    { title: 'Alcaldía', dataIndex: 'Alcaldia', key: '16',
      filters: _.uniqWith(filterData(registers_info)(i => i.Alcaldia), _.isEqual),
      onFilter: (value, record) => record.Alcaldia.includes(value),
      filterSearch: true,
    },
    { title: 'Coordenada X', dataIndex: 'coordx', key: '17',
    filters: _.uniqWith(filterData(registers_info)(i => i.coordx), _.isEqual),
    onFilter: (value, record) => record.coordx.toString().includes(value),
    filterSearch: true,
    },
    { title: 'Coordenada Y', dataIndex: 'coordy', key: '18',
      filters: _.uniqWith(filterData(registers_info)(i => i.coordy), _.isEqual),
      onFilter: (value, record) => record.coordy.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Asistentes', dataIndex: 'Asistentes', key: '19',
      filters: _.uniqWith(filterData(registers_info)(i => i.Asistentes), _.isEqual),
      onFilter: (value, record) => record.Asistentes.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Mujeres', dataIndex: 'asistentesmujeres', key: '20',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentesmujeres), _.isEqual),
      onFilter: (value, record) => record.asistentesmujeres.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Hombres', dataIndex: 'asistenteshombres', key: '21',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistenteshombres), _.isEqual),
      onFilter: (value, record) => record.asistenteshombres.toString().includes(value),
      filterSearch: true,
    },
    { title: '0-14', dataIndex: 'asistentes014', key: '22',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes014), _.isEqual),
      onFilter: (value, record) => record.asistentes014.toString().includes(value),
      filterSearch: true,
    },
    { title: '15-20', dataIndex: 'asistentes1518', key: '23',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes1518), _.isEqual),
      onFilter: (value, record) => record.asistentes1518.toString().includes(value),
      filterSearch: true,
    },
    { title: '21-65', dataIndex: 'asistentes1965', key: '24',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes1965), _.isEqual),
      onFilter: (value, record) => record.asistentes1965.toString().includes(value),
      filterSearch: true,
    },
    { title: '65 y más', dataIndex: 'asistentes65mas', key: '25',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes65mas), _.isEqual),
      onFilter: (value, record) => record.asistentes65mas.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Temas Tratados', dataIndex: 'TemasTratados', key: '26',
      render: () => { return {
        children: <div>+</div>              
      }},
    },
    { title: 'Acuerdos', dataIndex: 'Acuerdos', key: '27',
      render: () => { return {
        children: <div>+</div>              
      }},
    },
    { title: 'Total solicitudes', dataIndex: 'Solicitudes', key: '28',
      filters: _.uniqWith(filterData(registers_info)(i => i.Solicitudes), _.isEqual),
      onFilter: (value, record) => record.Solicitudes.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Observaciones', dataIndex: 'observaciones', key: '29', 
      render: () => { return {
        children: <div>+</div>              
      }},
    },
    { title: 'JUD', dataIndex: 'JUD', key: '30',
      filters: _.uniqWith(filterData(registers_info)(i => i.JUD), _.isEqual),
      onFilter: (value, record) => record.JUD.includes(value),
      filterSearch: true,
    },
    { title: 'Cuadrante', dataIndex: 'Cuadrante', key: '31',
      filters: _.uniqWith(filterData(registers_info)(i => i.Cuadrante), _.isEqual),
      onFilter: (value, record) => record.Cuadrante.includes(value),
      filterSearch: true,
    },
    { title: 'Imagenes', dataIndex: 'imgtotal', key: '32',
      filters: _.uniqWith(filterData(registers_info)(i => i.imgtotal), _.isEqual),
      onFilter: (value, record) => record.imgtotal.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Quincena', dataIndex: 'Quincena', key: '33',
      filters: _.uniqWith(filterData(registers_info)(i => i.Quincena), _.isEqual),
      onFilter: (value, record) => record.Quincena.includes(value),
      filterSearch: true,
    },
    { title: 'Mes', dataIndex: 'nombremesrango', key: '34',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombremesrango), _.isEqual),
      onFilter: (value, record) => record.nombremesrango.includes(value),
      filterSearch: true,
    },
    { title: 'Año', dataIndex: 'aniorango', key: '35',
      filters: _.uniqWith(filterData(registers_info)(i => i.aniorango), _.isEqual),
      onFilter: (value, record) => record.aniorango.toString().includes(value),
      filterSearch: true,
    },
    { title: 'SUB', dataIndex: 'SubDireccion', key: '36',
      filters: _.uniqWith(filterData(registers_info)(i => i.SubDireccion), _.isEqual),
      onFilter: (value, record) => record.SubDireccion.includes(value),
      filterSearch: true,
    },
    { title: 'USEC', dataIndex: 'actividadusec', key: '37',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadusec), _.isEqual),
      onFilter: (value, record) => record.actividadusec?record.actividadusec.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Multiplicadores', dataIndex: 'actividadmultiplicadores', key: '38',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadmultiplicadores), _.isEqual),
      onFilter: (value, record) => record.actividadmultiplicadores?record.actividadmultiplicadores.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'DSE', dataIndex: 'actividaddse', key: '39',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddse), _.isEqual),
      onFilter: (value, record) => record.actividaddse?record.actividaddse.includes(value):'',
      filterSearch: true,
    },
    { title: 'ERUM', dataIndex: 'actividaderum', key: '40',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaderum), _.isEqual),
      onFilter: (value, record) => record.actividaderum?record.actividaderum.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Alcoholímetro', dataIndex: 'actividadalcoholimetro', key: '41',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadalcoholimetro), _.isEqual),
      onFilter: (value, record) => record.actividadalcoholimetro?record.actividadalcoholimetro.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'BVA', dataIndex: 'actividadbva', key: '42',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadbva), _.isEqual),
      onFilter: (value, record) => record.actividadbva?record.actividadbva.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'CVM', dataIndex: 'actividadcvm', key: '43',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadcvm), _.isEqual),
      onFilter: (value, record) => record.actividadcvm?record.actividadcvm.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'DDH', dataIndex: 'actividadddh', key: '44',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadddh), _.isEqual),
      onFilter: (value, record) => record.actividadddh?record.actividadddh.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'DESyBISO', dataIndex: 'actividaddsb', key: '45',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddsb), _.isEqual),
      onFilter: (value, record) => record.actividaddsb?record.actividaddsb.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'DGCSE', dataIndex: 'actividaddgcse', key: '46',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddgcse), _.isEqual),
      onFilter: (value, record) => record.actividaddgcse?record.actividaddgcse.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'DGICOT', dataIndex: 'actividaddgicot', key: '47',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddgicot), _.isEqual),
      onFilter: (value, record) => record.actividaddgicot?record.actividaddgicot.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'UCS', dataIndex: 'actividaducs', key: '48',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaducs), _.isEqual),
      onFilter: (value, record) => record.actividaducs?record.actividaducs.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'SOPAFT', dataIndex: 'actividadsopaft', key: '49',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadsopaft), _.isEqual),
      onFilter: (value, record) => record.actividadsopaft?record.actividadsopaft.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'SDICP', dataIndex: 'actividadsdicp', key: '50',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadsdicp), _.isEqual),
      onFilter: (value, record) => record.actividadsdicp?record.actividadsdicp.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'CCSJCDMX', dataIndex: 'actividadccsjcdmx', key: '51',
      render: (text) => { return {
        children: <div>{text + ''}</div>             
      }},
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadccsjcdmx), _.isEqual),
      onFilter: (value, record) => record.actividadccsjcdmx?record.actividadccsjcdmx.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'CDHCDMX', dataIndex: 'actividadcdhcdmx', key: '52',    
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadcdhcdmx), _.isEqual),
      onFilter: (value, record) => record.actividadcdhcdmx?record.actividadcdhcdmx.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'DGPD', dataIndex: 'actividaddgpd', key: '53',
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddgpd), _.isEqual),
      onFilter: (value, record) => record.actividaddgpd?record.actividaddgpd.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Otras Áreas', dataIndex: 'otrasareas', key: '54',
      filters: _.uniqWith(filterData(registers_info)(i => i.otrasareas), _.isEqual),
      onFilter: (value, record) => record.otrasareas?record.otrasareas.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Grupo Vulnerable', dataIndex: 'grupovulnerable', key: '55',
      filters: _.uniqWith(filterData(registers_info)(i => i.grupovulnerable), _.isEqual),
      onFilter: (value, record) => record.grupovulnerable.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Dirección', dataIndex: 'Direccion', key: '56',
      filters: _.uniqWith(filterData(registers_info)(i => i.Direccion), _.isEqual),
      onFilter: (value, record) => record.Direccion.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 1', dataIndex: 'nombrepersona1', key: '57',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona1), _.isEqual),
      onFilter: (value, record) => record.nombrepersona1?record.nombrepersona1.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 2', dataIndex: 'nombrepersona2', key: '58',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona2), _.isEqual),
      onFilter: (value, record) => record.nombrepersona2?record.nombrepersona2.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 3', dataIndex: 'nombrepersona3', key: '59',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona3), _.isEqual),
      onFilter: (value, record) => record.nombrepersona3?record.nombrepersona3.includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 4', dataIndex: 'nombrepersona4', key: '60',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona4), _.isEqual),
      onFilter: (value, record) => record.nombrepersona4?record.nombrepersona4.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 5', dataIndex: 'nombrepersona5', key: '61',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona5), _.isEqual),
      onFilter: (value, record) => record.nombrepersona5?record.nombrepersona5.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 6', dataIndex: 'nombrepersona6', key: '62',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona6), _.isEqual),
      onFilter: (value, record) => record.nombrepersona6?record.nombrepersona6.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 7', dataIndex: 'nombrepersona7', key: '63',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona7), _.isEqual),
      onFilter: (value, record) => record.nombrepersona7?record.nombrepersona7.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Personal 8', dataIndex: 'nombrepersona8', key: '64',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona8), _.isEqual),
      onFilter: (value, record) => record.nombrepersona8?record.nombrepersona8.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Turno', dataIndex: 'turno', key: '65',
      filters: _.uniqWith(filterData(registers_info)(i => i.turno), _.isEqual),
      onFilter: (value, record) => record.turno?record.turno.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Folios asociados', dataIndex: 'foliosasociados', key: '66',
      filters: _.uniqWith(filterData(registers_info)(i => i.foliosasociados), _.isEqual),
      onFilter: (value, record) => record.foliosasociados?record.foliosasociados.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Sector', dataIndex: 'sector', key: '67',
      filters: _.uniqWith(filterData(registers_info)(i => i.sector), _.isEqual),
      onFilter: (value, record) => record.sector.toString().includes(value),
      filterSearch: true,
    },  
    { title: 'CCT', dataIndex: 'claveCCT', key: '68',
      filters: _.uniqWith(filterData(registers_info)(i => i.claveCCT), _.isEqual),
      onFilter: (value, record) => record.claveCCT?record.claveCCT.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Mátricula', dataIndex: 'matricula', key: '69',
      filters: _.uniqWith(filterData(registers_info)(i => i.matricula), _.isEqual),
      onFilter: (value, record) => record.matricula?record.matricula.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Sector Educativo', dataIndex: 'sectoreducativo', key: '70',
      filters: _.uniqWith(filterData(registers_info)(i => i.sectoreducativo), _.isEqual),
      onFilter: (value, record) => record.sectoreducativo?record.sectoreducativo.toString().includes(value):'',
      filterSearch: true,
    },
    {
      title: 'Acciones',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          
        { (
          ((record.estadogeneral ===  'APROBADO') &&
          (record.email === user.email))
        ) && 
          <>          
            <Tooltip title="Eliminar">
              <Button 
                type='primary'
                danger
                icon={<DeleteOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setMsgTableLoading("Cargando...");
                  setIdRegister([record._id, 'eliminar ', record.ID, 'DELETE'])
                }}
              />
            </Tooltip>              
            {/* <Tooltip title="Editar">        
              <Button 
                icon={<EditOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setRecord(record);
                  setIdRegister([record._id, 'editar ', record.ID, 'EDIT']);
                }}
              />
            </Tooltip>  */}
          </>
        }

        { (
          (record.estadogeneral ===  'REVISAR') &&
          (Number(user.Nivel) === 3) && ((record.email !== user.email))
          ) && 
          <>         
            <Tooltip title="Editar">        
              <Button 
                icon={<EditOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setRecord(record);
                  setIdRegister([record._id, 'editar ', record.ID, 'EDIT']);
                }}
              />
            </Tooltip> 
            <Tooltip title="Aprobar">        
              <Button 
                icon={<CheckCircleFilled />} 
                onClick={() => {
                  setVisiblePop(true);
                  setRecord(record);
                  setIdRegister([record._id, 'aprovar ', record.ID, 'PASS']);
                }}
              />
            </Tooltip>
          </>
        }

         {((record.estadogeneral ===  'BORRADOR') &&
          ((record.email === user.email))  
          //((record.JUD === user.jud) && (Number(user.Nivel === 3))) || 
          //((record.SubDireccion === user.subdireccion) && (Number(user.Nivel) === 2))
          ) && 
          <> 
            {/* <Tooltip title="Cancelar">        
              <Button 
                type='primary'
                danger
                icon={<CloseOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setMsgTableLoading("Cargando...");
                  setIdRegister([record._id, 'cancelar ', record.ID, 'CANCEL'])
                }}
              />
            </Tooltip> */}
            <Tooltip title="Eliminar">
              <Button 
                type='primary'
                danger
                icon={<DeleteOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setMsgTableLoading("Cargando...");
                  setIdRegister([record._id, 'eliminar ', record.ID, 'DELETE'])
                }}
              />
            </Tooltip>  
            <Tooltip title="Editar">        
              <Button 
                icon={<EditOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setRecord(record);
                  setIdRegister([record._id, 'editar ', record.ID, 'EDIT']);
                }}
              />
            </Tooltip>                            
          </>
          
        } 
        {((record.estadogeneral ===  'ENVIADO') && (Number(user.Nivel) === 2)) && 
          <>
            <Tooltip title="Cancelar">        
              <Button 
                type='primary'
                danger
                icon={<CloseOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setMsgTableLoading("Cargando...");
                  setIdRegister([record._id, 'cancelar ', record.ID, 'CANCEL'])
                }}
              />
            </Tooltip>
            <Tooltip title="Editar">        
              <Button 
                icon={<EditOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setRecord(record);
                  setIdRegister([record._id, 'editar ', record.ID, 'EDIT']);
                }}
              />
            </Tooltip>    
            <Tooltip title="Validar">        
              <Button 
                icon={<CheckCircleTwoTone  twoToneColor="#52c41a" />} 
                onClick={() => {
                  setVisiblePop(true);
                  setMsgTableLoading("Cargando...");
                  setIdRegister([record._id, 'validar ', record.ID, 'VALID'])
                }}
              />
            </Tooltip>   
          </>            
        }

          <> 
            <Tooltip title="Inspeccionar">        
              <Button 
                icon={<ZoomInOutlined />} 
                onClick={() => {
                  setVisiblePop(true);
                  setRecord(record);
                  setIdRegister([record._id, 'inspeccionar ', record.ID, 'INSPECT']);
                }}
              />
            </Tooltip>  
            
            <Tooltip title="Documento" 
            >   
            <Button 
                icon={<FileTextOutlined />} 
                onClick={() => {
                  handleClick(record)
                }}
              />
            </Tooltip>           
          </>
      </Space>  
      )
      
    },
  ];

  const confirmUpdateTable = () => {
    setIsTableLoading(true);
    getregisters();
  }
  const handleClick = (record) => {
    setRecord(record);
    localStorage.setItem('rowdata', JSON.stringify(record));
    window.open("http://localhost:8080/" + "docview" );
  };
  //Si la respuesta es positiva limpiar el formulario para cargar nuevo usuario

  return ( 
    <>
      <div className="card mb-3" >    

        <div className="card-header text-center">
        <Space size="middle">  
          <Tooltip title="Actualizar">        
                <Button 
                  type="dashed"
                  icon={<ReloadOutlined />} 
                  onClick={() => {
                    confirmUpdateTable();
                  }}
                />
          </Tooltip>
          
          <AddNewButton setIsTableLoading={setIsTableLoading} setVisible={setVisible} title='Agregar registro'/> 
            {
              ((Number(message_button) > 0)) ? (
                <Tooltip title={'Enviar ' + message_button + ' registro(s)'}>
                <Popconfirm
                  placement="right"
                  title={"¿Seguro que quieres enviar: " + message_button + ' registro(s)?'}
                  visible={visiblePopSendMultiple}
                  onConfirm={confirmSendMultiple}
                  onCancel={cancelSendMultiple}
                  size="large"
                >
                  <Button type='primary' size='default' onClick={() => setVisiblePopSendMultiple(true)}>
                    {'Enviar (' + message_button + ')'}
                  </Button>
                </Popconfirm> 
                
              </Tooltip>
            ) : ''
             
            }
            {
              ((registers_send.length > 0) && ((Number(user.Nivel) === 4)) && (user.jud !== user.subdireccion)) ? (
                <Tooltip title={'Se enviará un correo electrónico a la JUD solicitando la revisión de ' + registers_send.length + ' registro(s). ' }>
                  <Popconfirm
                    placement="right"
                    title={"¿Seguro que quieres solicitar la revisión de: " + registers_send.length + ' registro(s)?'}
                    visible={visiblePopReviewMultiple}
                    onConfirm={confirmReviewMultiple}
                    onCancel={cancelReviewMultiple}
                    size="large"
                  >
                    <Button type='primary' ghost size='default' onClick={() => setVisiblePopReviewMultiple(true)}>
                      {'Solicitar revisión (' + registers_send.length + ')'}
                    </Button>
                  </Popconfirm> 
                  
                </Tooltip>
            ) : ''
            }   
        </Space>       
        </div>
              
        <div className="row g-4 cardadduser animate__animated animate__animated animate__fadeIn">
                    
          <div style={{ maxWidth: '100%'}}>
              
            <Alertd /> 
            <br />
            <Spin spinning={isTableLoading} tip={msgTableLoading}>
              <Table 
                columns={columns} 
                onChange={handleChange}
                expandable={{
                  expandedRowRender: record => 
                  <p style={{ margin: 0 }}>
                    <b>Temas Tratados:</b> {record.TemasTratados} <br />
                    <b>Acuerdos:</b> {record.Acuerdos} <br />
                    <b>Observaciones:</b> {record.observaciones} <br />                  
                  </p>,                
                }}
                dataSource={registers_info} 
              /* searchableProps={{
                  // dataSource,
                  // setDataSource: setSearchDataSource,
                  inputProps: {
                    placeholder: "Buscar...",
                    prefix: <SearchOutlined />,
                  },
                }}*/
                exportableProps={{ showColumnPicker: true, fileName: "registros", children: "Exportar"   }} 
                scroll={{ x: 'max-content'}}              
                pagination= { {defaultPageSize: 10, pageSizeOptions: ['5', '10', '20', '40'], 
                showTotal: (total) => `Total ${total} registros de ${registers_info.length}` ,
                showSizeChanger: true, 
                }}          
                bordered
                size="small" 
              />               
            </Spin>                                               
            <AddRegisterModal visible={visible}  setVisible={setVisible}/>
             <EditRegisterModal 
              visibleEditRegisterModal={visibleEditRegisterModal} 
              setVisibleEditRegisterModal={setVisibleEditRegisterModal} 
              rowData={record} 
              user={user}
            /> 
            <InspectRegisterModal 
              visibleInspectRegisterModal={visibleInspectRegisterModal} 
              setVisibleInspectRegisterModal={setVisibleinspectRegisterModal} 
              rowData={record} 
              user={user}
            /> 
          </div>

        </div>

      </div>
    </>
  )
}


RegisterScreen.propTypes = {
  getregisters: PropTypes.func.isRequired,
  deleteregister: PropTypes.func.isRequired,
  sendregister: PropTypes.func.isRequired,
  cancelregister: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  register: state.register,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {  
  getregisters, 
  deleteregister, 
  sendregister,
  send,
  review,
  pass,
  cancelregister, 
  validateregister,
  restartquery})(RegisterScreen);
