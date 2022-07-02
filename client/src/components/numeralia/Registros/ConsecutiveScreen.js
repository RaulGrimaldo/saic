import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'; 
import { getconsecutives } from '../../../actions/consecutives';
import PropTypes from 'prop-types';
import { Table, Card, Button,Tooltip } from 'antd';
import AddNewButton from '../../ui/AddNewButton';
import UpsertConsecutivesModal from './UpsertConsecutivesModal';
import {
  RedoOutlined
} from '@ant-design/icons';
import NavbarUsers from '../../ui/NavbarUsers';




const ConsecutiveScreen = (
    {   getconsecutives, 
        consecutives_info:{consecutives},        
    }) => {
    // Estado de la visibilidad del modal para actualizar o insertar consecutivos
    const [visible, setVisible] = useState(false);

    // Datos a cargar en la tabla
    let consecutives_ = [];

    useEffect(() => {
      getCons()
    }, [visible]);
  
    //api calls functions ====>
  
    //get cases function
    const getCons = async () => {
      const response = await getconsecutives();
  
    };

    if (consecutives) {

      consecutives_ = consecutives;
      consecutives_.forEach(function (register) {
        register.key = register._id;      
      });
    } 


    const columns = [
      {
        title: 'Área',
        dataIndex: 'jud',
        key: 'jud',
      },
      {
        title: 'Consecutivo',
        dataIndex: 'consecutivo',
        key: 'consecutivo',
      },
    ];
    

    return (
        <>
        <NavbarUsers />
            <Card
              className="text-center"
              title={<AddNewButton setVisible={setVisible} title="Insertar o actualizar" buttonTitle="Editar" />}
            >
            <Tooltip title="Actualizar">
              <Button shape="circle" icon={<RedoOutlined />} onClick= { () => getconsecutives()} />
            </Tooltip>
              <Table columns={columns} dataSource={consecutives_} />
              <UpsertConsecutivesModal visible={visible} setVisible={setVisible} />              
            </Card>
           
        </>
    )
}

ConsecutiveScreen.propTypes = {
    getconsecutives: PropTypes.func.isRequired,
    upsertconsecutive: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
  consecutives_info: state.consecutives,
  loading: state.auth.loading
});
  
export default connect(mapStateToProps, { getconsecutives })(ConsecutiveScreen);
