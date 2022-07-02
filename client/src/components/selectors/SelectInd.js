import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import { funcSubrubros, funcTipos, funcRoles, 
    funcAreas, funcAreasFull, funcJuds, funcTurno, funcZona, funcPublico,
    funcEtapa, funcUnidadMedida, funcnomclas, funcdescclas, funcEstrategias } from '../../data/formInfo';
   
const { Option } = Select;

export const SelectInd = ({direccion, message, placeholder, name, label, JUD, form, value='undefined'}) => {     
 
    let optionsToLoad = [];
    if(name === "Tipo"){
        optionsToLoad = funcTipos(direccion);
    } else if(name === "Subrubro"){
        optionsToLoad = funcSubrubros();
    } else if(name === "rol"){
        optionsToLoad = funcRoles();
    } else if(name === "area"){
        optionsToLoad = funcAreas();
    } else if(name === "areafull"){
        optionsToLoad = funcAreasFull();
    } else if(name === "JUD"){
        optionsToLoad = funcJuds(JUD);
    }  else if(name === "turno"){
        optionsToLoad = funcTurno();
    } else if(name === "zona"){
        optionsToLoad = funcZona();
    } else if(name === "publicodirigido"){
        optionsToLoad = funcPublico();
    } else if(name === 'Etapa'){
        optionsToLoad = funcEtapa();
    } else if(name === 'uniclas'){
        optionsToLoad = funcUnidadMedida();
    } else if(name === 'nomclas'){
        optionsToLoad = funcnomclas();
    } else if(name === 'descclas'){
        optionsToLoad = funcdescclas();
    } else if(name === "estrategia"){
        optionsToLoad = funcEstrategias();
    }
    
    useEffect(() => {
        if(value !== 'undefined'){
            try {
                form.setFieldsValue({
                    [`${name}`]: value.toString()
                });
            } catch (error) {
                
            }            
        }
        // eslint-disable-next-line
     }, []);

    const options = [];
        
    for (let i = 0; i < optionsToLoad.length; i++) {
        options.push(<Option key={optionsToLoad[i]}>{optionsToLoad[i]}</Option>);
    }

    return ( 
        <>
            <Form.Item
                name={name}
                label={label}
                rules={[
                    {
                        required: true,
                        message: {message},
                    },
                ]}
            >
            <Select
                allowClear
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
        </>
    )
}
