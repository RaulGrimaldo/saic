import React, { useEffect, useState } from 'react';
import "./addUserStyles.css";
import 'animate.css';
import { connect } from 'react-redux';
import { getusers, deleteuser } from '../../actions/usersdata';

import { Popconfirm, Card, Spin, Space, Tooltip, Button } from 'antd';

import PropTypes from 'prop-types';
import _ from "lodash";

//import MaterialTable from 'material-table';
import AddUserModal from './AddUserModal';
//import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Table } from "ant-table-extensions";

import "./addUserStyles.css";
import AddNewButton from '../ui/AddNewButton';
import EditUserModal from './EditUserModal';
import EditPasswordModal from './EditPasswordModal';
import NavbarUsers from '../ui/NavbarUsers';
import { KeyOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';



const UsersScreen = (
  { getusers, 
    deleteuser, 
    usersdata: { users }, 
     }) => {  

  
  // Estado de la visibilidad del modal para agregar usuarios
  const [visible, setVisible] = useState(false);

  // Estado de la visibilidad del modal para editar un usuario
  const [visibleEditModal, setVisibleEditModal] = useState(false);

  // Estado de la visibilidad del modal para editar la contraseseña de usuario
  const [visibleEditPasswordModal, setVisibleEditPasswordModal] = useState(false);

  // Manejo de los datos a usar en las acciones de usuarios
  // userid[0] = id
  // userid[1] = mensaje => 'eliminar a '
  // userid[2] = email
  // userid[3] = accion => DELETE
  const [userid, setuserid] = useState([]);

  // Estado del mensaje de confirmación
  const [visiblePop, setVisiblePop] = useState(false);

  const [registers_info, setRegistersInfo] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  // Confirmación del mensaje pop
  const confirm = () => {
    // Ocultar mensaje pop
    setVisiblePop(false);

    // Condicional para seleccionar accion con userid[3]
    if (userid[3] === 'DELETE') {
      // Eliminar usuario con el 
      deleteuser([userid[0]]);
      // Actualizar datos de los usuarios 
      setTimeout(() => {
        getusers();
      }, 500);
    } else if (userid[3] === 'EDIT') {
      // Mostrar modal de edición
      setVisibleEditModal(true);
    } else if (userid[3] === 'EDIT_PASSWORD') {
      // Mostrar modal de edición de contraseña
      setVisibleEditPasswordModal(true);
    }
  }

  // Si presiona 'no' simplemente ocultar la ventana de confirmación
  const cancel = () => {
    setVisiblePop(false);
  }

  // Datos a cargar en la tabla

  useEffect(() => {
    if(!visible){
      getUs();
    }
    getUs();
    setIsTableLoading(true); 
  }, [visible]);

  useEffect(() => {
    if(!visibleEditModal){
      getUs();
    }
    getUs();
    setIsTableLoading(true); 
  }, [visibleEditModal]);

  //api calls functions ====>

  //get cases function
  const getUs = async () => {
    const response = await getusers();

  };
  var total;

  const filterData = data => formatter => data.map( item => ({
    text: formatter(item),
    value: formatter(item),
  }))

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', filters , );
    if(filters[1] === null){
      total = registers_info.length;
    } else{
      total = filters[1].length;
    }
  };
  //Cargar los datos del store a la variable
  if ((users !== null) && isTableLoading) {
    setTimeout(() => {
      setIsTableLoading(true); 
      let registers = users;
      registers.forEach(function (register) {
        register.key = register._id;      
       });
       setRegistersInfo(registers);
    }, 0);
    
    setTimeout(() => {
      setIsTableLoading(false); 
    }, 1000);

  }

  /* const columns = [
    {
      field: 'username',
      title: 'Nombre',
    },
    {
      field: 'ROL',
      title: 'Rol',
    },
    {
      field: 'jud',
      title: 'JUD/SUB/DIR',
    },
    {
      field: 'email',
      title: 'Correo electrónico',
    },
    {
      field: 'espejo',
      title: 'Espejo',
    },
    {
      field: 'activo',
      title: 'Activo',
    }
  ]; */

  const columns = [
    {
      title: 'Nombre',
      width: 'auto',
      dataIndex: 'username',      
      key: '0',
      fixed: 'left',
      filters: filterData(registers_info)(i => i.username),
      onFilter: (value, record) => record.username.includes(value),
      filterSearch: true,      
      render(text, record) {
        return {
          children: <div>{record.username}{
            (record._id === userid[4] ) && 
            <> 
              <Popconfirm
                   placement="right"
                    title={"Seguro que quieres " + [userid[1]] + [userid[2]]}
                    visible={visiblePop}
                    onConfirm={confirm}
                    onCancel={cancel}
                    size="large"
                  >

                  </Popconfirm>
            </>             
          }</div>
        };
      }, 
     },
    { title: 'Rol', dataIndex: 'ROL', key: '1',
          filters: _.uniqWith(filterData(registers_info)(i => i.ROL), _.isEqual),
          onFilter: (value, record) => record.ROL?record.ROL.includes(value):'',
          filterSearch: true,
    },
    { title: 'JUD/SUB/DIR', dataIndex: 'jud', key: '2',
          filters: _.uniqWith(filterData(registers_info)(i => i.jud), _.isEqual),
          onFilter: (value, record) => record.jud?record.jud.includes(value):'',
          filterSearch: true,
    },
    { title: 'Correo electrónico', dataIndex: 'email', key: '3',
          filters: _.uniqWith(filterData(registers_info)(i => i.email), _.isEqual),
          onFilter: (value, record) => record.email?record.email.includes(value):'',
          filterSearch: true,
    },
    { title: 'Espejo', dataIndex: 'espejo', key: '3',
          filters: _.uniqWith(filterData(registers_info)(i => i.espejo), _.isEqual),
          onFilter: (value, record) => record.espejo?record.espejo.includes(value):'',
          filterSearch: true,
    },
    { title: 'Activo', dataIndex: 'activo', key: '3',
          filters: _.uniqWith(filterData(registers_info)(i => i.activo), _.isEqual),
          onFilter: (value, record) => record.activo?record.activo.includes(value):'',
          filterSearch: true,
    },
    {
      title: 'Acciones',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Space size="middle">                  
              
            <> 
                <Tooltip title="Editar usuario">        
                    <Button 
                        type='primary'
                        icon={<EditOutlined />} 
                        onClick={() => {
                        setVisiblePop(true);
                        setuserid([record, 'Editar a ', record.email, 'EDIT', record._id])
                        }}
                    />
                </Tooltip>    
                <Tooltip title="Cambiar contraseña">        
                    <Button 
                        icon={<KeyOutlined />} 
                        onClick={() => {
                        setVisiblePop(true);
                        setuserid([record._id, 'Cambiar contraseña a ', record.email, 'EDIT_PASSWORD', record._id])
                        }}
                    />
                </Tooltip>  
                <Tooltip title="Eliminar usuario">        
                    <Button 
                        danger
                        icon={<DeleteFilled />} 
                        onClick={() => {
                        setVisiblePop(true);
                        setuserid([record._id, 'Eliminar a ', record.email, 'DELETE', record._id])
                        }}
                    />
                </Tooltip>
            </>          
        </Space>        
      ),
    },
  ];

  return (
    <>
    <NavbarUsers />
    <Card
    className="text-center"
    title={<AddNewButton setVisible={setVisible} />}
    >
         
          <div style={{ maxWidth: '100%' }}>
          <Spin spinning={isTableLoading} >
              <Table 
                columns={columns} 
                onChange={handleChange}
                dataSource={registers_info} 
             
                exportableProps={{ showColumnPicker: true, fileName: "registros", children: "Exportar"   }} 
                scroll={{ x: 'max-content'}}              
                pagination= { {defaultPageSize: 10, pageSizeOptions: ['5', '10', '20', '40'], showTotal: (total) => `Total ${total} registros de ${registers_info.length}` ,
                showSizeChanger: true, 
                }}          
                bordered
                size="small" 
              />      
            </Spin> 
           
            <AddUserModal visible={visible} setVisible={setVisible} />
            <EditUserModal visibleEditModal={visibleEditModal} setVisibleEditModal={setVisibleEditModal} rowData={userid[0]} />
            <EditPasswordModal visibleEditPasswordModal={visibleEditPasswordModal} setVisibleEditPasswordModal={setVisibleEditPasswordModal} rowData={userid[0]} />
          </div>


      </Card>
    </>
  );
};

UsersScreen.propTypes = {
  getusers: PropTypes.func.isRequired,
  deleteuser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  status: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  usersdata: state.usersdata,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { getusers, deleteuser })(UsersScreen);