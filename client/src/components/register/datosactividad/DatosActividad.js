import React, {useEffect} from 'react'; 
import { InputNum } from '../../inputs/InputNum';
import CheckInputDep from '../../selectors/CheckInputDep';
import { CheckSelectorDep } from '../../selectors/CheckSelectorDep';
//import CheckStrategy from '../../selectors/CheckStrategy';
import { SelectInd } from '../../selectors/SelectInd';
import { SelectDep } from '../../selectors/TwoSelectsDep';
import { TxtArea } from '../../textareas/TxtArea';


const DatosActividad = (
  { form, 
    user, 
    Tipo='undefined', 
    Actividad='undefined', 
    Rubro='undefined', 
    turno='undefined',
    sectoreducativo='undefined',
    claveCCT='undefined',
    matricula='undefined',
    Subrubro='undefined', 
    grupovulnerable='NO', 
    Solicitudes=0,
    TemasTratados='undefined', 
    Acuerdos='undefined', 
    observaciones='undefined', 
    foliosasociados='NO', 
    userprograma1='NO',
    userprograma2='NO',
    userprograma3='NO',
    estrategia='undefined',
    //publicodirigido='undefined'
  }) => {

    useEffect(() => {
      console.log(Tipo)
    }, [])
    
    return ( 
        <>
            <div className="row custom-collapse-content">
                  {/* <CheckStrategy 
                      form={form}
                      value={userprograma1}
                      name="userprograma1"
                      label="Estrategia 1" 
                  />

                  <CheckStrategy 
                      form={form}
                      value={userprograma2}
                      name="userprograma2"
                      label="Estrategia 2" 
                  /> */}
                  <div className="col-auto" style={{ minWidth: 220 }}>
                    <SelectInd
                      form={form}
                      value={estrategia}
                      direccion={user.direccion}
                      message="Estrategia es requerido"
                      placeholder="Seleccionar estrategia"
                      name="estrategia"
                      label="Estrategia" 
                    />
                  </div>
                  <div className="col">
                    <SelectInd
                      form={form}
                      value={Tipo}
                      direccion={user.direccion}
                      message="Tipo es requerido"
                      placeholder="Seleccionar tipo"
                      name="Tipo"
                      label="Tipo" 
                    />
                  </div>
                    <SelectDep
                      value={Actividad}
                      value2={Rubro}
                      value3={turno}
                      direccion={user.direccion}
                      form={form}
                      indMessage="Actividad es requerida"
                      indPlaceholder="Seleccionar actividad"
                      indName="Actividad"
                      indLabel="Actividad"
                      depMessage="Rubro es requerido"
                      depPlaceholder="Seleccionar rubro"
                      depName="Rubro"
                      depLabel="Rubro" 
                      claveCCT={claveCCT}
                      matricula={matricula}
                      sectoreducativo={sectoreducativo}
                    />
                </div>

                <div className="row custom-collapse-content">
                  <div className="col">
                    <SelectInd
                      form={form}
                      value={Subrubro}
                      direccion={user.direccion}
                      message="Subrubro es requerido"
                      placeholder="Seleccionar subrubro"
                      name="Subrubro"
                      label="Subrubro" 
                    />
                  </div>

                  <CheckSelectorDep
                    form={form}
                    value={grupovulnerable}                                       
                    message="Grupo vulnerable requerido"
                    placeholder="Seleccionar grupo vulnerable"
                    name="grupovulnerable"
                    label="Grupo Vulnerable" 
                  />

                  {/* <div className="col">
                    <SelectInd
                      form={form}
                      value={publicodirigido}
                      direccion={user.direccion}
                      message="Público es requerido"
                      placeholder="Seleccionar público"
                      name="publicodirigido"
                      label="Público objetivo" 
                    />
                  </div> */}
                  <div className="col-md-auto">
                    <InputNum
                      value={Solicitudes}
                      form={form}
                      message="N° requerido"
                      name="Solicitudes"
                      label="N° solicitudes"
                      min={0}
                      step={1}
                      
                    />

                  </div>
                </div>

                <div className="row custom-collapse-content">
                  
                  <div className="col" style={{ minWidth: 250 }}>
                    <TxtArea                      
                      value={TemasTratados}
                      form={form}
                      placeholder="Escriba brevemente los temas tratados"
                      message="Los temas son requeridos"
                      name="TemasTratados"
                      label="Temas Tratados"
                      maxl={1960}
                    />
                  </div>
                  <div className="col" style={{ minWidth: 250 }}>
                    <TxtArea
                      value={Acuerdos}
                      form={form}
                      placeholder="Escriba brevemente si hubo o no acuerdos"
                      message="Los acuerdos son requeridos"
                      name="Acuerdos"
                      label="Acuerdos"
                      maxl={1960}
                      
                    />
                  </div>
                  <div className="col" style={{ minWidth: 250 }}>
                    <TxtArea
                      value={observaciones}
                      form={form}
                      placeholder="Escriba observaciones de la actividad"
                      message="Las observaciones son requeridas"
                      name="observaciones"
                      label="Observaciones"
                      maxl={1960}
                    />
                  </div>

                </div>

                <div className="row  custom-collapse-content" >                        
                  <div className="col">
                  </div>
                  <CheckInputDep
                    form={form}
                    value={foliosasociados}
                    direccion={user.direccion}
                    labelCheckBox=""
                    message="Folios asociados requerido"
                    placeholder="Escribir folios asociados"
                    name="foliosasociados"
                    label="Folios asociados" 
                    labelcheckbox=""
                    title="Folios asociados"
                  />   
                  <div className="col">
                    
                  </div>
                </div>
               
        </>
    )
}

export default DatosActividad
