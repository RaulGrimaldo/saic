
import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { queryregisters } from '../../actions/register';
import { Table } from "ant-table-extensions";
import Alertd from '../ui/Alertd';
import { Space, Spin } from 'antd'; 
import PropTypes from 'prop-types';


import _ from "lodash";

import 'antd/dist/antd.min.css';
import SelectorQuery from './SelectorQuery';
import NavbarUsers from '../ui/NavbarUsers';

const QueryUserScreen = (
    {
    register: { registersQuery }, queryregisters
}) => {
   


  // Manejo de los datos a usar en las acciones de los registros
  // idRegister[0] = id
  // idRegister[1] = mensaje => 'eliminar a '
  // idRegister[2] = ID
  // idRegister[3] = accion => DELETE

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [msgTableLoading, setMsgTableLoading] = useState("");

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

  let registers_info = [];
  let total;
  if(registersQuery){
    registers_info = [];
    registers_info = registersQuery;

    registers_info.forEach(function (register) {
      register.key = register._id;      
     });
     
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
      total = registers_info.length;
    } else{
      total = filters[1].length;
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
    },
    { title: 'Estrategia 1', dataIndex: 'userprograma1', key: '70',
      filters: _.uniqWith(filterData(registers_info)(i => i.userprograma1), _.isEqual),
      onFilter: (value, record) => record.userprograma1?record.userprograma1.toString().includes(value):'',
      filterSearch: true,
    },
    { title: 'BA', dataIndex: 'userprograma2', key: '71',
      filters: _.uniqWith(filterData(registers_info)(i => i.userprograma2), _.isEqual),
      onFilter: (value, record) => record.userprograma2?record.userprograma2.toString().includes(value):'',
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
    { title: 'Temas Tratados', dataIndex: 'TemasTratados', key: '26' ,
      render() {
        return {
          children: <div>+</div>
        };
      }
    },
    { title: 'Acuerdos', dataIndex: 'Acuerdos', key: '27',

      render() {
        return {
          children: <div>+</div>
        };
      }
    },
    { title: 'Total solicitudes', dataIndex: 'Solicitudes', key: '28',
      filters: _.uniqWith(filterData(registers_info)(i => i.Solicitudes), _.isEqual),
      onFilter: (value, record) => record.Solicitudes.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Observaciones', dataIndex: 'observaciones', key: '29', 
      render() {
        return {
          children: <div>+</div>
        };
      }
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
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadusec), _.isEqual),
      onFilter: (value, record) => record.actividadusec.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Multiplicadores', dataIndex: 'actividadmultiplicadores', key: '38',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadmultiplicadores), _.isEqual),
      onFilter: (value, record) => record.actividadmultiplicadores.toString().includes(value),
      filterSearch: true,
    },
    { title: 'DSE', dataIndex: 'actividaddse', key: '39',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddse), _.isEqual),
      onFilter: (value, record) => record.actividaddse.includes(value),
      filterSearch: true,
    },
    { title: 'ERUM', dataIndex: 'actividaderum', key: '40',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaderum), _.isEqual),
      onFilter: (value, record) => record.actividaderum.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Alcoholímetro', dataIndex: 'actividadalcoholimetro', key: '41',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadalcoholimetro), _.isEqual),
      onFilter: (value, record) => record.actividadalcoholimetro.toString().includes(value),
      filterSearch: true,
    },
    { title: 'BVA', dataIndex: 'actividadbva', key: '42',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadbva), _.isEqual),
      onFilter: (value, record) => record.actividadbva.toString().includes(value),
      filterSearch: true,
    },
    { title: 'CVM', dataIndex: 'actividadcvm', key: '43',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadcvm), _.isEqual),
      onFilter: (value, record) => record.actividadcvm.toString().includes(value),
      filterSearch: true,
    },
    { title: 'DDH', dataIndex: 'actividadddh', key: '44',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadddh), _.isEqual),
      onFilter: (value, record) => record.actividadddh.toString().includes(value),
      filterSearch: true,
    },
    { title: 'DESyBISO', dataIndex: 'actividaddsb', key: '45',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddsb), _.isEqual),
      onFilter: (value, record) => record.actividaddsb.toString().includes(value),
      filterSearch: true,
    },
    { title: 'DGCSE', dataIndex: 'actividaddgcse', key: '46',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddgcse), _.isEqual),
      onFilter: (value, record) => record.actividaddgcse.toString().includes(value),
      filterSearch: true,
    },
    { title: 'DGICOT', dataIndex: 'actividaddgicot', key: '47',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddgicot), _.isEqual),
      onFilter: (value, record) => record.actividaddgicot.toString().includes(value),
      filterSearch: true,
    },
    { title: 'UCS', dataIndex: 'actividaducs', key: '48',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaducs), _.isEqual),
      onFilter: (value, record) => record.actividaducs.toString().includes(value),
      filterSearch: true,
    },
    { title: 'SOPAFT', dataIndex: 'actividadsopaft', key: '49',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadsopaft), _.isEqual),
      onFilter: (value, record) => record.actividadsopaft.toString().includes(value),
      filterSearch: true,
    },
    { title: 'SDICP', dataIndex: 'actividadsdicp', key: '50',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadsdicp), _.isEqual),
      onFilter: (value, record) => record.actividadsdicp.toString().includes(value),
      filterSearch: true,
    },
    { title: 'CCSJCDMX', dataIndex: 'actividadccsjcdmx', key: '51',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadccsjcdmx), _.isEqual),
      onFilter: (value, record) => record.actividadccsjcdmx.toString().includes(value),
      filterSearch: true,
    },
    { title: 'CDHCDMX', dataIndex: 'actividadcdhcdmx', key: '52',
      render(text, record) {
        return {
          children: <div>{text + ''}</div>
        };
      },
      filters: _.uniqWith(filterData(registers_info)(i => i.actividadcdhcdmx), _.isEqual),
      onFilter: (value, record) => record.actividadcdhcdmx.toString().includes(value),
      filterSearch: true,
    },
    { title: 'DGPD', dataIndex: 'actividaddgpd', key: '53',
      filters: _.uniqWith(filterData(registers_info)(i => i.actividaddgpd), _.isEqual),
      onFilter: (value, record) => record.actividaddgpd.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Otras Áreas', dataIndex: 'otrasareas', key: '54',
      filters: _.uniqWith(filterData(registers_info)(i => i.otrasareas), _.isEqual),
      onFilter: (value, record) => record.otrasareas.toString().includes(value),
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
      onFilter: (value, record) => record.nombrepersona1.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 2', dataIndex: 'nombrepersona2', key: '58',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona2), _.isEqual),
      onFilter: (value, record) => record.nombrepersona2.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 3', dataIndex: 'nombrepersona3', key: '59',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona3), _.isEqual),
      onFilter: (value, record) => record.nombrepersona3.includes(value),
      filterSearch: true,
    },
    { title: 'Personal 4', dataIndex: 'nombrepersona4', key: '60',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona4), _.isEqual),
      onFilter: (value, record) => record.nombrepersona4.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 5', dataIndex: 'nombrepersona5', key: '61',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona5), _.isEqual),
      onFilter: (value, record) => record.nombrepersona5.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 6', dataIndex: 'nombrepersona6', key: '62',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona6), _.isEqual),
      onFilter: (value, record) => record.nombrepersona6.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 7', dataIndex: 'nombrepersona7', key: '63',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona7), _.isEqual),
      onFilter: (value, record) => record.nombrepersona7.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Personal 8', dataIndex: 'nombrepersona8', key: '64',
      filters: _.uniqWith(filterData(registers_info)(i => i.nombrepersona8), _.isEqual),
      onFilter: (value, record) => record.nombrepersona8.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Turno', dataIndex: 'turno', key: '65',
      filters: _.uniqWith(filterData(registers_info)(i => i.turno), _.isEqual),
      onFilter: (value, record) => record.turno.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Folios asociados', dataIndex: 'foliosasociados', key: '66',
      filters: _.uniqWith(filterData(registers_info)(i => i.foliosasociados), _.isEqual),
      onFilter: (value, record) => record.foliosasociados.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Sector', dataIndex: 'sector', key: '67',
      filters: _.uniqWith(filterData(registers_info)(i => i.sector), _.isEqual),
      onFilter: (value, record) => record.sector.toString().includes(value),
      filterSearch: true,
    },
    { title: 'CCT', dataIndex: 'claveCCT', key: '68',
      filters: _.uniqWith(filterData(registers_info)(i => i.claveCCT), _.isEqual),
      onFilter: (value, record) => record.claveCCT.toString().includes(value),
      filterSearch: true,
    },
    ,
    { title: 'Mátricula', dataIndex: 'matricula', key: '69',
      filters: _.uniqWith(filterData(registers_info)(i => i.matricula), _.isEqual),
      onFilter: (value, record) => record.matricula.toString().includes(value),
      filterSearch: true,
    },
    { title: 'Sector Educativo', dataIndex: 'sectoreducativo', key: '70',
      filters: _.uniqWith(filterData(registers_info)(i => i.sectoreducativo), _.isEqual),
      onFilter: (value, record) => record.sectoreducativo?record.sectoreducativo.toString().includes(value):'',
      filterSearch: true,
    },
  ];

  

    //Si la respuesta es positiva limpiar el formulario para cargar nuevo usuario

  return ( 
    <>
      <NavbarUsers /> <br />
      <div className="card mb-3" >    

        <div className="card-header text-center">
          <Space size="middle">  
          
                <SelectorQuery queryregisters={queryregisters} setIsTableLoading={setIsTableLoading}/>
            
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

QueryUserScreen.propTypes = {
  queryregisters: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
  
const mapStateToProps = (state) => ({
  register: state.register,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {   
    queryregisters})(QueryUserScreen);
  
