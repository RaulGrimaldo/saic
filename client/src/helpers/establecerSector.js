export function establecerSector(zona, cuadrante){

    const cuadrantesplitbyminus = cuadrante.split("-");
    const cuadrantesplitbypointofminus = cuadrantesplitbyminus[1].split(".");
    const region = Number(cuadrantesplitbypointofminus[0]);
    const clave_sector = Number(cuadrantesplitbypointofminus[1]);
    
    if(zona === 'C'){

        switch (clave_sector) {
            case 1:
                return "ALAMEDA";
            case 2:
                return "ANGEL";
            case 3:
                return "ASTURIAS";
            case 4:
                return "BUENAVISTA";
            case 5:
                return "CENTRO";
            case 6:
                return "MORELOS";
            case 7:
                return "ROMA";
            case 8:
                return "TLATELOLCO";
            default:
                return "N/A";
        }

    } else if(zona === 'N'){

        if(region === 1){
            switch (clave_sector) {
                case 1:
                    return "ARAGON";
                case 2:
                    return "CUAUTEPEC";
                case 3:
                    return "CUCHILLA";
                case 4:
                    return "LINDAVISTA";
                case 5:
                    return "PRADERA";
                case 6:
                    return "QUIROGA";
                case 7:
                    return "TEPEYAC";
                case 8:
                    return "TICOMAN";
                default:
                    return "N/A";
            }
        } else if(region === 2){

            switch (clave_sector) {
                case 1:
                    return "IZTACCIHUATL";
                case 2:
                    return "PANTITLAN";
                case 3:
                    return "TLACOTAL";;
                default:
                    return "N/A";
            }

        } else if(region === 3){

            switch (clave_sector) {
                case 1:
                    return "ARENAL";
                case 2:
                    return "CONGRESO";
                case 3:
                    return "CONSULADO";
                case 4:
                    return "MERCED-BALBUENA";
                case 5:
                    return "MOCTEZUMA";
                case 6:
                    return "ZARAGOZA";                
                default:
                    return "N/A";
            }

        } else{
            return "N/A";
        }
    }  else if(zona === 'O'){

        if(region === 1){

            switch (clave_sector) {
                case 1:
                    return "ABASTO-REFORMA";
                case 2:
                    return "CHURUBUSCO";
                case 3:
                    return "ESTRELLA";
                case 4:
                    return "GRANJAS";
                case 5:
                    return "OASIS";
                case 6:
                    return "QUETZAL";
                case 7:
                    return "SANTA CRUZ";
                case 8:
                    return "TEOTONGO";
                case 9:
                    return "TEZONCO";
                default:
                    return "N/A";
            }

        } else if(region === 2){

            switch (clave_sector) {
                case 1:
                    return "MILPA ALTA";
                case 2:
                    return "TECOMITL";
                default:
                    return "N/A";
            }

        } else if(region === 3){

            switch (clave_sector) {
                case 1:
                    return "MIXQUIC";
                case 2:
                    return "ZAPOTITLA";                            
                default:
                    return "N/A";
            }

        } else if(region === 4){

            switch (clave_sector) {
                case 1:
                    return "LA NORIA";
                case 2:
                    return "TEPEPAN";                            
                default:
                    return "N/A";
            }

        } else{
            return "N/A";
        }
    } else if(zona === 'P'){

        if(region === 1){

            switch (clave_sector) {
                case 1:
                    return "ALPES";
                case 2:
                    return "PLATEROS";
                case 3:
                    return "SAN ANGEL";
                case 4:
                    return "SANTA FE";
                default:
                    return "N/A";
            }

        } else if(region === 2){

            switch (clave_sector) {
                case 1:
                    return "CLAVERIA";
                case 2:
                    return "CUITLAHUAC";
                case 3:
                    return "HORMIGA";
                case 4:
                    return "LA RAZA"
                default:
                    return "N/A";
            }

        } else if(region === 3){

            switch (clave_sector) {
                case 1:
                    return "CUAJIMALPA";
                case 2:
                    return "EL YAQUI";                            
                default:
                    return "N/A";
            }

        } else if(region === 4){

            switch (clave_sector) {
                case 1:
                    return "CHAPULTEPEC";
                case 2:
                    return "POLANCO-CASTILLO"; 
                case 3:
                    return "SOTELO";
                case 4:
                    return "TACUBA"; 
                case 5:
                    return "TACUBAYA"; 
                default:
                    return "N/A";
            }
            
        } else{
            return "N/A";
        }
    } else if(zona === 'S'){

        if(region === 1){

            switch (clave_sector) {
                case 1:
                    return "DEL VALLE";
                case 2:
                    return "NAPOLES";
                case 3:
                    return "NARVARTE-ALAMOS";
                case 4:
                    return "NATIVITAS";
                case 5:
                    return "PORTALES";
                default:
                    return "N/A";
            }

        } else if(region === 2){

            switch (clave_sector) {
                case 1:
                    return "COYOACAN";
                case 2:
                    return "CULHUACAN";
                case 3:
                    return "TAXQUEÑA";
                case 4:
                    return "UNIVERSIDAD";
                case 5:
                    return "XOTEPINGO";
                default:
                    return "N/A";
            }

        } else if(region === 3){

            switch (clave_sector) {
                case 1:
                    return "DINAMO";
                case 2:
                    return "SAN JERONIMO";                            
                default:
                    return "N/A";
            }

        } else if(region === 4){

            switch (clave_sector) {
                case 1:
                    return "COAPA";
                case 2:
                    return "FUENTE";
                case 3:
                    return "HUIPULCO-HOSPITALES";
                case 4:
                    return "PADIERNA"  
                case 5:
                    return "TOPILEJO";                          
                default:
                    return "N/A";
            }
            
        } else{
            return "N/A";
        }
    } else {
        return "N/A";
    }     
}