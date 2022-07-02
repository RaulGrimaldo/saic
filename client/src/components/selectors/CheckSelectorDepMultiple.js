import React, { useEffect, useState } from 'react';
import { Form, Select , Checkbox, Tooltip} from 'antd';
import {funcGruposVulnerables, funcactividadusec,
        funcactividadmultiplicadores, funcactividaddse, funcactividaderum, funcAreaAlcoholimetro,
        funcAreaBVA, funcAreaCVM, funcAreaDDH, funcAreaDSB, funcactividadsct,
        funcactividadddsi, funcactividaddgcse, funcactividaddgicot, funcactividaducs,
        funcactividadsopaft, funcactividadsdicp, funcactividadccsjcdmx,
        funcactividadcdhcdmx    } from '../../data/formInfo';

const { Option } = Select;

export const CheckSelectorDepMultiple = ({value='NO', title="", message, placeholder, name, label, form}) => {
    
    let optionsToLoad;
    
    if(name === "grupoVulnerable"){
        optionsToLoad = funcGruposVulnerables();
    } else if( name === "actividadusec"){
        optionsToLoad = funcactividadusec()
    } else if( name === "actividadmultiplicadores"){
        optionsToLoad = funcactividadmultiplicadores()
    } else if( name === "actividaddse"){
        optionsToLoad = funcactividaddse()
    } else if( name === "actividaderum"){
        optionsToLoad = funcactividaderum()
    } else if( name === "actividadalcoholimetro"){
        optionsToLoad = funcAreaAlcoholimetro()
    } else if( name === "actividadbva"){
        optionsToLoad = funcAreaBVA()
    } else if( name === "actividadcvm"){
        optionsToLoad = funcAreaCVM()
    } else if( name === "actividadddh"){
        optionsToLoad = funcAreaDDH()
    } else if( name === "actividaddsb"){
        optionsToLoad = funcAreaDSB()
    } else if( name === "actividadsct"){
        optionsToLoad = funcactividadsct()
    } else if( name === "actividadddsi"){
        optionsToLoad = funcactividadddsi()
    } else if( name === "actividaddgcse"){
        optionsToLoad = funcactividaddgcse()
    } else if( name === "actividaddgicot"){
        optionsToLoad = funcactividaddgicot()
    } else if( name === "actividaducs"){
        optionsToLoad = funcactividaducs()
    } else if( name === "actividadsopaft"){
        optionsToLoad = funcactividadsopaft()
    } else if( name === "actividadsdicp"){
        optionsToLoad = funcactividadsdicp()
    } else if( name === "actividadccsjcdmx"){
        optionsToLoad = funcactividadccsjcdmx()
    } else if( name === "actividadcdhcdmx"){
        optionsToLoad = funcactividadcdhcdmx()
    }
    
    const options = [];
        
    for (let i = 0; i < optionsToLoad.length; i++) {
        options.push(<Option key={optionsToLoad[i]}>{optionsToLoad[i]}</Option>);
    }

    const [checkSelect, setCheckSelect] = useState(false);

    useEffect(() => {
        form.validateFields([{name}]);
        // eslint-disable-next-line
      }, [checkSelect]);

    const onCheckboxChange = (e) => {
        form.setFieldsValue({
            [`${name}`]: undefined
        })
        setCheckSelect(e.target.checked);
    }; 

    useEffect(() => {
        if(value.toString() !== 'NO'){
            setCheckSelect(true)
            form.setFieldsValue({
                [`${name}`]: value
            });
        }
        // eslint-disable-next-line
     }, []);

    
    return (
        <>
            <div className="col">
                    
                <Form.Item
                    name={name}
                    label={<Checkbox  checked={checkSelect}  onChange={onCheckboxChange} size="default">
                    <Tooltip title={title}>
                     {label}
                    </Tooltip>
                    </Checkbox>}                    
                    rules={[
                        {
                            required:  checkSelect,
                            message: `${message}`
                        },
                    ]}
                >
                    <Select 
                        mode="multiple"
                        allowClear
                        disabled={!checkSelect}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        optionFilterProp="children"
                        notFoundContent={"No hay coincidencias"}
                        placeholder={placeholder}
                        showSearch    
                        size="default"
                    >
                        {options}  
                    </Select>
                </Form.Item>          
            </div>                              
        </>
    );
}
