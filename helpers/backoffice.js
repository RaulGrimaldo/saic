

module.exports = {
  funcBaseURL: function (rol) {
    switch (rol) {
      case "Operativo":
        return 'user';
      case "Capturista":
        return 'user';
      case "JUD":
        return 'jud';
      case "Subdirección":
        return 'sub';
      case "Dirección":
        return 'dir';
      case "Admin":
        return 'admin';
      case "Area":
        return 'area';
      default:
        return null;
    }
  },
  funcNivel: function (rol) {
    switch (rol) {
      case "Operativo":
        return 5;
      case "Capturista":
        return 4;
      case "JUD":
        return 3;
      case "Subdirección":
        return 2;
      case "Dirección":
        return 1;
      case "Admin":
        return 0;
      case "Area":
        return 6;
      default:
        return null;
    }
  },
  funcSubDir: function (jud) {
    switch (jud) {
      case "JCP":
        return ["SMP", "DCP"];
      case "SMP":
          return ["SMP", "DCP"];
      case "JPCA":
        return ["SCI", "DCIyT"];
      case "JPCC":
        return ["JPCC", "DCIyT"];
      case "SCI":
        return ["SCI", "DCIyT"];
      case "SCT":
        return ["SCT", "DCIyT"];
      case "JPT":
        return ["SCT", "DCIyT"];
      case "JPV":
        return ["SCT", "DCIyT"];1;
      case "AOB":
        return ["AOB", "DCIyT"];;
      case "JVOS":
        return ["SVO", "DVC"];
      case "JVOE":
        return ["SVO", "DVC"];
      case "SVO":
        return ["SVO", "DVC"];
      case "JVIEMS":
        return ["SVSE", "DVC"];
      case "JVIEB":
        return ["SVSE", "DVC"];
      case "SVSE":
        return ["SVSE", "DVC"];
      case "DVC":
        return ["DVC", "DVC"];
      case "DCIyT":
        return ["DCIyT", "DCIyT"];
      case "DCIyT":
        return ["DCIyT", "DCIyT"];
      default:
        return ["DGF", "DGF"];
    }
  },

  camai: function (Rubro) {

    let catalogogeneral;
    switch (Rubro.toString()) {
      case "Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales":
        catalogogeneral = "Acciones de vinculación con la ciudadanía en general";
        break;
      case "Organizaciones empresariales":
        catalogogeneral = "Acciones de colaboración y vinculación con actores estratégicos";
        break;
      case "Organizaciones sociales":
        catalogogeneral = "Acciones de colaboración y vinculación con actores estratégicos";
        break;
      case "Instituciones educativas":
        catalogogeneral = "Acciones de colaboración y vinculación con actores estratégicos";
        break;
      case "Poder Legislativo":
        catalogogeneral = "Acciones de colaboración y vinculación con actores estratégicos";
        break;
      case "Consejo Ciudadano de Seguridad  y de Justicia de la CDMX":
        catalogogeneral = "Acciones de colaboración y vinculación con actores estratégicos";
        break;
      case "Coordinación institucional":
        catalogogeneral = "Acciones de vinculación y coordinación institucional con los tres órdenes de gobierno";
        break;
      case "Alcaldías":
        catalogogeneral = "Acciones de vinculación y coordinación institucional con los tres órdenes de gobierno";
        break;
      case "Ferias y Jornadas de seguridad comunitaria":
        catalogogeneral = "Acciones masivas de vinculación para fomentar la proximidad entre los cuerpos policiales y la ciudadanía";
        break;
      case "Ferias y Jornadas de seguridad escolar":
        catalogogeneral = "Acciones masivas de vinculación para fomentar la proximidad entre los cuerpos policiales y la ciudadanía";
        break;
      default:
        catalogogeneral = "N/A";
        break;
    }
    return catalogogeneral;
  },

  excluirfunc: function (Tipo) {

    let excluir;
    switch (Tipo.toString()) {
      case "Informativa 333 Remota":
        excluir = true;
        break;
      case "Informativa 333 Presencial":
        excluir = true;
        break;
      case "Informativa Ordinaria remota":
        excluir = true;
        break;
      case "Informativa Ordinaria presencial":
        excluir = true;
        break;
      case "Informativa Ferias y Jornadas ordinarias Estrategia 2":
        excluir = true;
        break;
      default:
        excluir = false;
        break;
    }
    return excluir;
  },

  etapa: function (Actividad) {

    let Etapa;
    switch (Actividad.toString()) {
      case "Difusión":
        Etapa = 1;
        break;
      case "Recorrido":
        Etapa = 3;
        break;
      case "Reunión":
        Etapa = 2;
        break;
      case "Plática":
        Etapa = 3;
        break;
      case "Actividades Lúdicas":
        Etapa = 3;
        break;
      case "Feria de Seguridad":
        Etapa = 3;
        break;
      case "Jornada de seguridad":
        Etapa = 3;
        break;
      case "Jornada de Participación":
        Etapa = 3;
        break;
      case "Sociodrama":
        Etapa = 3;
        break;
      case "Taller":
        Etapa = 3;
        break;
      case "Tequio":
        Etapa = 3;
        break;
      case "Instalación de app":
        Etapa = 3;
        break;
      case "Seguimiento":
        Etapa = 4;
        break;
      default:
        Etapa = 1;
        break;
    }
    return Etapa;
  },

  unidadMedida: function (Actividad) {

    let UnidadMedida;
    switch (Actividad.toString()) {
      case "Actividades Lúdicas":
        UnidadMedida = "Actividad Cultural";
        break;
      case "Difusión":
        UnidadMedida = "Difusión";
        break;
      case "Feria de Seguridad":
        UnidadMedida = "Ferias";
        break;
      case "Instalación de app":
        UnidadMedida = "Instalaciones";
        break;
      case "Jornada de Participación":
        UnidadMedida = "Jornada";
        break;
      case "Jornada de seguridad":
        UnidadMedida = "Jornada";
        break;
      case "Plática":
        UnidadMedida = "Plática";
        break;
      case "Recorrido":
        UnidadMedida = "Revisión o inspección";
        break;
      case "Reunión":
        UnidadMedida = "Reunión";
        break;
      case "Seguimiento":
        UnidadMedida = "Seguimiento";
        break;
      case "Simulacro":
        UnidadMedida = "Sensibilización";
        break;
      case "Sociodrama":
        UnidadMedida = "Sensibilización";
        break;
      case "Taller":
        UnidadMedida = "Taller";
        break;
      case "Tequio":
        UnidadMedida = "Seguimiento";
        break;
      default:
        UnidadMedida = "Gestiones";
        break;
    }
    return UnidadMedida;
  },

  descclasividad: function (Actividad ) {

    let observacionesActividad;
    console.log(Actividad)
    switch (Actividad.toString()) {
      case "Actividades Lúdicas":
        observacionesActividad = "Actividades Lúdicas";
        break;
      case "Difusión":
        observacionesActividad = "Difusión Oferta Institucional";
        break;
      case "Feria de Seguridad":
        observacionesActividad = "Feria de seguridad";
        break;
      case "Instalación de app":
        observacionesActividad = "Instalaciones";
        break;
      case "Jornada de seguridad":
        observacionesActividad = "Jornada de seguridad";
        break;
      case "Plática":
        observacionesActividad = "Plática de prevención con el tema";
        break;
      case "Recorrido":
        observacionesActividad = "Revisión o inspección";
        break;
      case "Reunión":
        observacionesActividad = "Reunión de trabajo con: COPACO/vecinos/otras instancias";
        break;
      case "Mesa de trabajo":
        observacionesActividad = "Reunión de trabajo con: COPACO/vecinos/otras instancias";
        break;
      case "Seguimiento":
        observacionesActividad = "Reunión de trabajo con: COPACO/vecinos/otras instancias";
        break;
      case "Simulacro":
        observacionesActividad = "Sensibilización";
        break;
      case "Sociodrama":
        observacionesActividad = "Sociodrama de prevención con el tema";
        break;
      case "Taller":
        observacionesActividad = "Taller con el tema";
        break;
      case "Tequio":
        observacionesActividad = "Seguimiento";
        break;
      default:
        observacionesActividad = "";
        break;
    }
    return observacionesActividad;
  },

  nomclasividad: function (Actividad ) {

    let NombreActividad;

    switch (Actividad.toString()) {
      case "Actividades Lúdicas":
        NombreActividad = "Actividades Lúdicas";
        break;
      case "Difusión":
        NombreActividad = "Entrega de catálogo";
        break;
      case "Feria de Seguridad":
        NombreActividad = "Feria de Seguridad";
        break;
      case "Instalación de app":
        NombreActividad = "Instalaciones";
        break;
      case "Jornada de seguridad":
        NombreActividad = "Jornada de Seguridad";
        break;
      case "Plática":
        NombreActividad = "Plática de prevención con el tema";
        break;
      case "Recorrido":
        NombreActividad = "Revisión o inspección";
        break;
      case "Reunión":
        NombreActividad = "Vinculación ciudadana";
        break;
      case "Mesa de trabajo":
        NombreActividad = "Vinculación ciudadana";
        break;
      case "Seguimiento":
        NombreActividad = "Informe de acciones";
        break;
      case "Simulacro":
        NombreActividad = "Sensibilización";
        break;
      case "Sociodrama":
        NombreActividad = "Sociodrama de prevención con el tema";
        break;
      case "Taller":
        NombreActividad = "Taller con el tema";
        break;
      case "Tequio":
        NombreActividad = "Seguimiento";
        break;
      default:
        NombreActividad = "";
        break;
    }
    return NombreActividad;
  },
};
