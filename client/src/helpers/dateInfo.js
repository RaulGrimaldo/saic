
import moment from 'moment';

export function quincenaActualNum(){  
    const dateFormat = 'DD/MM/YYYY';
    const today = moment().format(dateFormat);
    const todaySplited = today.split("/");
    
    let day = todaySplited[0];
    let month = todaySplited[1];
    let year = todaySplited[2];

   
    let QuincenaNum;  

    switch (month.toString()) {
      case "01":
        QuincenaNum = 2;
      break;
      case "02":
        QuincenaNum = 4;
      break;
      case "03":
        QuincenaNum = 6;
      break;
      case "04":
        QuincenaNum = 8;
      break;
      case "05":
        QuincenaNum = 10;
      break;
      case "06":
        QuincenaNum = 12;
      break;
      case "07":
        QuincenaNum = 14;
      break;
      case "08":
        QuincenaNum = 16;
      break;
      case "09":
        QuincenaNum = 18;
      break;
      case "10":
        QuincenaNum = 20;
      break;
      case "11":
        QuincenaNum = 22;
      break;
      case "12":
        QuincenaNum = 24;
      break;
      default:
        QuincenaNum = 0;
        break;
    }
          
    if(Number(day) <= 15 ){
      QuincenaNum = Number(QuincenaNum) - 1;
    } 

    return [Number(QuincenaNum), Number(year)];
  
}

export function quincena(fecha){

    const fechaSplited = fecha.split("/"); 
    
    let day = fechaSplited[0];
    let month = fechaSplited[1];
    let year = fechaSplited[2]
  
    let QuincenaNum;  

    switch (month.toString()) {
      case "01":
        QuincenaNum = 2;
      break;
      case "02":
        QuincenaNum = 4;
      break;
      case "03":
        QuincenaNum = 6;
      break;
      case "04":
        QuincenaNum = 8;
      break;
      case "05":
        QuincenaNum = 10;
      break;
      case "06":
        QuincenaNum = 12;
      break;
      case "07":
        QuincenaNum = 14;
      break;
      case "08":
        QuincenaNum = 16;
      break;
      case "09":
        QuincenaNum = 18;
      break;
      case "10":
        QuincenaNum = 20;
      break;
      case "11":
        QuincenaNum = 22;
      break;
      case "12":
        QuincenaNum = 24;
      break;
      default:
        QuincenaNum = 0;
        break;
    }
          
    if(Number(day) <= 15 ){
      QuincenaNum = Number(QuincenaNum) - 1;
    } 

  return [Number(QuincenaNum), Number(year), Number(day)];
  
}



