import React, { useState } from 'react';
import SelectorQuery from '../querys/SelectorQuery';
import { connect } from 'react-redux';
import { queryagreggate } from '../../actions/register';
import { Space } from 'antd';   
import { Table} from "ant-table-extensions";

const RubrosScreen = (
    { register: { registersAgreggate, registersActividades, registersJuds }, 
    queryagreggate, user}) => {

    const [isTableLoading, setIsTableLoading] = useState(false);

    let rubro_info= [];
    if(registersAgreggate){
        rubro_info = registersAgreggate;
    }

    let actividad_info= [];
    if(registersActividades){
        actividad_info = registersActividades;
    }

    let juds_info= [];
    if(registersJuds){
        juds_info = registersJuds;
    }

    let columns = [

        { 
          title: 'Rubro', dataIndex: '_id', key: '1',
        },
        { 
            title: 'Total', dataIndex: 'count', key: '2',
            
        },
        { 
            title: 'Asistentes', dataIndex: 'Asistentes', key: '3',
            
        }         
    ];

    let columns2 = [

        { 
          title: 'Actividad', dataIndex: '_id', key: '1',
        },
        { 
            title: 'Total', dataIndex: 'count', key: '2',
            
        }         
    ];

    let columns3 = [

        { 
          title: 'JUD/SUB', dataIndex: '_id', key: '1',
        },
        { 
            title: 'Total', dataIndex: 'count', key: '2',
            
        }         
    ];

    return (
            <>
                <div className="card mb-3" >    

                    <div className="card-header text-center">
                    <Space size="middle">  
                    
                            <SelectorQuery user={user} queryagreggate={queryagreggate} setIsTableLoading={setIsTableLoading}/>
                        
                    </Space>       
                    </div>
                        
                    <div className="row g-4 cardadduser animate__animated animate__animated animate__fadeIn">
                                
                    <div style={{ maxWidth: '100%'}}>

                        <br />
                        <Table 
                            columns={columns} 
                            //onChange={handleChange}
                            key='1'
                            dataSource={rubro_info} 
                        /* searchableProps={{
                            // dataSource,
                            // setDataSource: setSearchDataSource,
                            inputProps: {
                                placeholder: "Buscar...",
                                prefix: <SearchOutlined />,
                            },
                            }}*/
                            pagination= { {defaultPageSize: 10, pageSizeOptions: ['5', '10', '20', '40'],
                        showSizeChanger: true, 
                      }} 
                            scroll={{ x: 'max-content'}}                    
                            bordered
                            size="small" 
                        />                                                   
                    </div>

                    <div style={{ maxWidth: '100%'}}>

                    <br />
                    <Table 
                        columns={columns2} 
                        //onChange={handleChange}
                        key='2'
                        dataSource={actividad_info} 
                    /* searchableProps={{
                        // dataSource,
                        // setDataSource: setSearchDataSource,
                        inputProps: {
                            placeholder: "Buscar...",
                            prefix: <SearchOutlined />,
                        },
                        }}*/
                        pagination= { {defaultPageSize: 10, pageSizeOptions: ['5', '10', '20', '40'],
                    showSizeChanger: true, 
                    }} 
                        scroll={{ x: 'max-content'}}                    
                        bordered
                        size="small" 
                    />                                                   
                    </div>
                    <div style={{ maxWidth: '100%'}}>

                    <br />
                    <Table 
                        columns={columns3} 
                        //onChange={handleChange}
                        key='3'
                        dataSource={juds_info} 
                    /* searchableProps={{
                        // dataSource,
                        // setDataSource: setSearchDataSource,
                        inputProps: {
                            placeholder: "Buscar...",
                            prefix: <SearchOutlined />,
                        },
                        }}*/
                        pagination= { {defaultPageSize: 10, pageSizeOptions: ['5', '10', '20', '40'],
                    showSizeChanger: true, 
                    }} 
                        scroll={{ x: 'max-content'}}                    
                        bordered
                        size="small" 
                    />                                                   
                    </div>
                    </div>

                </div>
            </>
    )
}

const mapStateToProps = (state) => ({
    register: state.register,
    user: state.auth.user,
});

export default connect(mapStateToProps, {   
    queryagreggate})(RubrosScreen);