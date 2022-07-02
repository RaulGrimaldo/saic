import React, {useEffect, useState} from 'react';
import { Form, Select, notification } from 'antd';
import { funcActividades, funcRubro, funcRol, funcJud, funcTurno, funcSectorEducativo, 
    alcaldias, funcAlcaldiaColonia, funcCuadrantes } from '../../data/formInfo';
import { InputNum } from '../inputs/InputNum';
import CheckerSector from '../checkers/CheckerSector';
import { func333BA } from './valuesStrategy';
import InputtextRequired from '../inputs/InputtextRequired';

const { Option } = Select;

export const SelectDep = (
    {   direccion, indMessage, indPlaceholder, indName, indLabel, 
        depMessage, depPlaceholder, depName, depLabel, 
        form, value='undefined', value2='undefined', value3='undefined', Cuadrante='undefined',
        coordx=19.0000001, coordy=-99.0000001, sector='undefined', 
        claveCCT='undefined', matricula='undefined', sectoreducativo='undefined'}) => {     

    let indValues = [];

    if (indName === 'Actividad') {
        indValues = funcActividades();
    } else if (indName === 'ROL'){
        indValues = funcRol();
    } else if (indName === 'Alcaldia'){
        indValues = alcaldias();
    }

    function getDepValues(value){
        if(depName === 'Rubro'){
            return funcRubro(direccion, value);
        } else if(depName === 'jud'){
            return funcJud(value)
        } else if(depName === 'Colonia'){
            return funcAlcaldiaColonia(value)
        }
        //Aquí van los valores dependientes
    }        

    const [cuadrante, setCuadrante] = useState(Cuadrante)

    const [depValues, setDepValues] = useState([]);

    const [turnValues, setTurnValues] = useState([]);

    const [sectorEducativoValues, setSectorEducativoValues] = useState([]);

    const [cuadranteValues, setCuadranteValues] = useState([]);

    const [isHideen, setIsHideen] = useState(true);

    const [alcaldiaC, setAlcaldiaC] = useState("");

    const [coloniaC, setColoniaC] = useState("");

    function getturnValues(value){
        if(value === 'Instituciones educativas'){
            return funcTurno();

        } else{;
            return [];
        }
    }  

    function getSectorEducativoValues(value){
        if(value === 'Instituciones educativas'){
            return funcSectorEducativo();

        } else{;
            return [];
        }
    } 

    function getSectorValues(value){
        return funcCuadrantes(value);
        //Aquí van los valores dependientes
    }  

 
    const handleIndValueChange = value => {        
        setDepValues([]);
        setDepValues(getDepValues(value));
        
        form.setFieldsValue({
            [`${depName}`]: undefined
        })      
        if(indName === 'Alcaldia'){
            setAlcaldiaC(value);
            setCuadranteValues(getSectorValues(value));
            form.setFieldsValue({
                Cuadrante: undefined,
                sector: undefined,
            }) 
        }  
    };

    const handleDepValueChange = value => {
       
        if(depName === 'Rubro'){
            setTurnValues([]);
            setTurnValues(getturnValues(value));
            setSectorEducativoValues([]);
            setSectorEducativoValues(getSectorEducativoValues(value));
            
            if(value === 'Instituciones educativas'){
                setIsHideen(false);
                form.setFieldsValue({
                    turno: undefined,
                    claveCCT: undefined,
                    matricula: 0,
                    sectoreducativo: undefined
                });
            } else{
                setIsHideen(true);
                form.setFieldsValue({
                    turno: undefined,
                    claveCCT: undefined,
                    matricula: undefined,
                    sectoreducativo: undefined
                });
            }  
        }    

        if(depName === 'Colonia'){
            setColoniaC(value);
            
        }
    };

    const handleCuadranteValueChange = value => {
       setCuadrante(value);
       form.setFieldsValue({
        sector: undefined,
    })  
    };

    const openNotification1 = (value) => {
        notification.open({
          message: 'Información',
          description:
            value + ' pertenece a Estrategia 2',
            duration: 8,
        });
    };

    const openNotification2 = (value) => {
        notification.open({
          message: 'Información',
          description:
            value + ' pertenece a Estrategia 2',
            duration: 8,
        });
    };

    const openNotification3 = (value) => {
        notification.open({
          message: 'Información',
          description:
            value + ' necesita revisión manual en el mapa de BA',
            duration: 8,
        });
    };

    useEffect(() => {
        
        let backvalues = func333BA(alcaldiaC, coloniaC);
            if(backvalues[0] === true){
                openNotification1(coloniaC);
            }
            if(backvalues[1] === true){
                openNotification2(coloniaC);
            }
            if(backvalues[2] === true){
                openNotification3(coloniaC);
            }
        // eslint-disable-next-line
     }, [coloniaC]);

    useEffect(() => {
       
            if(value !== 'undefined'){
                form.setFieldsValue({
                    [`${indName}`]: value
                });
                handleIndValueChange(value);
            }
            if(value2 !== 'undefined'){
                form.setFieldsValue({
                    [`${depName}`]: value2
                });
                handleDepValueChange(value2)
            }
           
            if(Cuadrante !== 'undefined'){
                form.setFieldsValue({
                    Cuadrante: Cuadrante
                });
            } 
            if(sector !== 'undefined'){
                form.setFieldsValue({
                    sector: sector
                });
            }
            if(value3 !== 'undefined'){
                form.setFieldsValue({
                    turno: value3
                });
            }
            if(claveCCT !== 'undefined'){
                form.setFieldsValue({
                    claveCCT: claveCCT
                });
            }
            if(matricula !== 'undefined'){
                form.setFieldsValue({
                    matricula: matricula
                });
            } 
            if(sectoreducativo !== 'undefined'){
                form.setFieldsValue({
                    sectoreducativo: sectoreducativo
                });
            }
       
        // eslint-disable-next-line
     }, []);

    function onSearch(val) {
        return val
      }

    
    return (
        
        <>
            <div className="col">
                <Form.Item
                    name={indName}
                    label={indLabel}
                    rules={[
                        {
                            required:  true,
                            message: `${indMessage}`
                        },
                    ]}
                >
                    
                    <Select
                        allowClear
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        notFoundContent={"No hay coincidencias"}                                                                        
                        onChange={handleIndValueChange}
                        onSearch={onSearch}
                        optionFilterProp="children"
                        placeholder={indPlaceholder}                     
                        showSearch
                        size="default"
                    >
                        {indValues.map(indValue => (
                            <Option key={indValue}>{indValue}</Option>
                        ))}

                    </Select>
                </Form.Item>                
            </div>
            <div className="col">
                <Form.Item
                    name={depName}
                    label={depLabel}                    
                    rules={[
                        {
                            required: true,
                            message: `${depMessage}`
                        },
                    ]}
                >
                    <Select 
                        allowClear
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        notFoundContent={"No hay coincidencias"}  
                        onChange={handleDepValueChange}                                                                      
                        onSearch={onSearch}
                        optionFilterProp="children"
                        placeholder={depPlaceholder}                     
                        showSearch
                        size="default"
                    >
                        {depValues.map(depVal => (
                            <Option key={depVal}>{depVal}</Option>
                        ))}
                    </Select>
                </Form.Item>            
            </div>    
            {
                depName === 'Rubro' ?

                    <div className='row custom-collapse-content'>
                        <div className='col'>
                            <Form.Item
                                hidden={isHideen}
                                name="turno"
                                label="Turno"
                                rules={[
                                    {
                                        required: !isHideen,
                                        message: "Turno es requerido",
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
                                    placeholder="Seleccionar turno"
                                    showSearch     
                                    size="default"                                           
                                >                      
                                    {turnValues.map(turnVal => (
                                        <Option key={turnVal}>{turnVal}</Option>
                                    ))}                 
                                </Select>
                            </Form.Item> 
                        </div>
                        <div className='col'>
                            <InputtextRequired 
                                isHideen={isHideen}
                                isrequired={!isHideen}
                                message="CCT es requerido"
                                placeholder="Ingresar clave de centro de trabajo"
                                name="claveCCT"
                                label="CCT"
                                form={form}
                            />
                        </div>
                        <div className='col'>                            
                            <InputNum
                                isHideen={isHideen}
                                isrequired={!isHideen}
                                name="matricula"
                                label="Matrícula"
                                message="Matricula es necesaria"
                                min={0}
                                step={1}
                                form={form}
                                value={0}
                            />
                        </div>
                        <div className='col'>
                            <Form.Item
                                hidden={isHideen}
                                name="sectoreducativo"
                                label="Sector educativo"
                                rules={[
                                    {
                                        required: !isHideen,
                                        message: "Sector educativo es requerido",
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
                                    placeholder="Seleccionar sector"
                                    showSearch     
                                    size="default"                                           
                                >                      
                                    {sectorEducativoValues.map(sectEduVal => (
                                        <Option key={sectEduVal}>{sectEduVal}</Option>
                                    ))}                 
                                </Select>
                            </Form.Item> 
                        </div>
                        </div>                 
                     
                     : ''
                
            }         
            {
                indName === 'Alcaldia' ?
                <>
                <div className="row custom-collapse-content">
                <div className="col">
                    <Form.Item
                    name="Cuadrante"
                    label="Cuadrante"
                    rules={[
                        {
                            required: true,
                            message: "Cuadrante es requerido",
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
                    placeholder="Seleccionar cuadrante"
                    showSearch     
                    size="default"   
                    onChange={handleCuadranteValueChange}                                        
                >                      
                    {cuadranteValues.map(cuadranteVal => (
                                <Option key={cuadranteVal}>{cuadranteVal}</Option>
                            ))}                 
                </Select>
                </Form.Item>
                </div>
                <div className="col">
                    <CheckerSector 
                        form={form}
                        name='sector'
                        message="Sector es requerido"
                        sector={sector}
                        cuadrante={cuadrante}
                    />
                </div>
                <div className="col">
                    <InputNum
                      value={coordx}
                      form={form}
                      message="Coordenada X requerida"
                      name="coordx"
                      label="Coordenada X"
                      step={.0000001 }
                      
                    />
                </div>
                <div className="col">
                    <InputNum
                    style={{ width: '100%' }} 
                      value={coordy}
                      form={form}
                      message="Coordenada Y requerida"
                      name="coordy"
                      label="Coordenada Y"
                      step={.0000001 }
                      
                    />
                </div>
                </div>
                </>
                 : ''
                
            }
        </>
    )
}

