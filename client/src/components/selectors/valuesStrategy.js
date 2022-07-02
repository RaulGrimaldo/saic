export function func333BA(alcaldia, colonia){
      
    
  let back = [false, false, false];
  let colBA =[];
  let col333 = [];
  let colBAR = [];

  if(alcaldia){                                                            
      
      switch (alcaldia) {
          case "Álvaro Obregón":
          
            col333 = [
                "TLACOYAQUE (AMPL)", 
                "ARVIDE", 
                "BARRIO NORTE", 
                "BELEN DE LAS FLORES", 
                "BELLA VISTA",
                "BONANZA", 
                "EL CAPULIN", 
                "EL CUERNITO", 
                "GARCIMARRERO NORTE", 
                "HOGAR Y REDENCION", 
                "JALALPA", 
                "JALALPA EL GRANDE", 
                "JALALPA TEPITO", 
                "JOSE MARIA PINO SUAREZ", 
                "LA ARAÑA", 
                "LA MEXICANA", 
                "LAS AGUILAS (AMPL)", 
                "LOMAS DE BECERRA", 
                "LOMAS DE LOS CEDROS", 
                "MINAS DE CRISTO",
                "OLIVAR DEL CONDE 1RA SECCION", 
                "OLIVAR DEL CONDE 2DA SECCION", 
                "PALMAS AXOTITLA", 
                "PILOTO (ADOLFO LOPEZ MATEOS)", 
                "PRESIDENTES 2DA (AMPL)", 
                "SAN BARTOLO AMEYALCO 1 (PBLO)", 
                "SANTA LUCIA", "TLACUITLAPA 2DO REACOMODO", 
                "TLAPECHICO", 
                "TLAYAPACA", 
                "TOLTECA", 
                "TORRES DE POTRERO",
                //Ampliación de BA  
                "OLIVAR DEL CONDE 1RA SECCION I", 
                "OLIVAR DEL CONDE 1RA SECCION II",
                "OLIVAR DEL CONDE 2DA SECCION II",
            ];
    
            colBA = [
              "BARRIO NORTE", 
              "BELLA VISTA", 
              "JOSE MARIA PINO SUAREZ", 
              "OLIVAR DEL CONDE 1RA SECCION I", 
              "OLIVAR DEL CONDE 1RA SECCION II", 
              "CALZADA JALALPA",
              "LA CAÑADA", 
              "LIBERACION PROLETARIA", 
              "JALALPA (AMPL)",
              "2DA  JALALPA TEPITO (AMPL)", 
              "LA MEXICANA", 
              "SANTA LUCIA",
              "26 DE JULIO", 
              "OLIVAR DEL CONDE 2DA SECCION II", 
              "TLACOYAQUE (AMPL)",
              "LOMAS DE CHAMONTOYA", 
              "TLACOYAQUE", 
              "LAS AGUILAS",
              "PODER POPULAR",         
            ];

            colBAR = [
              "OLIVAR DEL CONDE 1RA SECCION",
              "OLIVAR DEL CONDE 2DA SECCION",       
            ];

          break;
      
          case "Azcapotzalco":
          
            col333 = [
              "ALDANA", 
              "SAN PEDRO XALPA (AMPL)", 
              "ARENAL", 
              "COLTONGO", 
              "EL JAGUEY",
              "EL ROSARIO", 
              "LA RAZA", 
              "LAS SALINAS", 
              "PRO HOGAR", 
              "PROVIDENCIA",
              "REYNOSA TAMAULIPAS", 
              "SAN ANDRES", 
              "SAN FRANCISCO XOCOTITLA", 
              "SAN JUAN TLIHUACA", 
              "SAN MIGUEL AMANTLA",
              "SAN SEBASTIAN", 
              "SANTA INES", 
              "SANTA MARIA MALINALCO", 
              "SANTIAGO AHUIZOTLA",
              "TEZOZOMOC",
              "SAN PEDRO XALPA (AMPL) I",
              "SAN PEDRO XALPA (AMPL) II",
            ];
    
            colBA = [
              "SAN PEDRO XALPA (AMPL) I",
              "SAN PEDRO XALPA (AMPL) II",
              "LIBERTAD",
              "SAN SEBASTIAN",
              "SANTA MARIA MALINALCO (PBLO)",
              "EL ROSARIO C (U HAB)",   
            ];

            colBAR = [
              "SAN PEDRO XALPA (AMPL)",        
            ];

          break;

          case "Benito Juárez":
          
            col333 = [
              "8 DE AGOSTO I", 
              "INDEPENDENCIA", 
              "NATIVITAS", 
              "NONOALCO", 
              "PORTALES NORTE",
              "PORTALES ORIENTE", 
              "PORTALES SUR", 
              "SAN SIMON TICUMAC",
              "PORTALES II",
              "PORTALES III",
            ];
    
            colBA = [
              "SAN SIMON TICUMAC",
              "PORTALES II",
              "PORTALES III",      
            ];

            colBAR = [
              "PORTALES NORTE",
              "PORTALES SUR",       
            ];

          break;

          case "Coyoacán":
          
            col333 = [
              "ADOLFO RUIZ CORTINES", 
              "AJUSCO", 
              "AJUSCO HUAYAMILPAS", 
              "AMPLIACION CANDELARIA", 
              "CARMEN SERDAN",
              "COPILCO EL ALTO", 
              "LA MAGDALENA CULHUACAN", 
              "LOS REYES", 
              "SANTA URSULA COAPA PEDREGAL DE SANTA URSULA COAPA", 
              "PILOTO CULHUACAN",
              "POPULAR EMILIANO ZAPATA", 
              "SAN FRANCISCO CULHUACAN", 
              "SANTA URSULA COAPA", 
              "STO DOMINGO PEDREGAL DE STO DOMINGO",
              "PEDREGAL DE SANTA URSULA I",
              "PEDREGAL DE SANTA URSULA II",
              "PEDREGAL DE SANTA URSULA III",
              "PEDREGAL DE SANTA URSULA IV",
              "PEDREGAL DE STO DOMINGO I",
              "PEDREGAL DE STO DOMINGO II",
              "PEDREGAL DE STO DOMINGO III",
              "PEDREGAL DE STO DOMINGO IV",
              "PEDREGAL DE STO DOMINGO IX",
              "PEDREGAL DE STO DOMINGO V",
              "PEDREGAL DE STO DOMINGO VI",
              "PEDREGAL DE STO DOMINGO VII",
              "PEDREGAL DE STO DOMINGO VIII", 
            ];
    
            colBA = [
              "PEDREGAL DE STO DOMINGO VI",
              "PEDREGAL DE STO DOMINGO VII",
              "PEDREGAL DE STO DOMINGO VIII",
              "PEDREGAL DE SANTA URSULA I",
              "PEDREGAL DE SANTA URSULA II",
              "PEDREGAL DE SANTA URSULA III",
              "PEDREGAL DE SANTA URSULA IV",
              "CARMEN SERDAN",
              "EMILIANO ZAPATA (U HAB)",
              "PILOTO CULHUACAN (U HAB)",      
            ];

            colBAR = [
              "STO DOMINGO PEDREGAL DE STO DOMINGO",
              "SANTA URSULA COAPA PEDREGAL DE SANTA URSULA COAPA",       
            ];

          break;

          case "Cuajimalpa de Morelos":
          
            col333 = [
              "NAVIDAD (GRANJAS DE NAVIDAD)", 
              "SAN JOSE DE LOS CEDROS", 
              "SAN LORENZO ACOPILCO (PBLO)", 
              "SAN MATEO TLALTENANGO (PBLO)", 
              "SAN PABLO CHIMALPA (PBLO)"
            ];
    
            colBA = [
              //"SAN PABLO CHIMALPA (PBLO)",
              //"SAN JOSE DE LOS CEDROS II",
              //"NAVIDAD (GRANJAS DE NAVIDAD)",      
            ];

            colBAR = [   
            ];

          break;

          case "Cuauhtémoc":
          
            col333 = [
              "ATLAMPA", 
              "BUENAVISTA", 
              "BUENOS AIRES", 
              "CENTRO", 
              "DOCTORES",
              "ESPERANZA", 
              "GUERRERO", 
              "MORELOS", 
              "OBRERA", 
              "SANTA MARIA LA RIBERA",
              "VALLE GOMEZ",
              "DOCTORES I",
              "DOCTORES II",
              "DOCTORES III",
              "DOCTORES IV",
              "DOCTORES V",
              "CENTRO I",
              "CENTRO II",
              "CENTRO III",
              "CENTRO IV",
              "CENTRO V",
              "CENTRO VI",
              "CENTRO VII",
              "CENTRO VIII",
              "GUERRERO I",
              "GUERRERO II",
              "GUERRERO III",
              "GUERRERO IV",
              "SANTA MARIA LA RIBERA I",
              "SANTA MARIA LA RIBERA II",
              "SANTA MARIA LA RIBERA IV",
            ];
    
            colBA = [
              "BUENOS AIRES",
              "DOCTORES V",
              //"DOCTORES III",
              "OBRERA III",
              //"OBRERA II",
              "CENTRO I",
              "CENTRO II",
              "CENTRO IV",
              "ATLAMPA",
              "SANTA MARIA LA RIBERA I",
              "GUERRERO III",
              "GUERRERO IV",     
            ];

            colBAR = [ 
              "DOCTORES",
              "OBRERA",
              "CENTRO",
              "SANTA MARIA LA RIBERA",
              "GUERRERO"  
            ];

          break;

          case "Gustavo A. Madero":
          
            col333 = [
              "15 DE AGOSTO", 
              "25 DE JULIO", 
              "BENITO JUAREZ (AMPL)", 
              "CAMPESTRE ARAGON", 
              "CAPULTITLAN I",
              "CHALMA DE GUADALUPE", 
              "CUAUTEPEC DE MADERO", 
              "CUAUTEPEC EL ALTO", 
              "CUCHILLA DEL TESORO I", 
              "EJIDOS SAN JUAN DE ARAGON 1A SECCION",
              "GABRIEL HERNANDEZ", 
              "GABRIEL HERNANDEZ (AMPL)", 
              "GERTRUDIS SANCHEZ 3A SECCION", 
              "GUADALUPE PROLETARIA", 
              "LA CANDELARIA TICOMAN",
              "LA MALINCHE", 
              "LA PASTORA", 
              "LOMA DE LA PALMA", 
              "LOMAS DE SAN JUAN IXHUATEPEC (2A SECCION)", 
              "MARTIN CARRERA",
              "NUEVA ATZACOALCO", 
              "NUEVA TENOCHTITLAN", 
              "PALMATITLA", 
              "PANAMERICANA", 
              "PARQUE METROPOLITANO (PARQUE NACIONAL)",
              "PROGRESO NACIONAL", 
              "PROVIDENCIA", 
              "SAN FELIPE DE JESUS", 
              "SAN JUAN Y GUADALUPE TICOMAN", 
              "SAN RAFAEL TICOMAN",
              "SANTIAGO ATEPETLAC", 
              "SANTIAGO ATZACOALCO", 
              "TLACAELEL", 
              "TLALPEXCO", 
              "VALLE DE MADERO",
              "VALLEJO", 
              "VASCO DE QUIROGA", 
              "VILLA GUSTAVO A MADERO", 
              "ZONA ESCOLAR", 
              "ZONA ESCOLAR ORIENTE",
              "MARTIN CARRERA I",
              "MARTIN CARRERA II",
              "NUEVA ATZACOALCO I",
              "NUEVA ATZACOALCO II",
              "NUEVA ATZACOALCO III",
            ];
    
            colBA = [
              "15 DE AGOSTO",
              "ESTANZUELA",
              "MARTIN CARRERA I",
              "MARTIN CARRERA II",
              "NUEVA ATZACOALCO I",
              "NUEVA ATZACOALCO II",
              "NUEVA ATZACOALCO III",
              //"CHALMA DE GUADALUPE I",
              //"CHALMA DE GUADALUPE II",
              //"TLALPEXCO",
              //"CAMPESTRE ARAGON I",
              //"CAMPESTRE ARAGON II",
              //"PROGRESO NACIONAL (AMPL)",
              //"PROGRESO NACIONAL I",
              //"PROGRESO NACIONAL II",
              //"SANTIAGO ATEPETLAC",
              //"SAN JUAN DE ARAGON 2A SECCION (U HAB) I",
              //"LA JOYA",
              //"7 DE NOVIEMBRE",
              //"JORGE NEGRETE",
              //"EL ARBOLILLO 1 (U HAB)",    
            ];

            colBAR = [ 
              "MARTIN CARRERA",
              "NUEVA ATZACOALCO",
              //"CHALMA DE GUADALUPE",
              //"CAMPESTRE ARAGON",
              //"PROGRESO NACIONAL",
              //"SAN JUAN DE ARAGON 2A SECCION (U HAB) I", editar nombre conforme a la base
              //"EL ARBOLILLO", 
            ];

          break;

          case "Iztacalco":
          
            col333 = [
              "AGRICOLA ORIENTAL", 
              "AMPLIACION RAMOS MILLAN", 
              "CAMPAMENTO 2 DE OCTUBRE", 
              "CARLOS ZAPATA VELA", 
              "CUCHILLA RAMOS MILLAN",
              "GABRIEL RAMOS MILLAN",
              "GRANJAS MEXICO", 
              "INFONAVIT IZTACALCO", 
              "JUVENTINO ROSAS", 
              "LA CRUZ",
              "LOS REYES",
              "PANTITLAN", 
              "RAMOS MILLAN BRAMADERO", 
              "SAN MIGUEL", 
              "SAN PEDRO IZTACALCO",
              "SANTA CRUZ", 
              "TLACOTAL RAMOS MILLAN", 
              "TLAZINTLA", 
              "ZAPOTLA",
              "CAMPAMENTO 2 DE OCTUBRE I",
              "CAMPAMENTO 2 DE OCTUBRE II",
              "JUVENTINO ROSAS I",
              "JUVENTINO ROSAS II",
            ];
    
            colBA = [
              "CAMPAMENTO 2 DE OCTUBRE I",
              "CAMPAMENTO 2 DE OCTUBRE II",
              "GABRIEL RAMOS MILLAN",
              "JUVENTINO ROSAS I",
              "JUVENTINO ROSAS II",
              "AGRICOLA ORIENTAL V",
              "AGRICOLA ORIENTAL VII",   
            ];

            colBAR = [ 
              "CAMPAMENTO 2 DE OCTUBRE",
              "JUVENTINO ROSAS",
              "AGRICOLA ORIENTAL",
            ];

          break;

          case "Iztapalapa":
          
            col333 = [
              "1A AMPLIACION SANTIAGO ACAHUALTEPEC", 
              "2A AMPLIACION SANTIAGO ACAHUALTEPEC", 
              "ALVARO OBREGON(FRACC)", 
              "EMILIANO ZAPATA (AMPL)", 
              "BUENAVISTA",
              "CERRO DE LA ESTRELLA", 
              "CHINAMPAC DE JUAREZ", 
              "CITLALLI", 
              "CONSEJO AGRARISTA MEXICANO", 
              "DESARROLLO URBANO QUETZALCOATL",
              "EJERCITO DE AGUA PRIETA (PONIENTE)", 
              "EJERCITO DE ORIENTE", "EL TRIANGULO", 
              "EL TRIUNFO (AMPL)", 
              "ERMITA ZARAGOZA",
              "IXTLAHUACAN", 
              "JOSE LOPEZ PORTILLO", 
              "LA POLVORILLA", 
              "LEYES DE REFORMA 1A SECCION", 
              "LOMAS DE LA ESTANCIA",
              "LOMAS DE SAN LORENZO", 
              "LOMAS DE ZARAGOZA", 
              "MIGUEL DE LA MADRID HURTADO", 
              "PALMITAS", 
              "PARAISO I",
              "PARAJES BUENAVISTA (TETECON)", 
              "PRESIDENTES DE MEXICO", 
              "PUENTE BLANCO", 
              "REFORMA POLITICA", 
              "RENOVACION",
              "SAN ANTONIO", 
              "SAN ANTONIO CULHUACAN (PBLO)", 
              "SAN JOSE BUENAVISTA", 
              "SAN LORENZO TEZONCO (BARR)", 
              "SAN LORENZO TEZONCO (PBLO)",
              "SAN MIGUEL", 
              "SAN MIGUEL TEOTONGO", 
              "SAN SEBASTIAN TECOLOXTITLAN", 
              "SANTA CRUZ MEYEHUALCO (PBLO)", 
              "SANTA MARIA AZTAHUACAN (PBLO)",
              "SANTA MARTHA ACATITLA", 
              "SANTA MARTHA ACATITLA (PBLO)", 
              "SANTA MARTHA ACATITLA SUR", 
              "SANTIAGO ACAHUALTEPEC", 
              "TENORIOS I",
              "EJTO CONSTITUCIONALISTA (U HAB)", 
              "VALLE DEL SUR", 
              "VICENTE GUERRERO", 
              "XALPA", 
              "ZONA URBANA EJIDAL STA MARTHA ACATITLA NTE"
            ];
    
            colBA = [
              //"ERMITA ZARAGOZA (U HAB) I",
              //"ERMITA ZARAGOZA (U HAB) II",
              //"PREDIO DEGOLLADO",
              //"DESARROLLO URBANO QUETZALCOATL II",
              //"DESARROLLO URBANO QUETZALCOATL III",
              //"LOMAS DE LA ESTANCIA II",
              //"XALPA III",
              //"SAN MIGUEL TEOTONGO II",
              //"SAN MIGUEL TEOTONGO III",
              //"SAN ANTONIO (BARR)",
              //"VALLE DE SAN LORENZO I",
              //"VALLE DE SAN LORENZO II",
              //"CHINAMPAC DE JUAREZ II",
              //"FRANCISCO VILLA (EJERCITO CONSTITUCIONALISTA) (CONJ HAB)",  
            ];

            colBAR = [ 
            ];

          break;

          case "La Magdalena Contreras":
          
            col333 = [
              "EL OCOTAL", 
              "EL TANQUE", 
              "EL GAVILLERO", 
              "LA CONCEPCION", 
              "LA MAGDALENA ATLITIC (PBLO)",
              "LA MALINCHE", "LAS CRUCES", 
              "LOS PADRES", 
              "SAN BERNABE OCOTEPEC (PBLO)", 
              "SAN FRANCISCO",
              "SAN FRANCISCO (BARR)", 
              "SAN NICOLAS TOTOLAPAN (PBLO)", 
              "TIERRA COLORADA", 
              "TIERRA UNIDA"
            ];
    
            colBA = [
              "LAS CRUCES",
              "EL OCOTAL",
              "TIERRA COLORADA",
            ];

            colBAR = [ 

            ];

          break;

          case "Miguel Hidalgo":
          
            col333 = [
              "AMERICA", 
              "ANAHUAC", 
              "ARGENTINA ANTIGUA", 
              "DANIEL GARZA", 
              "HUICHAPAN",
              "PENSIL NORTE", 
              "PENSIL SAN JUANICO", 
              "REFORMA PENSIL", 
              "SAN LORENZO TLALTENANGO", 
              "TACUBA",
              "TACUBAYA", 
              "TLAXPANA",
              "ANAHUAC I",
              "ANAHUAC II",
            ];
    
            colBA = [
              "ANAHUAC I",
              "ANAHUAC II",
              "DANIEL GARZA",
              "AMERICA",
              "16 DE SEPTIEMBRE",
              "VENTURA PEREZ DE ALBA",
              "PENSIL NORTE",
              "PENSIL SUR",
              "TACUBA",
              "NUEVA ARGENTINA (ARGENTINA PONIENTE)",
              "ARGENTINA ANTIGUA",
              "TLAXPANA",
            ];

            colBAR = [ 
              "ANAHUAC",
            ];

          break;

          case "Milpa Alta":
          
            col333 = [
              "SAN ANTONIO TECOMITL (BARR CRUZTITLA)", 
              "SAN PEDRO ATOCPAN (PBLO) OCOTITLA", 
              "SAN BARTOLOME XICOMULCO (PBLO)",
              "SAN FRANCISCO TECOXPA", 
              "SAN JERONIMO MIACATLAN (PBLO)",
              "SAN JUAN TEPENAHUAC (PBLO)", 
              "SAN LORENZO TLACOYUCAN (PBLO)", 
              "SAN PABLO OZTOTEPEC (PBLO) SAN MIGUEL", 
              "SANTA ANA TLACOTENCO (PBLO) SAN MIGUEL", 
              "SAN SALVADOR CUAUHTENCO (PBLO)",
              "VILLA MILPA ALTA (PBLO)"
            ];
    
            colBA = [
              //"SAN SALVADOR CUAUHTENCO (PBLO)",
              //"SAN ANTONIO TECOMITL (PBLO)",
              "SAN PABLO OZTOTEPEC (PBLO)",
            ];

            colBAR = [ 
              "SAN PABLO OZTOTEPEC (PBLO) SAN MIGUEL"
            ];

          break;

          case "Tláhuac":
          
            col333 = [
              "AGRICOLA METROPOLITANA", 
              "DEL MAR NORTE", 
              "EL ROSARIO", 
              "FRANCISCO VILLA", 
              "LA ASUNCIÓN SAN JUAN IXTAYOPAN (PBLO)",
              "SANTA CATARINA YECAHUIZOTL (PBLO) LA CONCEPCIÓN", 
              "LA DRAGA", 
              "LA ESTACION", 
              "LA HABANA", 
              "LA NOPALERA",
              "LAS ARBOLEDAS", 
              "LOS OLIVOS I", 
              "SAN ANDRES MIXQUIC (PBLO) LOS REYES", 
              "SAN PEDRO TLAHUAC (PBLO) LOS REYES", 
              "MIGUEL HIDALGO",
              "OLIVAR SANTA MARIA I", 
              "SAN FRANCISCO TLALTENCO", 
              "SAN MIGUEL ZAPOTITLA", 
              "SAN NICOLAS TETELCO (PBLO)",
              "SANTA ANA PONIENTE", 
              "SANTA CECILIA", 
              "SANTIAGO ZAPOTITLAN (PBLO)"
            ];
    
            colBA = [
              "LA ESTACION",
              //"SAN ANTONIO TECOMITL (PBLO)",
              //"SAN PABLO OZTOTEPEC (PBLO)",
              //"OLIVAR SANTA MARIA",
              //"MIGUEL HIDALGO",
              //"AGRICOLA METROPOLITANA",
            ];

            colBAR = [ 
              "SAN PABLO OZTOTEPEC (PBLO) SAN MIGUEL"
            ];

          break;

          case "Tlalpan":
          
            col333 = [
              "2 DE OCTUBRE", 
              "AMPLIACION MIGUEL HIDALGO 3A SECC", 
              "AMPLIACION MIGUEL HIDALGO 4A SECC", 
              "BOSQUES DEL PEDREGAL", 
              "CANTERA PUENTE DE PIEDRA",
              "CHICHICASPATL", 
              "CHIMILLI", 
              "CULTURA MAYA LOPEZ PORTILLO", 
              "EJIDOS DE SAN PEDRO MARTIR", 
              "EX HACIENDA SAN JUAN DE DIOS",
              "HEROES DE PADIERNA", 
              "ISIDRO  FABELA", 
              "ISIDRO  FABELA (AMPL)", 
              "LA MAGDALENA PETLACALCO (PBLO)", 
              "LOMAS ALTAS DE PADIERNA SUR",
              "LOMAS DE  PADIERNA", 
              "LOMAS DEL PEDREGAL CUCHILLA DE PADIERNA", 
              "LOMAS HIDALGO", "MESA LOS HORNOS",
              "MIGUEL HIDALGO", 
              "MIRADOR II", 
              "PARRES EL GUARDA (PBLO)", 
              "PEDREGAL DE SN NICOLAS 1A SECC", 
              "PEDREGAL DE SN NICOLAS 2A SECC",
              "PEDREGAL DE SN NICOLAS 3A SECC", 
              "PLAN DE AYALA", 
              "POPULAR STA TERESA", 
              "PUEBLO QUIETO", 
              "SAN ANDRES TOTOLTEPEC (PBLO)",
              "SAN BARTOLO EL CHICO", 
              "SAN JUAN TEPEXIMILPA", 
              "SAN MIGUEL AJUSCO (PBLO)", 
              "SAN MIGUEL TOPILEJO (PBLO)", 
              "SAN MIGUEL  XICALCO (PBLO)",
              "SAN PEDRO MARTIR (PBLO)",
              "SANTO TOMAS AJUSCO (PBLO)", 
              "VILLA COAPA (U HAB)"
            ];
    
            colBA = [
              "MESA LOS HORNOS, TEXCALTENCO",
              "SANTISIMA TRINIDAD",
              "TEPETONGO",
              "SAN MIGUEL TOPILEJO (PBLO)",
              "SAN MIGUEL TOXIAC",
              "TEZONTITLA",
              "PEDREGAL DE SN NICOLAS 1A SECC",
              "SAN MIGUEL AJUSCO (PBLO)",
              "LOMAS ALTAS DE PADIERNA SUR",
              "2 DE OCTUBRE",
              "BELVEDERE",
              "SAN ANDRES TOTOLTEPEC (PBLO)",
            ];

            colBAR = [ 
              "MESA LOS HORNOS",
              "SAN MIGUEL TOPILEJO",
            ];

          break;

          case "Venustiano Carranza":
          
            col333 = [
              "20 DE NOVIEMBRE", 
              "ADOLFO LOPEZ MATEOS", 
              "CANDELARIA DE LOS PATOS", 
              "CENTRO", 
              "CUCHILLA PANTITLAN",
              "DAMIAN CARMONA", 
              "EL ARENAL 1A SECCION", 
              "EMILIO CARRANZA", 
              "FELIPE ANGELES", 
              "MAGDALENA  MIXHUCA (PBLO)",
              "MERCED BALBUENA", 
              "MORELOS II", 
              "PENITENCIARIA", 
              "PENSADOR MEXICANO", 
              "PEÑON DE LOS BAÑOS",
              "PRIMERO DE MAYO", 
              "REVOLUCION", 
              "ROMERO RUBIO", 
              "SEVILLA",
              "VALLE GOMEZ", 
              "VENUSTIANO CARRANZA (AMPL)", 
              "VIADUCTO  - BALBUENA (MORELOS I)"
            ];
    
            colBA = [
              "MAGDALENA  MIXHUCA (PBLO)",
              "MAGDALENA  MIXHUCA",
              //"ROMERO RUBIO",
            ];

            colBAR = [ 
            ];

          break;

          case "Xochimilco":
          
            col333 = [
              "CALTONGO (BARR)", 
              "LA CONCEPCION TLACOAPA", 
              "LOS CERRILLOS III", 
              "SAN ANDRES AHUAYUCAN (PBLO)", 
              "SAN BARTOLO EL CHICO",
              "SAN ESTEBAN (BARR)", 
              "SAN FRANCISCO TLALNEPANTLA (PBLO)", 
              "SAN GREGORIO ATLAPULCO (PBLO)", 
              "SAN JERONIMO (PBLO DE NATIVITAS)", 
              "SAN LORENZO ATEMOAYA (PBLO)",
              "SAN LORENZO LA CEBADA", 
              "SAN LUCAS XOCHIMANCA (PBLO)", 
              "SAN LUIS TLAXIALTEMALCO (PBLO)", 
              "SAN MARCOS (AMPL)", 
              "SAN MATEO XALPA (PBLO)",
              "SAN PEDRO (BARR)", 
              "SANTA CECILIA TEPETLAPA (PBLO)", 
              "SANTA CRUZ ACALPIXCA (PBLO)", 
              "SANTA CRUZ XOCHITEPEC (PBLO)",
              "SANTIAGO TEPALCATLALPAN (PBLO)", 
              "TEPEPAN", 
              "SANTIAGO TULYEHUALCO CENTRO (PBLO)", 
              "XALTOCAN (BARR)"
            ];
    
            colBA = [
              "LOS CERRILLOS I",
              "LOS CERRILLOS II",
              "SAN FRANCISCO CHIQUIMOLA",
              "SAN LORENZO LA CEBADA I",
              "SAN LORENZO LA CEBADA II",
              "CALTONGO (BARR)",
              "SAN ESTEBAN (BARR)",
              "SAN MARCOS (AMPL)",
              "SAN MARCOS (BARR)",
              "SAN LUCAS XOCHIMANCA (PBLO)",
              "SAN MATEO XALPA (PBLO)",
              "SANTA INES",
              "TEPEPAN (AMPL)",
              "LA NORIA TEPEPAN",
              "SANTA CRUZ XOCHITEPEC",
            ];

            colBAR = [ 
              "LOS CERRILLOS",
              "SAN LORENZO LA CEBADA",
              "TEPEPAN",
              "LA NORIA",
            ];

          break;

          default:
              break;
      }
      
    
      if(col333 !== []){
        
          for(let col1 = 0;col1 < col333.length; col1++){                                       
              
            let colonialimpia = colonia.split(' ').join('');;
            let col333limpia = col333[col1].split(' ').join('');;
            console.log(colonia, col333limpia)
            if(colonialimpia === col333limpia){                                      
              back[0] = true;
            } 

          };
      }

      if(colBA !== []){
        
        for(let col = 0;col < colBA.length; col++){                                       
            
          let colonialimpiaBA = colonia.split(' ').join('');;
          let colBAlimpia = colBA[col].split(' ').join('');;

          if(colonialimpiaBA === colBAlimpia){                                      
            back[1] = true;
          } 
        };
      } 

      if(colBAR !== []){
        
        for(let col = 0;col < colBAR.length; col++){                                       
            
          let colonialimpiaBAR = colonia.split(' ').join('');;
          let colBARlimpia = colBAR[col].split(' ').join('');;

          if(colonialimpiaBAR === colBARlimpia){                                      
            back[2] = true;
          } 
        };
      } 
  }                
  return back;    
}