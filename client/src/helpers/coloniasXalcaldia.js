
export function alcaldiaXcolonia(alcaldia){
;

   
    let colonias;  

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
          
    if(day <= 15 ){
      QuincenaNum = Number(QuincenaNum) - 1;
    } 

    return [Number(QuincenaNum), Number(year)];
  
}