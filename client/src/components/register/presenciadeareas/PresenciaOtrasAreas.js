import React from 'react';
import CheckInputDep from '../../selectors/CheckInputDep';
import { CheckSelectorDepMultiple } from '../../selectors/CheckSelectorDepMultiple'

const PresenciaOtrasAreas = (
  { form, user,
    actividaddgpd="NO", actividadcdhcdmx="NO", actividadccsjcdmx="NO",
        actividadsdicp="NO", actividadsopaft="NO", actividaducs="NO",
        actividaddgicot="NO", actividaddgcse="NO", actividadddsi="NO",
        actividadsct="NO", actividaddsb="NO", actividadddh="NO", 
        actividadcvm="NO", actividadbva="NO", actividaderum="NO",
        actividaddse="NO", actividadmultiplicadores="NO", actividadalcoholimetro="NO",
        actividadusec="NO", otrasareas="NO",    
  }) => {
    return (
        <>
            <div className="row g-4 custom-collapse-content" >
              
              <CheckSelectorDepMultiple
                form={form}
                value={actividadusec}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadusec"
                label="Unidad de Seguridad Empresarial y Ciudadana" 
                labelcheckbox=""
                title="Unidad de Seguridad Empresarial y Ciudadana"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividadmultiplicadores}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadmultiplicadores"
                label="Multiplicadores Ciudadanos" 
                labelcheckbox=""
                title="Multiplicadores Ciudadanos"
              />

            </div>
            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividaddse}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividaddse"
                label="Dirección de Seguridad Escolar" 
                labelcheckbox=""
                title="Dirección de Seguridad Escolar"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividaderum}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividaderum"
                label="Dirección General del Escuadrón de Rescate y Urgencias Médicas" 
                labelcheckbox=""
                title="Dirección General del Escuadrón de Rescate y Urgencias Médicas"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividadalcoholimetro}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadalcoholimetro"
                label="Conduce Sin Alcohol (Alcoholímetro)" 
                labelcheckbox=""
                title="Conduce Sin Alcohol (Alcoholímetro)"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividadbva}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadbva"
                label="Brigada de Vigilancia Animal" 
                labelcheckbox=""
                title="Brigada de Vigilancia Animal"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividadcvm}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadcvm"
                label="Conciencia Vial en Movimiento" 
                labelcheckbox=""
                title="Conciencia Vial en Movimiento"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividadddh}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadddh"
                label="Dirección General de Derechos Humanos" 
                labelcheckbox=""
                title="Dirección General de Derechos Humanos"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividaddsb}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividaddsb"
                label="Dirección Ejecutiva de Salud y Bienestar Social" 
                labelcheckbox=""
                title="Dirección Ejecutiva de Salud y Bienestar Social"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividadsct}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadsct"
                label="Subsecretaria de Control de Tránsito" 
                labelcheckbox=""
                title="Subsecretaria de Control de Tránsito"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividadddsi}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadddsi"
                label="Dirección de Desarrollo de Sistemas Informáticos" 
                labelcheckbox=""
                title="Dirección de Desarrollo de Sistemas Informáticos"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividaddgcse}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividaddgcse"
                label="Dirección General en Caso de Secuestro y Extorsión" 
                labelcheckbox=""
                title="Dirección General en Caso de Secuestro y Extorsión"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividaddgicot}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividaddgicot"
                label="Dirección General de Análisis e Inteligencia Policial" 
                labelcheckbox=""
                title="Dirección General de Análisis e Inteligencia Policial"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividaducs}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividaducs"
                label="Dirección de la Unidad de Contacto del Secretario" 
                labelcheckbox=""
                title="Dirección de la Unidad de Contacto del Secretario"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividadsopaft}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadsopaft"
                label="Subsecretaría de Operación Policial Agrupamiento Fuerza de Tarea" 
                labelcheckbox=""
                title="Subsecretaría de Operación Policial Agrupamiento Fuerza de Tarea"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividadsdicp}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadsdicp"
                label="Subsecretaría de Desarrollo Institucional" 
                labelcheckbox=""
                title="Subsecretaría de Desarrollo Institucional"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              <CheckSelectorDepMultiple
                form={form}
                value={actividadccsjcdmx}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadccsjcdmx"
                label="Consejo Ciudadano de Seguridad y Justicia de la Ciudad de México" 
                labelcheckbox=""
                title="Consejo Ciudadano de Seguridad y Justicia de la Ciudad de México"
              />
              <CheckSelectorDepMultiple
                form={form}
                value={actividadcdhcdmx}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Seleccionar tema"
                name="actividadcdhcdmx"
                label="Comisión de Derechos Humanos de la Ciudad de México" 
                labelcheckbox=""
                title="Comisión de Derechos Humanos de la Ciudad de México"
              />

            </div>

            <div className="row g-4 custom-collapse-content" >
          
              

              <CheckInputDep 
                form={form}
                value={actividaddgpd}
                direccion={user.direccion}
                labelCheckBox=""
                message="Tema requerido"
                placeholder="Escribir tema"
                name="actividaddgpd"
                label="Dirección General de Prevención del Delito" 
                labelcheckbox=""
                title="Dirección General de Prevención del Delito"
              />

              <CheckInputDep 
                form={form}
                value={otrasareas}
                direccion={user.direccion}
                labelCheckBox=""
                message="Área y tema requerido"
                placeholder="Escribir nombre de área y tema"
                name="otrasareas"
                label="Otra(s) Área(s) (SSC)" 
                labelcheckbox=""
                title="Otra(s) Área(s) (SSC)"
              />

            </div>

        </>
    )
}

export default PresenciaOtrasAreas
