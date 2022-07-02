



module.exports = {
    fechaHora: function () {
        let month = (new Date().getMonth() + 1).toString();
        let day = (new Date().getDate()).toString();
        let year = (new Date().getFullYear()).toString();
        if (month.length == 1) {
            month = '0' + month;
        }
        if (day.length == 1) {
            day = '0' + day;
        }
        let today = day + "/" + month + "/" + year;


        const hourNow = (new Date().toLocaleTimeString());



        return [today, hourNow];
    },

    quincenaNumActual: function() {  
        let month = (new Date().getMonth() + 1).toString();
        let day = (new Date().getDate()).toString();
        let year = (new Date().getFullYear()).toString();
    
        if(month.length == 1){
          month = '0' + month;
        }
        if(day.length == 1){
          day = '0' + day;
        }
        if(month.length == 1){
          month = '0' + month;
        }
        if(day.length == 1){
          day = '0' + day;
        }  
        var QuincenaNum;  
        var Quincena = "";
        var NombreMes = "";
    
        switch (Number(month)) {
          case 01:
            NombreMes = "Enero";
            QuincenaNum = 2;
          break;
          case 02:
            NombreMes = "Febrero";
            QuincenaNum = 4;
          break;
          case 03:
            NombreMes = "Marzo";
            QuincenaNum = 6;
          break;
          case 04:
            NombreMes = "Abril";
            QuincenaNum = 8;
          break;
          case 05:
            NombreMes = "Mayo";
            QuincenaNum = 10;
          break;
          case 06:
            NombreMes = "Junio";
            QuincenaNum = 12;
          break;
          case 07:
            NombreMes = "Julio";
            QuincenaNum = 14;
          break;
          case 08:
            NombreMes = "Agosto";
            QuincenaNum = 16;
          break;
          case 09:
            NombreMes = "Septiembre";
            QuincenaNum = 18;
          break;
          case 10:
            NombreMes = "Octubre";
            QuincenaNum = 20;
          break;
          case 11:
            NombreMes = "Noviembre";
            QuincenaNum = 22;
          break;
          case 12:
            NombreMes = "Diciembre";
            QuincenaNum = 24;
          break;
          default:
            NombreMes = "Error en Mes";
            QuincenaNum = 0;
            break;
        }
              
        //Quincenas Enero
        if(day <= 15 ){
          Quincena = "1ra Quincena " + NombreMes;
          QuincenaNum = Number(QuincenaNum) - 1;
        } else{
          Quincena = "2da Quincena " + NombreMes;
        }
      return [ Number(QuincenaNum), Number(year), Number(day), Quincena, NombreMes, month];
    },

    obtenerQuincenaConFecha: function(fecha) {  
        const fechaSplited = fecha.split("/"); 
    
        let day = fechaSplited[0];
        let month = fechaSplited[1];
        let year = fechaSplited[2];
  
        let QuincenaNum;  
        let NombreMes;
        let Quincena = "";

        switch (month.toString()) {
        case "01":
            NombreMes = "Enero";
            QuincenaNum = 2;
        break;
        case "02":
            NombreMes = "Febrero";
            QuincenaNum = 4;
        break;
        case "03":
            NombreMes = "Marzo";
            QuincenaNum = 6;
        break;
        case "04":
            NombreMes = "Abril";
            QuincenaNum = 8;
        break;
        case "05":
            NombreMes = "Mayo";
            QuincenaNum = 10;
        break;
        case "06":
            NombreMes = "Junio";
            QuincenaNum = 12;
        break;
        case "07":
            NombreMes = "Julio";
            QuincenaNum = 14;
        break;
        case "08":
            NombreMes = "Agosto";
            QuincenaNum = 16;
        break;
        case "09":
            NombreMes = "Septiembre";
            QuincenaNum = 18;
        break;
        case "10":
            NombreMes = "Octubre";
            QuincenaNum = 20;
        break;
        case "11":
            NombreMes = "Noviembre";
            QuincenaNum = 22;
        break;
        case "12":
            NombreMes = "Diciembre";
            QuincenaNum = 24;
        break;
        default:
            NombreMes = "Error en Mes";
            QuincenaNum = 0;
            break;
        }

            
        if(day <= 15 ){
            Quincena = "1ra Quincena " + NombreMes;
            QuincenaNum = Number(QuincenaNum) - 1;
        } else {
            Quincena = "2da Quincena " + NombreMes;
        }

        return [Number(QuincenaNum), Number(year), Number(day), Quincena, NombreMes, month];
    },

};
