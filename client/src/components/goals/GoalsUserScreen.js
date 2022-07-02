import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getgoals, postgoals } from '../../actions/register';
import { Table} from "ant-table-extensions";


import PropTypes from 'prop-types';

import { Form, Select, Spin} from 'antd'; 
import NavbarUsers from '../ui/NavbarUsers';
const { Option } = Select;
 
const GoalsUserScreen = (
    {
    register: { goals }, user, getgoals, postgoals
}) => { 

    const [form] = Form.useForm();

    const [isTableLoading, setIsTableLoading] = useState(true);
    const [msgTableLoading, setMsgTableLoading] = useState("");

    useEffect(() => {
        setTimeout(() => {
          getgoals();
        }, 100);
    }, [])
    let goals_info = [];
    if(goals){
        goals_info = [];
        goals_info = goals;
        if(goals_info[0].Mes){
          setTimeout(() => {
            form.setFieldsValue({
              Mes: goals_info[0].Mes
            });
          }, 2000);  
          setTimeout(() => {
            setIsTableLoading(false);             
          }, 3000);
        }
    }
     
    let columns

    if(user.direccion === "DGPC"){
      columns = [

        { 
          title: 'Rubro', dataIndex: 'Rubro', key: '1',
        },
        { 
          title: 'Actual', dataIndex: 'count', key: '3',
          
        },
        { 
            title: 'Meta', dataIndex: 'meta', key: '2',
            
        },        
         { title: 'Diferencia', dataIndex: 'count', key: '4' ,            
              render(text, record) {
                return {
                  children: <div>{Number(record.count) - Number(record.meta)} 
                     
                  </div>
                };
            }
        }, 
      ]
    } else{
      columns = [

        { 
          title: 'Rubro', dataIndex: 'Rubro', key: '1',
          render(text, record) {
            return {
              children: <div>{(record.Direccion === user.direccion)?record.Rubro:record.Rubro + ' ' + record.Direccion} 
                 
              </div>
            };
        }
        },
        { 
            title: 'Actual', dataIndex: 'count', key: '3',
            
        },
        { 
            title: 'Meta', dataIndex: 'meta', key: '2',
            render(text, record) {
              return {
                children: <div>{(record.Direccion === user.direccion)?record.meta:""} 
                   
                </div>
              };
          }
            
        },        
         { title: 'Diferencia', dataIndex: 'count', key: '4' ,            
              render(text, record) {
                return {
                  children: <div>{(record.Direccion === user.direccion)?Number(record.count) - Number(record.meta) :""} 
                     
                  </div>
                };
            }
        },
      ]
    }
      const onFinish = async (values) => {
        
      postgoals(values)
    };

    function onChange(value) {
        console.log(`selected ${value}`);
        setIsTableLoading(true); 
            
        onFinish(form.getFieldsValue());
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }
    return (
        
        <>
            <NavbarUsers /> <br />
            <div style={{ maxWidth: '100%'}}>
              
                <Form
                    form={form}
                    name="control-hooks"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className='row'>
                      <div className='col'>
                      </div>
                      <div className='col-md-auto'>
                        <Form.Item 
                            name="Mes"
                        >
                          <Select
                            showSearch
                            placeholder="Seleccionar mes"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="01">Enero</Option>
                            <Option value="02">Febrero</Option>
                            <Option value="03">Marzo</Option>
                            <Option value="04">Abril</Option>
                            <Option value="05">Mayo</Option>
                            <Option value="06">Junio</Option>
                            <Option value="07">Julio</Option>
                            <Option value="08">Agosto</Option>
                            <Option value="09">Septiembre</Option>
                            <Option value="10">Octubre</Option>
                            <Option value="11">Noviembre</Option>
                            <Option value="12">Diciembre</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>                                
                </Form>
                <Spin spinning={isTableLoading} tip={msgTableLoading}>
                  <Table 
                      columns={columns} 
                      //onChange={handleChange}
                      
                      dataSource={goals_info} 
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
                 </Spin>                                                          
            </div>
        </>
    )
}


GoalsUserScreen.propTypes = {
    getgoals: PropTypes.func.isRequired,
    postgoals: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    register: state.register,
    loading: state.auth.loading,
    user: state.auth.user,
  });

export default connect(mapStateToProps, { getgoals,  
    postgoals})(GoalsUserScreen);
