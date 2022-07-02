
<p align="center">
  <a href="https://github.com/RaulGrimaldo/saic">
        <img alt="Logo" src="https://i.ibb.co/FH4P5d2/saic.png" />
  </a>
  <h1 align="center">
   SAIC
  </h1>
</p>

## Pre-requisitos

Para modo desarrollo archivo .env en la carpeta saic con las siguientes variables de enterno


En caso de usar basde de Mongo local
```shell
MONGO_USERNAME=admin
MONGO_PASSWORD=adminpassword
MONGO_HOSTNAME=127.0.0.1
MONGO_PORT=27017
MONGO_DB=saicdatabase
```

En caso de usar MONGO ATLAS
```shell
MONGO_ATLAS_PASSWORD=password
```
en en /config el archivo keys el usuario y nombre de la base de datos
```shell
dbPassword = 'mongodb+srv://USERNAME:'+ encodeURIComponent(process.env.MONGO_ATLAS_PASSWORD) + '@cluster0-xmlrk.mongodb.net/nombredb?retryWrites=true&w=majority';
```
Insertar usuario default en base con contraseña defaul 123456 *CAMBIAR INMEDIATAMENTE*
```shell
db.users.insert({	
	"secretaria":"SSC", "subsecretaria": "OM",
    "direcciongeneral": "DGF",
	"direccion": "DGF",
	"subdireccion": "DGF",
	"jud": "DGF",
	"ROL": "Admin",
	"Nivel": 0,	
	"username": "NOMBRE DE USUARIO",
	"email": "email@gmail.com",
	"password": "$2y$10$fZb8J5nXkiAK/xP8jEDqN.6HszvvCRxHNTrX3ZbDAdNLAFOMplvMW",
	"active": true,
	"phonenumber": 5584875487,
    "baseURL": "admin",
  	"activo": "SI",
	"mirror": false,
	"espejo": "NO",
	"numeroEmpleadoPlaca": "123456"

})
```
En Mongodb Atlas poner nombre de la base en la cadena de conexión y Collection users
```shell
{"_id":{"$oid":"XXXXXXXXXXXXXXXX"},"secretaria":"SSC", "subsecretaria": "OM",
    "direcciongeneral": "DGF",
	"direccion": "DGF",
	"subdireccion": "DGF",
	"jud": "DGF",
	"ROL": "Admin",
	"Nivel": 0,	
	"username": "NOMBRE DE USUARIO",
	"email": "email@gmail.com",
	"password": "$2y$10$fZb8J5nXkiAK/xP8jEDqN.6HszvvCRxHNTrX3ZbDAdNLAFOMplvMW",
	"active": true,
	"phonenumber": 5584875487,
    "baseURL": "admin",
  	"activo": "SI",
	"mirror": false,
	"espejo": "NO",
	"numeroEmpleadoPlaca": "123456"
}
```
Para notificaciones con correos de google
```shell
SENDER_EMAIL=correo@correo.com
SENDER_PASSWORD=contraseñaparapps
```
Correo donde se alerta de correos o modificaciones
```shell
ALERT_EMAIL=correoalerta@correo.com
```
Para JWT
```shell
jwtSecret=mysecrettoken
```
Para produccion
```shell
NODE_ENV=production
```

## Instalación

```shell
npm install
```
(dentro del folder client)

```shell
npm install
npm run build
```

desde la carpeta de saic 
```shell
npm start
```
## Note

Para la exportación de la tabla es necesario cambiar el modulo de node de client/node_modules/ant-table-extensions/dist/ant-table-extensions.esm.js
```shell
okText: "Export",
title: "Select columns to export"
```
Traducción
```shell
okText: "Exportar",
title: "Seleccionar columnas a exportar"
```
Para la exportación de caracteres del español sustituir la siguiente línea
```shell
var blob = new Blob([csv]);
```
por: 
```shell
var blob = new Blob(['\ufeff' + csv], {type: 'text/csv;charset=utf-8'});
```

para desarrollo en la vista de documento cambiar el puerto del 8080 al 3000 y viceversa para producción en RegisterScreen.







