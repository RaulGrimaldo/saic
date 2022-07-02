import React, { useEffect } from 'react';
import { Form,  Input, AutoComplete} from 'antd';
import { SelectDep } from '../../selectors/TwoSelectsDep';

const options = [
    { value: 'N°' },
    { value: 'S/N' },
    { value: 'N° Ext: N° Int:' },
    { value: 'Mz: Lt:' },
    
];
const InformacionLugar = (
    {   institucion='undefined', 
        Calle='undefined', 
        Numero='undefined',
        Alcaldia='undefined',
        Colonia='undefined',
        Cuadrante='undefined',
        sector='undefined',
        coordx=19.0000001, 
        coordy=-99.0000001, 
        form, user}) => {

    useEffect(() => {
        console.log(institucion, Alcaldia)
        if(institucion !== 'undefined'){
            form.setFieldsValue({
                "institucion": institucion
            });
        }
        if(Calle !== 'undefined'){
            form.setFieldsValue({
                "Calle": Calle
            });
        }
        if(Numero !== 'undefined'){
            form.setFieldsValue({
                "Numero": Numero
            });
        }
    // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="row custom-collapse-content">

                <div className="col">
                    <Form.Item                    
                        name="institucion"
                        label="Nombre"                    
                        rules={[
                            {
                                required:  true,
                                message: "Campo requerido"
                            },
                        ]}
                    >
                        <Input 
                            value={institucion}
                            size="default" 
                            placeholder="Ingrese el nombre (Lugar/Institución)" 
                        />                    
                    </Form.Item>
                </div>
                
                <div className="col">
                    <Form.Item
                            name="Calle"
                            label="Calle"                    
                            rules={[
                                {
                                    required:  true,
                                    message: "Campo requerido"
                                },
                            ]}
                        >
                        <Input 
                            value={Calle}
                            size="default" 
                            placeholder="Ingrese e, Av., Cerrada..." 
                        />                    
                    </Form.Item>
                </div>
                <div className="col-md-auto" style={{ minWidth: 200 }}>
                    <Form.Item
                            name="Numero"
                            label="N° / MZ: LT:"                   
                            rules={[
                                {
                                    required:  true,
                                    message: "Campo requerido"
                                },
                            ]}
                        >
                        <AutoComplete
                            value={Numero}
                            options={options}
                            placeholder="S/N"
                            filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        /> 
                                        
                    </Form.Item>
                </div>
            </div>
            <div className="row custom-collapse-content">
                {/* Las coordenadas X y Y tienen minusculas porque no acepta la variable en mayus */}
                <SelectDep 
                    value={Alcaldia}
                    value2={Colonia}
                    Cuadrante={Cuadrante}
                    sector={sector}
                    coordx={coordx}
                    coordy={coordy}
                    direccion={user.direccion}
                    form={form}
                    indMessage="Alcaldía es requerida"
                    indPlaceholder="Seleccionar alcaldía"
                    indName="Alcaldia"
                    indLabel="Alcaldía"
                    depMessage="Colonia es requerida"
                    depPlaceholder="Seleccionar colonia"
                    depName="Colonia"
                    depLabel="Colonia"
                /> 
            </div>
        </>
    )
}

export default InformacionLugar;
