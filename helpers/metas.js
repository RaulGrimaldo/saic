module.exports = {
  
    metasDIR1: function (month) {
      //Aquí se ponen todas las metas
      var Metas = [
        "01|Organizaciones empresariales|176",
        "01|Organizaciones sociales|109",
        "01|Instituciones educativas|211", 
        "01|Ferias y Jornadas de seguridad escolar|0",
        "01|Ferias y Jornadas de seguridad comunitaria|0",
  
        "02|Organizaciones empresariales|0", 
        "02|Organizaciones sociales|41",
        "02|Instituciones educativas|1", 
        "02|Ferias y Jornadas de seguridad escolar|1",
        "02|Ferias y Jornadas de seguridad comunitaria|0",
  
        "03|Organizaciones empresariales|44", 
        "03|Organizaciones sociales|43",
        "03|Instituciones educativas|50", 
        "03|Ferias y Jornadas de seguridad escolar|2",
        "03|Ferias y Jornadas de seguridad comunitaria|2",
  
        "04|Organizaciones empresariales|81", 
        "04|Organizaciones sociales|87",
        "04|Instituciones educativas|120", 
        "04|Ferias y Jornadas de seguridad escolar|0",
        "04|Ferias y Jornadas de seguridad comunitaria|0",
  
        "05|Organizaciones empresariales|85", 
        "05|Organizaciones sociales|85",
        "05|Instituciones educativas|114", 
        "05|Ferias y Jornadas de seguridad escolar|0",
        "05|Ferias y Jornadas de seguridad comunitaria|0",
  
        "06|Organizaciones empresariales|88",
        "06|Organizaciones sociales|95",
        "06|Instituciones educativas|112", 
        "06|Ferias y Jornadas de seguridad escolar|0",
        "06|Ferias y Jornadas de seguridad comunitaria|0",
  
        "07|Organizaciones empresariales|90", 
        "07|Organizaciones sociales|95",
        "07|Instituciones educativas|0", 
        "07|Ferias y Jornadas de seguridad escolar|0",
        "07|Ferias y Jornadas de seguridad comunitaria|2",
  
        "08|Organizaciones empresariales|90", 
        "08|Organizaciones sociales|95",
        "08|Instituciones educativas|120", 
        "08|Ferias y Jornadas de seguridad escolar|3",
        "08|Ferias y Jornadas de seguridad comunitaria|2",
  
        "09|Organizaciones empresariales|90", 
        "09|Organizaciones sociales|95",
        "09|Instituciones educativas|120", 
        "09|Ferias y Jornadas de seguridad escolar|2",
        "09|Ferias y Jornadas de seguridad comunitaria|2",
  
        "10|Organizaciones empresariales|92", 
        "10|Organizaciones sociales|92",
        "10|Instituciones educativas|120", 
        "10|Ferias y Jornadas de seguridad escolar|2",
        "10|Ferias y Jornadas de seguridad comunitaria|2",
  
        "11|Organizaciones empresariales|90", 
        "11|Organizaciones sociales|90",
        "11|Instituciones educativas|100", 
        "11|Ferias y Jornadas de seguridad escolar|2",
        "11|Ferias y Jornadas de seguridad comunitaria|2",
  
        "12|Organizaciones empresariales|90", 
        "12|Organizaciones sociales|90",
        "12|Instituciones educativas|82", 
        "12|Ferias y Jornadas de seguridad escolar|0",
        "12|Ferias y Jornadas de seguridad comunitaria|0",];
      var metasMes = [];
      for (option = 0; option < Metas.length; option++) {
        var splited = Metas[option].split("|")
        if (splited[0] == month) {
          metasMes.push(splited[1] + "|" + splited[2]);
        }
      };
      return metasMes;
    },
  
    metasDIR2: function (month) {
      //Aquí se ponen todas las metas
      var Metas = [
        "01|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|199",
        "01|Poder Legislativo|0",
        "01|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|2",
        "01|Coordinación institucional|239",
        "01|Alcaldías|54",
        "01|Ferias y Jornadas de seguridad comunitaria|0",
  
        "02|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|206",
        "02|Poder Legislativo|4",
        "02|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|2",
        "02|Coordinación institucional|224",
        "02|Alcaldías|62",
        "02|Ferias y Jornadas de seguridad comunitaria|0",
  
        "03|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|44",
        "03|Poder Legislativo|7",
        "03|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "03|Coordinación institucional|100",
        "03|Alcaldías|62",
        "03|Ferias y Jornadas de seguridad comunitaria|2",
  
        "04|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|174",
        "04|Poder Legislativo|0",
        "04|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "04|Coordinación institucional|100",
        "04|Alcaldías|62",
        "04|Ferias y Jornadas de seguridad comunitaria|0",
  
        "05|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|200",
        "05|Poder Legislativo|0",
        "05|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "05|Coordinación institucional|110",
        "05|Alcaldías|60",
        "05|Ferias y Jornadas de seguridad comunitaria|0",
  
        "06|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|200",
        "06|Poder Legislativo|0",
        "06|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "06|Coordinación institucional|110",
        "06|Alcaldías|60",
        "06|Ferias y Jornadas de seguridad comunitaria|0",
  
        "07|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|205",
        "07|Poder Legislativo|5",
        "07|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "07|Coordinación institucional|110",
        "07|Alcaldías|65",
        "07|Ferias y Jornadas de seguridad comunitaria|2",
  
        "08|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|205",
        "08|Poder Legislativo|5",
        "08|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "08|Coordinación institucional|110",
        "08|Alcaldías|65",
        "08|Ferias y Jornadas de seguridad comunitaria|2",
  
        "09|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|205",
        "09|Poder Legislativo|6",
        "09|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "09|Coordinación institucional|110",
        "09|Alcaldías|65",
        "09|Ferias y Jornadas de seguridad comunitaria|2",
  
        "10|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|227",
        "10|Poder Legislativo|5",
        "10|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "10|Coordinación institucional|110",
        "10|Alcaldías|65",
        "10|Ferias y Jornadas de seguridad comunitaria|2",
  
        "11|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|225",
        "11|Poder Legislativo|5",
        "11|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|0",
        "11|Coordinación institucional|100",
        "11|Alcaldías|65",
        "11|Ferias y Jornadas de seguridad comunitaria|2",
  
        "12|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|185",
        "12|Poder Legislativo|3",
        "12|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|0",
        "12|Coordinación institucional|77",
        "12|Alcaldías|42",
        "12|Ferias y Jornadas de seguridad comunitaria|0",
      ];
      var metasMes = [];
      for (option = 0; option < Metas.length; option++) {
        var splited = Metas[option].split("|")
        if (splited[0] == month) {
          metasMes.push(splited[1] + "|" + splited[2]);
        }
      };
      return metasMes;
    },
  
    metas: function (month) {
      //Aquí se ponen todas las metas
      var Metas = [
        "01|Organizaciones empresariales|176",
        "01|Organizaciones sociales|109",
        "01|Instituciones educativas|211",
        "01|Ferias y Jornadas de seguridad escolar|0",
        "01|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|199",
        "01|Poder Legislativo|0",
        "01|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|2",
        "01|Coordinación institucional|239",
        "01|Alcaldías|54",
        "01|Ferias y Jornadas de seguridad comunitaria|0",
  
  
        "02|Organizaciones empresariales|0",
        "02|Organizaciones sociales|41",
        "02|Instituciones educativas|1",
        "02|Ferias y Jornadas de seguridad escolar|1",
        "02|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|206",
        "02|Poder Legislativo|4",
        "02|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|2",
        "02|Coordinación institucional|224",
        "02|Alcaldías|62",
        "02|Ferias y Jornadas de seguridad comunitaria|0",
  
        "03|Organizaciones empresariales|44",
        "03|Organizaciones sociales|43",
        "03|Instituciones educativas|50",
        "03|Ferias y Jornadas de seguridad escolar|2",
        "03|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|44",
        "03|Poder Legislativo|7",
        "03|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "03|Coordinación institucional|100",
        "03|Alcaldías|62",
        "03|Ferias y Jornadas de seguridad comunitaria|2",
  
        "04|Organizaciones empresariales|85",
        "04|Organizaciones sociales|90",
        "04|Instituciones educativas|120",
        "04|Ferias y Jornadas de seguridad escolar|0",
        "04|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|174",
        "04|Poder Legislativo|0",
        "04|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "04|Coordinación institucional|100",
        "04|Alcaldías|62",
        "04|Ferias y Jornadas de seguridad comunitaria|0",
  
        "05|Organizaciones empresariales|85",
        "05|Organizaciones sociales|85",
        "05|Instituciones educativas|114",
        "05|Ferias y Jornadas de seguridad escolar|0",
        "05|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|200",
        "05|Poder Legislativo|0",
        "05|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "05|Coordinación institucional|110",
        "05|Alcaldías|60",
        "05|Ferias y Jornadas de seguridad comunitaria|0",
  
        "06|Organizaciones empresariales|88",
        "06|Organizaciones sociales|95",
        "06|Instituciones educativas|112",
        "06|Ferias y Jornadas de seguridad escolar|0",
        "06|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|200",
        "06|Poder Legislativo|0",
        "06|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "06|Coordinación institucional|110",
        "06|Alcaldías|60",
        "06|Ferias y Jornadas de seguridad comunitaria|0",
  
        "07|Organizaciones empresariales|90",
        "07|Organizaciones sociales|95",
        "07|Instituciones educativas|0",
        "07|Ferias y Jornadas de seguridad escolar|0",
        "07|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|205",
        "07|Poder Legislativo|5",
        "07|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "07|Coordinación institucional|110",
        "07|Alcaldías|65",
        "07|Ferias y Jornadas de seguridad comunitaria|2",
  
        "08|Organizaciones empresariales|90",
        "08|Organizaciones sociales|95",
        "08|Instituciones educativas|120",
        "08|Ferias y Jornadas de seguridad escolar|3",
        "08|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|205",
        "08|Poder Legislativo|5",
        "08|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "08|Coordinación institucional|110",
        "08|Alcaldías|65",
        "08|Ferias y Jornadas de seguridad comunitaria|2",
  
        "09|Organizaciones empresariales|90",
        "09|Organizaciones sociales|95",
        "09|Instituciones educativas|120",
        "09|Ferias y Jornadas de seguridad escolar|2",
        "09|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|205",
        "09|Poder Legislativo|6",
        "09|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "09|Coordinación institucional|110",
        "09|Alcaldías|65",
        "09|Ferias y Jornadas de seguridad comunitaria|2",
  
        "10|Organizaciones empresariales|92",
        "10|Organizaciones sociales|92",
        "10|Instituciones educativas|120",
        "10|Ferias y Jornadas de seguridad escolar|2",
        "10|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|227",
        "10|Poder Legislativo|5",
        "10|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|1",
        "10|Coordinación institucional|110",
        "10|Alcaldías|65",
        "10|Ferias y Jornadas de seguridad comunitaria|2",
  
        "11|Organizaciones empresariales|90",
        "11|Organizaciones sociales|90",
        "11|Instituciones educativas|100",
        "11|Ferias y Jornadas de seguridad escolar|2",
        "11|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|225",
        "11|Poder Legislativo|5",
        "11|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|0",
        "11|Coordinación institucional|100",
        "11|Alcaldías|65",
        "11|Ferias y Jornadas de seguridad comunitaria|2",
  
        "12|Organizaciones empresariales|90",
        "12|Organizaciones sociales|90",
        "12|Instituciones educativas|82",
        "12|Ferias y Jornadas de seguridad escolar|0",
        "12|Órganos de representación ciudadana, asociaciones vecinales y grupos vecinales|185",
        "12|Poder Legislativo|3",
        "12|Consejo Ciudadano de Seguridad  y de Justicia de la CDMX|0",
        "12|Coordinación institucional|77",
        "12|Alcaldías|42",
        "12|Ferias y Jornadas de seguridad comunitaria|0",
      ];
      let metasMes = [];
      for (option = 0; option < Metas.length; option++) {
        let splited = Metas[option].split("|")
        if (Number(splited[0]) === Number(month)) {
          metasMes.push(splited[1] + "|" + splited[2]);
        }
      };
      return metasMes;
    },

  };