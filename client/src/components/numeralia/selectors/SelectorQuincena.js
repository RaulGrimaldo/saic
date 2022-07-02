import React, {useEffect} from 'react';
import { Form, Select} from 'antd';  

const { Option } = Select;

const SelectorQuincena = ({postregisterstoclassify, QuincenaYear, setWorkAnother}) => {

    useEffect(() => {
      console.log(QuincenaYear)
        setTimeout(() => {
          if(QuincenaYear){
            form.setFieldsValue({
              QuincenaNum: QuincenaYear[0].toString(),
              Year: QuincenaYear[1].toString()
            });
          }
            
          }, 1000);
          
    }, [])

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values)
        postregisterstoclassify(values);
        setWorkAnother(values);

    };
  
    function onChange(value) {
        const valuesToPost = form.getFieldsValue()
        if(valuesToPost.QuincenaNum && valuesToPost.Year){
            onFinish(form.getFieldsValue());
        }        
    }
        
    function onSearch(val) {
        console.log('search:', val);
    }

    function onChange2(value) {
        form.setFieldsValue({
            QuincenaNum: null
          });
    }

    return (
        <>
             <Form
                    form={form}
                    name="control-hooks"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className='row'>
                        <div className='col'>
                        <Form.Item 
                            name="QuincenaNum"
                        >
                          <Select
                          style={{ width: '100%' }} 
                            showSearch
                            placeholder="Seleccionar quincena"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="1">1ra Quincena de Enero</Option>
                            <Option value="2">2da Quincena de Enero</Option>
                            <Option value="3">1ra Quincena de Febrero</Option>
                            <Option value="4">2da Quincena de Febrero</Option>
                            <Option value="5">1ra Quincena de Marzo</Option>
                            <Option value="6">2da Quincena de Marzo</Option>
                            <Option value="7">1ra Quincena de Abril</Option>
                            <Option value="8">2da Quincena de Abril</Option>
                            <Option value="9">1ra Quincena de Mayo</Option>
                            <Option value="10">2da Quincena de Mayo</Option>
                            <Option value="11">1ra Quincena de Junio</Option>
                            <Option value="12">2da Quincena de Junio</Option>
                            <Option value="13">1ra Quincena de Julio</Option>
                            <Option value="14">2da Quincena de Julio</Option>
                            <Option value="15">1ra Quincena de Agosto</Option>
                            <Option value="16">2da Quincena de Agosto</Option>
                            <Option value="17">1ra Quincena de Septiembre</Option>
                            <Option value="18">2da Quincena de Septiembre</Option>
                            <Option value="19">1ra Quincena de Octubre</Option>
                            <Option value="20">2da Quincena de Octubre</Option>
                            <Option value="21">1ra Quincena de Noviembre</Option>
                            <Option value="22">2da Quincena de Noviembre</Option>
                            <Option value="23">1ra Quincena de Diciembre</Option>
                            <Option value="24">2da Quincena de Diciembre</Option>
                          </Select>
                        </Form.Item>  
                        </div>
                        <div className='col'>
                        <Form.Item 
                            name="Year"
                        >
                          <Select
                            style={{ width: '100%' }} 
                            showSearch
                            placeholder="Seleccionar año"
                            optionFilterProp="children"
                            onChange={onChange2}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="2022">2022</Option>
                            <Option value="2021">2021</Option>
                          </Select>
                        </Form.Item> 
                        </div>
                    </div>
                                                                        
                </Form>
        </>
    )
}

export default SelectorQuincena
