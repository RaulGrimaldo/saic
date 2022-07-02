import React, { useState} from 'react';
import { connect } from 'react-redux';
import { queryregisters } from '../../../actions/register';
import { Table } from "ant-table-extensions";
import { Space, Spin } from 'antd';             
import PropTypes from 'prop-types';
import _ from "lodash";
import SelectorQuery from '../../querys/SelectorQuery';

import 'antd/dist/antd.min.css';


const QueryScreen = (
    {
    register: { registersQuery }, queryregisters, user
}) => {
   


  // Manejo de los datos a usar en las acciones de los registros
  // idRegister[0] = id
  // idRegister[1] = mensaje => 'eliminar a '
  // idRegister[2] = ID
  // idRegister[3] = accion => DELETE

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [total, setTotal] = useState(0);
  let registers_info = [];
  //var total;
  if(registersQuery){
    
    registers_info = []; 
    registers_info = registersQuery;

    setTimeout(() => {
      setIsTableLoading(false); 
      
    }, 3000);
  }
  

  const filterData = data => formatter => data.map( item => ({
    text: formatter(item),
    value: formatter(item),
    key: formatter(item.ID)
  }))


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
      render(text, record) {
        return {
          children: <div>{record.ID}</div>
        };
      }, 
     },
    { 
      title: 'Fecha', dataIndex: 'fecharango', key: '2', 
      filters: _.uniqWith(filterData(registers_info)(i => i.fecharango), _.isEqual),
      onFilter: (value, record) => record.fecharango.includes(value),
      filterSearch: true,
    },
   /*  { title: 'Estrategia 1', dataIndex: 'userprograma1', key: '66',
      filters: _.uniqWith(filterData(registers_info)(i => i.userprograma1), _.isEqual),
      onFilter: (value, record) => record.userprograma1?record.userprograma1.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'BA', dataIndex: 'userprograma2', key: '67',
      filters: _.uniqWith(filterData(registers_info)(i => i.userprograma2), _.isEqual),
      onFilter: (value, record) => record.userprograma2?record.userprograma2.toString().includes(value):'',
      filterSearch: true,
    }, */
    { title: 'Estrategia', dataIndex: 'estrategia', key: '3',
      filters: _.uniqWith(filterData(registers_info)(i => i.estrategia), _.isEqual),
      onFilter: (value, record) => record.estrategia?record.estrategia.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Validador Estrategia 1', dataIndex: 'programa1', key: '4',
      filters: _.uniqWith(filterData(registers_info)(i => i.programa1), _.isEqual),
      onFilter: (value, record) => record.programa1?record.programa1.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Validador BA', dataIndex: 'programa2', key: '5',
      filters: _.uniqWith(filterData(registers_info)(i => i.programa2), _.isEqual),
      onFilter: (value, record) => record.programa2?record.programa2.toString().includes(value):'',
      filterSearch: true,
    },
    { 
      title: 'Tipo', dataIndex: 'Tipo', key: '6', 
      filters: _.uniqWith(filterData(registers_info)(i => i.Tipo), _.isEqual),
      onFilter: (value, record) => record.Tipo.includes(value),
      filterSearch: true, 
    },
    { title: 'Actividad', dataIndex: 'Actividad', key: '7', 
      filters: _.uniqWith(filterData(registers_info)(i => i.Actividad), _.isEqual),
      onFilter: (value, record) => record.Actividad.includes(value),
      filterSearch: true, 
    },
    { title: 'Rubro', dataIndex: 'Rubro', key: '8',
      filters: _.uniqWith(filterData(registers_info)(i => i.Rubro), _.isEqual),
      onFilter: (value, record) => record.Rubro.includes(value),
      filterSearch: true, 
    },
    { title: 'Subrubro', dataIndex: 'Subrubro', key: '9',
      filters: _.uniqWith(filterData(registers_info)(i => i.Subrubro), _.isEqual),
      onFilter: (value, record) => record.Subrubro.includes(value),
      filterSearch: true, 
    },
    { title: 'Institución', dataIndex: 'institucion', key: '10',
      filters: _.uniqWith(filterData(registers_info)(i => i.institucion), _.isEqual),
      onFilter: (value, record) => record.institucion.includes(value),
      filterSearch: true, 
    },
    { title: 'Nombre del Contacto', dataIndex: 'Contacto', key: '11',
      filters: _.uniqWith(filterData(registers_info)(i => i.Contacto), _.isEqual),
      onFilter: (value, record) => record.Contacto.includes(value),
      filterSearch: true,
    },
    { title: 'Cargo', dataIndex: 'Cargo', key: '12',
      filters: _.uniqWith(filterData(registers_info)(i => i.Cargo), _.isEqual),
      onFilter: (value, record) => record.Cargo.includes(value),
      filterSearch: true,
    },
    { title: 'Correo electrónico', dataIndex: 'Email', key: '13',
      filters: _.uniqWith(filterData(registers_info)(i => i.Email), _.isEqual),
      onFilter: (value, record) => record.Email.includes(value),
      filterSearch: true,
    },
    { title: 'Teléfono', dataIndex: 'Telefono', key: '14',
      filters: _.uniqWith(filterData(registers_info)(i => i.Telefono), _.isEqual),
      onFilter: (value, record) => record.Telefono.includes(value),
      filterSearch: true, 
    },
    { title: 'Calle', dataIndex: 'Calle', key: '15',
      filters: _.uniqWith(filterData(registers_info)(i => i.Calle), _.isEqual),
      onFilter: (value, record) => record.Calle.includes(value),
      filterSearch: true,
    },
    { title: 'Número', dataIndex: 'Numero', key: '16',
      filters: _.uniqWith(filterData(registers_info)(i => i.Numero), _.isEqual),
      onFilter: (value, record) => record.Numero.includes(value),
      filterSearch: true,
    },
    { title: 'Colonia', dataIndex: 'Colonia', key: '17',
      filters: _.uniqWith(filterData(registers_info)(i => i.Colonia), _.isEqual),
      onFilter: (value, record) => record.Colonia.includes(value),
      filterSearch: true,
    },
    { title: 'Alcaldía', dataIndex: 'Alcaldia', key: '18',
      filters: _.uniqWith(filterData(registers_info)(i => i.Alcaldia), _.isEqual),
      onFilter: (value, record) => record.Alcaldia.includes(value),
      filterSearch: true,
    },
    { title: 'Coordenada X', dataIndex: 'coordx', key: '19',
    filters: _.uniqWith(filterData(registers_info)(i => i.coordx), _.isEqual),
    onFilter: (value, record) => record.coordx.toString().includes(value),
    filterSearch: true,
    },
    { title: 'Coordenada Y', dataIndex: 'coordy', key: '20',
      filters: _.uniqWith(filterData(registers_info)(i => i.coordy), _.isEqual),
      onFilter: (value, record) => record.coordy.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Asistentes', dataIndex: 'Asistentes', key: '21',
      filters: _.uniqWith(filterData(registers_info)(i => i.Asistentes), _.isEqual),
      onFilter: (value, record) => record.Asistentes.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Mujeres', dataIndex: 'asistentesmujeres', key: '22',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentesmujeres), _.isEqual),
      onFilter: (value, record) => record.asistentesmujeres.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Hombres', dataIndex: 'asistenteshombres', key: '23',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistenteshombres), _.isEqual),
      onFilter: (value, record) => record.asistenteshombres.toString().includes(value),
      filterSearch: true,
    },
    { title: '0-18', dataIndex: 'asistentes014', key: '24',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes014), _.isEqual),
      onFilter: (value, record) => record.asistentes014.toString().includes(value),
      filterSearch: true,
      render(text, record) {
        return {
          children: <div>{Number(record.asistentes014) + Number(record.asistentes1518)}</div>
        };
      }
    },
    { title: '19-50', dataIndex: 'asistentes1965', key: '25',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes1965), _.isEqual),
      onFilter: (value, record) => record.asistentes1965.toString().includes(value),
      filterSearch: true,
    },
    { title: '51 y más', dataIndex: 'asistentes65mas', key: '26',
      filters: _.uniqWith(filterData(registers_info)(i => i.asistentes65mas), _.isEqual),
      onFilter: (value, record) => record.asistentes65mas.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Temas Tratados', dataIndex: 'TemasTratados', key: '27' ,
      render() {
        return {
          children: <div>+</div>
        };
      }
    },
    { title: 'Acuerdos', dataIndex: 'Acuerdos', key: '28',

      render() {
        return {
          children: <div>+</div>
        };
      }
    },
    { title: 'Total solicitudes', dataIndex: 'Solicitudes', key: '29',
      filters: _.uniqWith(filterData(registers_info)(i => i.Solicitudes), _.isEqual),
      onFilter: (value, record) => record.Solicitudes.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Observaciones', dataIndex: 'observaciones', key: '30', 
      render() {
        return {
          children: <div>+</div>
        };
      }
    },
    { title: 'JUD', dataIndex: 'JUD', key: '31',
      filters: _.uniqWith(filterData(registers_info)(i => i.JUD), _.isEqual),
      onFilter: (value, record) => record.JUD.includes(value),
      filterSearch: true,
    },
    { title: 'Cuadrante', dataIndex: 'Cuadrante', key: '32',
      filters: _.uniqWith(filterData(registers_info)(i => i.Cuadrante), _.isEqual),
      onFilter: (value, record) => record.Cuadrante.includes(value),
      filterSearch: true,
    },
    { title: 'Imagenes', dataIndex: 'imgtotal', key: '33',
      filters: _.uniqWith(filterData(registers_info)(i => i.imgtotal), _.isEqual),
      onFilter: (value, record) => record.imgtotal.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Otras Áreas', dataIndex: 'otrasareas', key: '34',
      filters: _.uniqWith(filterData(registers_info)(i => i.otrasareas), _.isEqual),
      onFilter: (value, record) => record.otrasareas.toString().includes(value),
      filterSearch: true,
      render(text, record) {
        return {
          children: <div>{
          ((record.actividadusec !== 'NO') || (record.actividadmultiplicadores !== 'NO') ||
          (record.actividaddse !== 'NO') || (record.actividaderum !== 'NO') ||
          (record.actividadalcoholimetro !== 'NO') || (record.actividadbva !== 'NO') ||
          (record.actividadcvm !== 'NO') || (record.actividadddh !== 'NO') ||
          (record.actividaddsb !== 'NO') || (record.actividaddgcse !== 'NO') ||
          (record.actividaddgicot !== 'NO') || (record.actividaducs !== 'NO') ||
          (record.actividadsopaft !== 'NO') || (record.actividadsdicp !== 'NO') ||
          (record.actividadccsjcdmx !== 'NO') || (record.actividadcdhcdmx !== 'NO') ||
          (record.actividaddgpd !== 'NO') || (record.otrasareas !== 'NO'))?"NO":"SI"} 
             
          </div>
        };
    }
    },
    { title: 'Etapa', dataIndex: 'Etapa', key: '35',
      filters: _.uniqWith(filterData(registers_info)(i => i.Etapa), _.isEqual),
      onFilter: (value, record) => record.Etapa?record.Etapa.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Descripción de actividad', dataIndex: 'descclas', key: '36',
      filters: _.uniqWith(filterData(registers_info)(i => i.descclas), _.isEqual),
      onFilter: (value, record) => record.descclas?record.descclas.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Nombre de actividad', dataIndex: 'nomclas', key: '37',
      filters: _.uniqWith(filterData(registers_info)(i => i.nomclas), _.isEqual),
      onFilter: (value, record) => record.nomclas?record.nomclas.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Unidad de medida', dataIndex: 'uniclas', key: '38',
      filters: _.uniqWith(filterData(registers_info)(i => i.uniclas), _.isEqual),
      onFilter: (value, record) => record.uniclas?record.uniclas.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Área de solicitud', dataIndex: 'areaclas', key: '39',
      filters: _.uniqWith(filterData(registers_info)(i => i.areaclas), _.isEqual),
      onFilter: (value, record) => record.areaclas?record.areaclas.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Tema de solicitud', dataIndex: 'temaclas', key: '40',
      filters: _.uniqWith(filterData(registers_info)(i => i.temaclas), _.isEqual),
      onFilter: (value, record) => record.temaclas?record.temaclas.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Grupo Vulnerable', dataIndex: 'grupovulnerable', key: '41',
      filters: _.uniqWith(filterData(registers_info)(i => i.grupovulnerable), _.isEqual),
      onFilter: (value, record) => record.grupovulnerable.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Dirección', dataIndex: 'Direccion', key: '42',
      filters: _.uniqWith(filterData(registers_info)(i => i.Direccion), _.isEqual),
      onFilter: (value, record) => record.Direccion.toString().includes(value),
      filterSearch: true,
    },
    { title: 'JUD', dataIndex: 'JUD', key: '43',
    filters: _.uniqWith(filterData(registers_info)(i => i.JUD), _.isEqual),
      onFilter: (value, record) => record.JUD.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Público', dataIndex: 'publicodirigido', key: '44',
    filters: _.uniqWith(filterData(registers_info)(i => i.publicodirigido), _.isEqual),
      onFilter: (value, record) => record.publicodirigido?record.publicodirigido.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Quincena', dataIndex: 'Quincena', key: '45',
      filters: _.uniqWith(filterData(registers_info)(i => i.Quincena), _.isEqual),
      onFilter: (value, record) => record.Quincena.includes(value),
      filterSearch: true,
    },
    { title: 'CCT', dataIndex: 'claveCCT', key: '46',
      filters: _.uniqWith(filterData(registers_info)(i => i.claveCCT), _.isEqual),
      onFilter: (value, record) => record.claveCCT?record.claveCCT.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Mátricula', dataIndex: 'matricula', key: '47',
      filters: _.uniqWith(filterData(registers_info)(i => i.matricula), _.isEqual),
      onFilter: (value, record) => record.matricula?record.matricula.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'Sector Educativo', dataIndex: 'sectoreducativo', key: '48',
      filters: _.uniqWith(filterData(registers_info)(i => i.sectoreducativo), _.isEqual),
      onFilter: (value, record) => record.sectoreducativo?record.sectoreducativo.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'CAMAI', dataIndex: 'catalogogeneral', key: '49',
      filters: _.uniqWith(filterData(registers_info)(i => i.catalogogeneral), _.isEqual),
      onFilter: (value, record) => record.catalogogeneral.toString().includes(value),
      filterSearch: true,
    },
  ];

  

    //Si la respuesta es positiva limpiar el formulario para cargar nuevo usuario

  return ( 
    <>
      <div className="card mb-3" >    

        <div className="card-header text-center">
          <Space size="middle">  
                
                <SelectorQuery user={user} queryregisters={queryregisters} setIsTableLoading={setIsTableLoading}/>
            
          </Space>       
        </div>
              
        <div className="row g-4 cardadduser animate__animated animate__animated animate__fadeIn">
                    
          <div style={{ maxWidth: '100%'}}>


            <br />
            <Spin spinning={isTableLoading}>
              <Table 
                columns={columns} 
                onChange={handleChange}
                expandable={{
                  rowExpandable: record => record.key = record.ID,
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
                pagination= { {defaultPageSize: 10, pageSizeOptions: ['5', '10', '20', '40'], showTotal: (total) => `Total ${total} registros de ${registers_info.length}` ,
                showSizeChanger: true, 
                }}          
                bordered
                size="small" 
              />    
            </Spin>                                                          
          </div>

        </div>

      </div>
    </>
  )
}

QueryScreen.propTypes = {
  queryregisters: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
  
const mapStateToProps = (state) => ({
  register: state.register,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {   
    queryregisters})(QueryScreen);
  