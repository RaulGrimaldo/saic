
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
jwtSecret= mysecrettoken
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

## Demos

[Demos](https://url)



