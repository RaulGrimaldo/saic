const express = require('express');
const Register = require('../../models/Register');
const User = require('../../models/User');
const Consecutive = require('../../models/Consecutive');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const path = require('path');
const { splitIdnombrepersona } = require('../../helpers/datosAsociados');
const { obtenerQuincenaConFecha, fechaHora, quincenaNumActual} = require('../../helpers/dates');
const { excluirfunc, etapa, unidadMedida, camai, descclasividad, nomclasividad } = require('../../helpers/backoffice');
const { estrategia333, barrioadentro} = require('../../helpers/programsgob');
const { metas, metasDVC, metasDCIyT} = require('../../helpers/metas');
const checkObjectId = require('../../middleware/checkObjectId');
const nodemailer = require("nodemailer");

const cron = require('node-cron');

cron.schedule('10 40 09 * * 0-6', () => {
  const FechaHoy = fechaHora();
  let year = (new Date().getFullYear()).toString();
  const QuincenaActual = quincenaNumActual();
  const registrosActualizables = {
    $and: [{
      QuincenaNum: QuincenaActual,
      aniorango: year, estadogeneral: "BORRADOR"
    }, { fechadinamica: { $ne: FechaHoy[0] } }
    ]
  };

  Register.updateMany(registrosActualizables, { $set: { fechadinamica: FechaHoy[0] } }, (err, res) => {
    if (err) {
      console.log("Error en el servidor")
    } else {
      console.log(res)
    }
  });

  const registrosActualizables2 = {
    $and: [{
      QuincenaNum: QuincenaActual,
      aniorango: year, estadogeneral: "ENVIADO"
    },
    { fechadinamica: { $ne: FechaHoy[0] } }
    ]
  };

  Register.updateMany(registrosActualizables2, { $set: { fechadinamica: FechaHoy[0] } }, (err, res) => {
    if (err) {
      console.log("Error en el servidor")
    } else {
      console.log(res)
    }
  });
}, {
  scheduled: true,
  timezone: "America/Mexico_City"
});

//Upload mult images
const storage = multer.diskStorage({
  destination: (req, file, callback) => { //this is storing the file in the images folder
    callback(null, path.join(__dirname, '../../client/assets'));
},

  filename: function (req, file, cb, next) {
    if (file.originalname) {
      file.uploaded_name = Date.now() + file.originalname.replace(/ /g, "_").toLowerCase();
      var file_name = Date.now() + file.originalname.replace(/ /g, "_").toLowerCase();
      var ext = file.mimetype.split('/')[1];
      cb(null, file_name);
    }
    else {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }
});

var upload = multer({
  "storage": storage
});

// @route       GET api/registers
// @desc        Get registers of the day, and pending registers
// @access      Public
router.get('/registers', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');

      const fechaHoraServer = fechaHora();
      // [fecha, hora],   
  
      const FechaHoy = fechaHoraServer[0];
      
      let query;
      if(Number(user.Nivel) === 0){
        query = {fechadinamica: FechaHoy, Direcciongeneral: user.direcciongeneral};
      }  else if(Number(user.Nivel) === 1){
        query = {fechadinamica: FechaHoy, Direccion: user.direccion};
      }  else if(Number(user.Nivel) === 2){
        query = {fechadinamica: FechaHoy, SubDireccion: user.subdireccion};
      }  else if(Number(user.Nivel) === 3){
        query = {fechadinamica: FechaHoy, JUD: user.jud};
      } else if(Number(user.Nivel) === 4){
        query = {fechadinamica: FechaHoy, email: user.email};
      }   
      const registers = await Register.find(query);
      const quincenaActual = quincenaNumActual(); 
      res.json({ registers: registers, datosQuincena: quincenaActual });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route       POST api/addregister
// @desc        Add register 
// @access      Private
router.post(  
  '/addregister', auth, upload.array('image', 4),
  //Datos del registro
  check('FechaSimple', 'Fecha es requerida').notEmpty(),
  check('JUD', 'JUD/SUB es requerida').notEmpty(),
  
  //Datos de la actividad
  check('estrategia', 'Estretegia requerida').notEmpty(),
  check('Tipo', 'Tipo requerido').notEmpty(),
  check('Actividad', 'Actividad requerida').notEmpty(),
  check('Rubro', 'Rubro requerido').notEmpty(),
  check('Subrubro', 'Subrubro requerido').notEmpty(),
  check('Solicitudes', 'N° de solicitudes requerido').notEmpty(),
  check('TemasTratados', 'Temas tratados requeridos').notEmpty(),
  check('Acuerdos', 'Acuerdos requeridos').notEmpty(),
  check('observaciones', 'Descripción requerido').notEmpty(),
  //check('publicodirigido', 'Descripción requerido').notEmpty(),

  check('institucion', 'Nombre de institución requerido').notEmpty(),
  check('Calle', 'Calle requerida').notEmpty(),
  check('Numero','N° requerido').notEmpty(),

  check('Alcaldia', 'Alcaldía requerida').notEmpty(), 
  check('Colonia', 'Colonia requerida').notEmpty(),
  check('Cuadrante','Cuadrante requerido').notEmpty(),
  check('sector','Sector requerido').notEmpty(),
  check('coordx','Coordenada x requerida').notEmpty(),
  check('coordy','Coordenada y requerida').notEmpty(),

  check('Contacto','Contacto requerido').notEmpty(),
  check('Cargo','Cargo requerido').notEmpty(),

  check('asistentesmujeres','N° de Asistentes muejeres requerido').notEmpty(),
  check('asistenteshombres','N° de Asistentes hombres requerido').notEmpty(),
  check('Asistentes','N° de Asistentes total requerido').notEmpty(),
  check('asistentes014','N° de Asistentes 0-14 requerido').notEmpty(),
  check('asistentes1518','N° de Asistentes 15-20 requerido').notEmpty(),
  check('asistentes1965','N° de Asistentes 21-65 requerido').notEmpty(),
  check('asistentes65mas','N° de Asistentes 65 y más requerido').notEmpty(), 

  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { JUD, FechaSimple} = req.body;
    let consecutive = await Consecutive.findOne({ jud: JUD });

    if (!consecutive) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No se ha establecido el consecutivos de esta área' }] });
    }    

    let consecutivo = consecutive.consecutivo + 1;
    
    await Consecutive.findOneAndUpdate({ jud: JUD },
      {$set: {consecutivo: consecutivo}}
    );

    switch (consecutivo.toString().length) {
      case 1:
        consecutivo = "000" + consecutivo.toString();
        break;
        case 2:
          consecutivo = "00" + consecutivo.toString();
          break;
          case 3:
            consecutivo = "0" + consecutivo.toString();
          break;
      default:
        consecutivo = consecutivo.toString();             
        break;
    }

    const ID = JUD + '-' + FechaSimple + '-' +  consecutivo; 

    let registerexist = await Register.findOne({ ID });

    if (registerexist) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Colapso de consecutivos' }] });
    }

    const fecharango = FechaSimple;

    //Verificar si la quincena seleccionada coincide con la quincena del server
    const quincenaActual = quincenaNumActual(); 
    //[QuincenaNumero, año, dia, QuincenaNombre, NombreMes, numeroMes]

    const quincenaFechaSeleccionada = obtenerQuincenaConFecha(fecharango); 
    // [QuincenaNumero, año, dia];

    if( (quincenaActual[0] !== quincenaFechaSeleccionada[0]) || 
        (quincenaActual[1] !== quincenaFechaSeleccionada[1]) ||
        (Number(quincenaFechaSeleccionada[2]) > Number(quincenaActual[2]))){                
        
          return res
          .status(400)
          .json({ errors: [{ msg: 'La fecha seleccionada no está dentro de la quincena actual' }] });
    }

    
    const Quincena = quincenaActual[3];

    const QuincenaNum = quincenaFechaSeleccionada[0];

    let rangeday = fecharango.slice(0,2);
    let mesrango = fecharango.slice(3,5);
    let aniorango = fecharango.slice(6,10);

    const nombremesrango = quincenaActual[4];

    const fechaHoraServer = fechaHora();
    // [fecha, hora],

    const fechacreacion = fechaHoraServer[0] + ', ' + fechaHoraServer[1];   

    const fechadinamica = fechaHoraServer[0];

    const rangofinal = aniorango + mesrango + rangeday ;

    const user = await User.findById(req.user.id).select('-password');
    
    const historial = user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];

    const capturista = user.username;

    const userid = user._id;

    const email = user.email;        

    const Secretaria = user.secretaria;

    const Subsecretaria = user.subsecretaria;

    const Direcciongeneral = user.direcciongeneral;

    const Direccion = user.direccion;

    const SubDireccion = user.subdireccion;

    const Nivel = user.Nivel;

    /* let userprograma1 = 'NO';
    let userprograma2 = 'NO';
    console.log(req.body.userprograma1, req.body.userprograma2)
    if(req.body.userprograma1 === 'true'){
      userprograma1 = '333';
    }

    if(req.body.userprograma2 === 'true'){
      userprograma2 = 'BA'; 
    } */
    
    const { estrategia, Tipo, Actividad, Rubro, Subrubro} = req.body;      

    const excluir = excluirfunc(Tipo);
    const catalogogeneral = camai(Rubro);

    let Etapa = etapa(Actividad);
    let descclas = descclasividad(Actividad);
    let nomclas = nomclasividad(Actividad);
    let uniclas = unidadMedida(Actividad);  
    let areaclas = ".";
    let temaclas = ".";
    let clasificado = false;  
    
    let { turno} = req.body; 
    if(turno === 'undefined'){
      turno = 'N/A';
    }

    let { sectoreducativo} = req.body; 
    if(sectoreducativo === 'undefined'){
      sectoreducativo = 'N/A';
    }


    let { claveCCT} = req.body; 
    if(claveCCT === 'undefined'){
      claveCCT = 'N/A';
    }

    let { matricula} = req.body; 
    if(matricula === 'undefined'){
      matricula = 0;
    }

    let { Cargo, Email, Telefono} = req.body;

    if(Email === 'undefined'){
      Email = 'N/A';
    }

    if(Telefono === 'undefined'){
      Telefono = 'N/A';
    }

    if((Email === 'undefined') && (Telefono === 'undefined')){
      return res
        .status(400)
        .json({ errors: [{ msg: 'Debes agregar un método de contacto' }] });
    }
    

    let { Calle, Numero, institucion, Contacto, Alcaldia, Colonia, coordx, coordy} = req.body;

    let programa1 = estrategia333(Alcaldia, Colonia);
    let programa2 = barrioadentro(Alcaldia, Colonia);
    let { Asistentes, asistentesmujeres, asistenteshombres } = req.body;

    let { asistentes014, asistentes1518, asistentes1965, asistentes65mas } = req.body;

    let { TemasTratados, Acuerdos, Solicitudes, observaciones, foliosasociados, 
      grupovulnerable } = req.body;
    

    if(foliosasociados === 'undefined'){
      foliosasociados = 'NO';
    }


    if(grupovulnerable === 'undefined'){
      grupovulnerable = 'NO';
    }

    let { actividaddgpd, actividadcdhcdmx, actividadccsjcdmx,
          actividadsdicp, actividadsopaft, actividaducs,
          actividaddgicot, actividaddgcse, actividadddsi,
          actividadsct, actividaddsb, actividadddh, 
          actividadcvm, actividadbva, actividaderum,
          actividaddse, actividadmultiplicadores, actividadalcoholimetro,
          actividadusec, otrasareas
    } = req.body;
    
    if(actividadusec === 'undefined'){
      actividadusec = 'NO';
    } else{
      nomclas = actividadusec.toString();
      areaclas = "USEC";
    }

    if(otrasareas === 'undefined'){
      otrasareas = 'NO';
    } 

    if(actividaddse === 'undefined'){
      actividaddse = 'NO';
    } else{
      nomclas = actividaddse.toString();
      areaclas = "DSE";
    }    

    if(actividadmultiplicadores === 'undefined'){
      actividadmultiplicadores = 'NO';
    } else{
      nomclas = actividadmultiplicadores.toString();
      areaclas = "Multiplicadores";
    }   

    if(actividadalcoholimetro === 'undefined'){
      actividadalcoholimetro = 'NO';
    } else{
      nomclas = actividadalcoholimetro.toString();
      areaclas = "Alcoholimetro";
    } 

    if(actividadcvm === 'undefined'){
      actividadcvm = 'NO';
    } else{
      nomclas = actividadcvm.toString();
      areaclas = "CVM";
    }   

    if(actividadbva === 'undefined'){
      actividadbva = 'NO';
    } else{
      nomclas = actividadbva.toString();
      areaclas = "BVA";
    }   

    if(actividaderum === 'undefined'){
      actividaderum = 'NO';
    } else{
      nomclas = actividaderum.toString();
      areaclas = "DGERUM";
    } 

    if(actividadsct === 'undefined'){
      actividadsct = 'NO';
    } else{
      nomclas = actividadsct.toString();
      areaclas = "SCT";
    }   

    if(actividaddsb === 'undefined'){
      actividaddsb = 'NO';
    } else{
      nomclas = actividaddsb.toString();
      areaclas = "DESyBS";
    }   

    if(actividadddh === 'undefined'){
      actividadddh = 'NO';
    } else{
      nomclas = actividadddh.toString();
      areaclas = "DGDH";
    } 

    if(actividaddgpd === 'undefined'){
      actividaddgpd = 'NO';
    } else{
      nomclas = actividaddgpd.toString();
      areaclas = "DGPD";
    }  
    
    if(actividadcdhcdmx === 'undefined'){
      actividadcdhcdmx = 'NO';
    } else{
      nomclas = actividadcdhcdmx.toString();
      areaclas = "CDHCDMX";
    }   

    if(actividadccsjcdmx === 'undefined'){
      actividadccsjcdmx = 'NO';
    } else{
      nomclas = actividadccsjcdmx.toString();
      areaclas = "CCSJCDMX";
    }   

    if(actividadsdicp === 'undefined'){
      actividadsdicp = 'NO';
    } else{
      nomclas = actividadsdicp.toString();
      areaclas = "SDI";
    }   

    if(actividadsopaft === 'undefined'){
      actividadsopaft = 'NO';
    } else{
      nomclas = actividadsopaft.toString();
      areaclas = "SOPAFT";
    }   

    if(actividaducs === 'undefined'){
      actividaducs = 'NO';
    } else{
      nomclas = actividaducs.toString();
      areaclas = "UCS";
    } 

    if(actividaddgicot === 'undefined'){
      actividaddgicot = 'NO';
    } else{
      nomclas = actividaddgicot.toString();
      areaclas = "DGAIP";
    }   

    if(actividaddgcse === 'undefined'){
      actividaddgcse = 'NO';
    } else{
      nomclas = actividaddgcse.toString();
      areaclas = "DGCSE";
    }   

    if(actividadddsi === 'undefined'){
      actividadddsi = 'NO';
    } else{
      nomclas = actividadddsi.toString();
      areaclas = "DDSI";
    }

    let { Cuadrante, sector} = req.body;

    const { datospersona1, datospersona2, datospersona3, datospersona4,
            datospersona5, datospersona6, datospersona7, datospersona8} = req.body;

    let idpersona1 = "NO";
    let nombrepersona1 = "NO";

    if(datospersona1 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona1);
      idpersona1 = splitIdnombrepersonaDB[0];
      nombrepersona1 = splitIdnombrepersonaDB[1];
    }     
    
    let idpersona2 = "NO";
    let nombrepersona2 = "NO";
    
    if(datospersona2 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona2);
      idpersona2 = splitIdnombrepersonaDB[0];
      nombrepersona2 = splitIdnombrepersonaDB[1];
    }   

    let idpersona3 = "NO";
    let nombrepersona3 = "NO";

    if(datospersona3 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona3);
      idpersona3 = splitIdnombrepersonaDB[0];
      nombrepersona3 = splitIdnombrepersonaDB[1];
    }     
    
    let idpersona4 = "NO";
    let nombrepersona4 = "NO";
    
    if(datospersona4 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona4);
      idpersona4 = splitIdnombrepersonaDB[0];
      nombrepersona4 = splitIdnombrepersonaDB[1];
    }  

    let idpersona5 = "NO";
    let nombrepersona5 = "NO";
    
    if(datospersona5 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona5);
      idpersona5 = splitIdnombrepersonaDB[0];
      nombrepersona5 = splitIdnombrepersonaDB[1];
    }  

    let idpersona6 = "NO";
    let nombrepersona6 = "NO";
    
    if(datospersona6 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona6);
      idpersona6 = splitIdnombrepersonaDB[0];
      nombrepersona6 = splitIdnombrepersonaDB[1];
    }  

    let idpersona7 = "NO";
    let nombrepersona7 = "NO";
    
    if(datospersona7 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona7);
      idpersona7 = splitIdnombrepersonaDB[0];
      nombrepersona7 = splitIdnombrepersonaDB[1];
    }  

    let idpersona8 = "NO";
    let nombrepersona8 = "NO";
    
    if(datospersona8 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona8);
      idpersona8 = splitIdnombrepersonaDB[0];
      nombrepersona8 = splitIdnombrepersonaDB[1];
    }  


    let imgtotal = 0;
    
    const Send = false;

    const validasub = false;
   
    const estadogeneral = "BORRADOR";
    
    const publicodirigido = "Público en general";
    
    try {
      
      let register = new Register({
        historial,
        Send,
        validasub,
        estadogeneral,
        ID,
        capturista,
        userid,
        email,
        Nivel,
        Secretaria,
        Subsecretaria,
        Direcciongeneral,
        Direccion,
        SubDireccion,
        JUD,
        fecharango,
        fechadinamica,
        Quincena,
        QuincenaNum,
        aniorango,
        nombremesrango,
        mesrango,
        fechacreacion,
        rangofinal,
        estrategia,
        Tipo, 
        excluir,
        Actividad,
        Rubro,
        turno, sectoreducativo, claveCCT, matricula,
        Subrubro,
        institucion,         
        grupovulnerable,         
        institucion,         
        Alcaldia,
        Calle, 
        Numero, 
        Colonia, 
        coordx, 
        coordy,   
        Contacto, 
        Cargo, 
        Email,       
        Telefono,
        Asistentes, 
        asistentesmujeres, 
        asistenteshombres,
        asistentes014, 
        asistentes1518, 
        asistentes1965, 
        asistentes65mas,
        TemasTratados,
        Acuerdos,
        Solicitudes,
        observaciones,
        foliosasociados,
        Cuadrante,
        sector,       
        datospersona1, datospersona2, datospersona3, datospersona4,
        datospersona5, datospersona6, datospersona7, datospersona8,
        idpersona1,
        nombrepersona1,
        idpersona2,
        nombrepersona2,   
        idpersona3,
        nombrepersona3,     
        idpersona4,
        nombrepersona4,  
        idpersona5,
        nombrepersona5,  
        idpersona6,
        nombrepersona6,     
        idpersona7,
        nombrepersona7,  
        idpersona8,
        nombrepersona8,        
        
        actividaddgpd, actividadcdhcdmx, actividadccsjcdmx,
        actividadsdicp, actividadsopaft, actividaducs,
        actividaddgicot, actividaddgcse, actividadddsi,
        actividadsct, actividaddsb, actividadddh, 
        actividadcvm, actividadbva, actividaderum,
        actividaddse, actividadmultiplicadores, actividadalcoholimetro,
        actividadusec, otrasareas,

        Etapa, descclas, nomclas, uniclas, areaclas, temaclas, clasificado, publicodirigido,
        imgtotal,

        catalogogeneral,
        programa1,
        programa2,
        //userprograma1,
        //userprograma2
      });

  
      await register.save();      

      res.json({ msg: 'Registro agregado' });

      
    } catch (err) {
      console.error(err.message);
      res.status(500)
        .json({ errors: [{ msg: 'Error en el servidor por conexión a internet' }] });
    }
  }
);

router.post(  
  '/updateregister', auth, upload.array('image', 4),
  //Datos del registro
  //check('FechaSimple', 'Fecha es requerida').notEmpty(),
  //check('JUD', 'JUD/SUB es requerida').notEmpty(), 
  //Datos de la actividad
  check('id', 'Identificador requerido').notEmpty(),
  check('estrategia', 'Estretegia requerida').notEmpty(),
  check('Tipo', 'Tipo requerido').notEmpty(),
  check('Actividad', 'Actividad requerida').notEmpty(),
  check('Rubro', 'Rubro requerido').notEmpty(),
  check('Subrubro', 'Subrubro requerido').notEmpty(),
  check('Solicitudes', 'N° de solicitudes requerido').notEmpty(),
  check('TemasTratados', 'Temas tratados requeridos').notEmpty(),
  check('Acuerdos', 'Acuerdos requeridos').notEmpty(),
  check('observaciones', 'Descripción requerido').notEmpty(),
  //check('publicodirigido', 'Descripción requerido').notEmpty(),

  check('institucion', 'Nombre de institución requerido').notEmpty(),
  check('Calle', 'Calle requerida').notEmpty(),
  check('Numero','N° requerido').notEmpty(),

  check('Alcaldia', 'Alcaldía requerida').notEmpty(), 
  check('Colonia', 'Colonia requerida').notEmpty(),
  check('Cuadrante','Cuadrante requerido').notEmpty(),
  check('sector','Sector requerido').notEmpty(),
  check('coordx','Coordenada x requerida').notEmpty(),
  check('coordy','Coordenada y requerida').notEmpty(),

  check('Contacto','Contacto requerido').notEmpty(),
  check('Cargo','Cargo requerido').notEmpty(),

  check('asistentesmujeres','N° de Asistentes muejeres requerido').notEmpty(),
  check('asistenteshombres','N° de Asistentes hombres requerido').notEmpty(),
  check('Asistentes','N° de Asistentes total requerido').notEmpty(),
  check('asistentes014','N° de Asistentes 0-14 requerido').notEmpty(),
  check('asistentes1518','N° de Asistentes 15-20 requerido').notEmpty(),
  check('asistentes1965','N° de Asistentes 21-65 requerido').notEmpty(),
  check('asistentes65mas','N° de Asistentes 65 y más requerido').notEmpty(), 
  
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  /*   const { JUD, FechaSimple} = req.body;
      let consecutive = await Consecutive.findOne({ jud: JUD });

      if (!consecutive) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No se ha establecido el consecutivos de esta área' }] });
      }

const user = await User.findById(req.params.id);
      let consecutivo = consecutive.consecutivo + 1;
      
      await Consecutive.findOneAndUpdate({ jud: JUD },
        {$set: {consecutivo: consecutivo}}
      );

      switch (consecutivo.toString().length) {
        case 1:
          consecutivo = "000" + consecutivo.toString();
          break;
          case 2:
            consecutivo = "00" + consecutivo.toString();
            break;
            case 3:
              consecutivo = "0" + consecutivo.toString();
            break;
        default:
          consecutivo = consecutivo.toString();             
          break;
      }

      const ID = JUD + '-' + FechaSimple + '-' +  consecutivo; 
  */

    //Revisar si existe el registro  
    const {id} = req.body;
    const registerexist = await Register.findById({ _id: id });

    if (!registerexist) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No se localizó el registro' }] });
    }

    //const fecharango = FechaSimple;

    //Verificar si la quincena seleccionada coincide con la quincena del server
    //const quincenaActual = quincenaNumActual(); 
    //[QuincenaNumero, año, dia, QuincenaNombre, NombreMes, numeroMes]

    //const quincenaFechaSeleccionada = obtenerQuincenaConFecha(fecharango); 
    // [QuincenaNumero, año, dia];

    /* if( (quincenaActual[0] !== quincenaFechaSeleccionada[0]) || 
        (quincenaActual[1] !== quincenaFechaSeleccionada[1]) ||
        (Number(quincenaFechaSeleccionada[2]) > Number(quincenaActual[2]))){                
        
          return res
          .status(400)
          .json({ errors: [{ msg: 'La fecha seleccionada no está dentro de la quincena actual' }] });
    } */

    //const Quincena = quincenaActual[3];

    //const QuincenaNum = quincenaFechaSeleccionada[0];

    //const aniorango = quincenaFechaSeleccionada[1];

    //const nombremesrango = quincenaActual[4];

    //const mesrango = quincenaActual[5];

    const fechaHoraServer = fechaHora();
    // [fecha, hora],

    //const fechacreacion = fechaHoraServer[0] + ', ' + fechaHoraServer[1];   
    

    //const rangofinal = aniorango + mesrango + quincenaFechaSeleccionada[2] ;

    const user = await User.findById(req.user.id).select('-password');
    const historial = registerexist.historial + ', ' + user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];
    
    //const capturista = user.username;

    //const userid = user._id;

    //const email = user.email;        

    //const Secretaria = user.secretaria;

    //const Subsecretaria = user.subsecretaria;

    //const Direcciongeneral = user.direcciongeneral;

    //const Direccion = user.direccion;

    //const SubDireccion = user.subdireccion;

    //const Nivel = user.Nivel;
    
    const { estrategia, Tipo, Actividad, Rubro, Subrubro} = req.body;   
    const excluir = excluirfunc(Tipo);
    const catalogogeneral = camai(Rubro);

    let clasificado = false;  
    
    let { turno} = req.body; 
    if(turno === 'undefined'){
      turno = 'N/A';
    }

    let { sectoreducativo} = req.body; 
    if(sectoreducativo === 'undefined'){
      sectoreducativo = 'N/A';
    }

    let { claveCCT} = req.body; 
    if(claveCCT === 'undefined'){
      claveCCT = 'N/A';
    }

    let { matricula} = req.body; 
    if(matricula === 'undefined'){
      matricula = 0;
    }

    let { Cargo, Email, Telefono} = req.body;

    if(Email === 'undefined'){
      Email = 'N/A';
    }

    if(Telefono === 'undefined'){
      Telefono = 'N/A';
    }

    if((Email === 'undefined') && (Telefono === 'undefined')){
      return res
        .status(400)
        .json({ errors: [{ msg: 'Debes agregar un método de contacto' }] });
    }
    

    let { Calle, Numero, institucion, Contacto, Alcaldia, Colonia, coordx, coordy} = req.body;

    let programa1 = estrategia333(Alcaldia, Colonia);
    let programa2 = barrioadentro(Alcaldia, Colonia);

    let { Asistentes, asistentesmujeres, asistenteshombres } = req.body;

    let { asistentes014, asistentes1518, asistentes1965, asistentes65mas } = req.body;

    let { TemasTratados, Acuerdos, Solicitudes, observaciones, foliosasociados, 
      grupovulnerable } = req.body;

    if(foliosasociados === 'undefined'){
      foliosasociados = 'NO';
    }

    if(grupovulnerable === 'undefined'){
      grupovulnerable = 'NO';
    }

    let { actividaddgpd, actividadcdhcdmx, actividadccsjcdmx,
          actividadsdicp, actividadsopaft, actividaducs,
          actividaddgicot, actividaddgcse, actividadddsi,
          actividadsct, actividaddsb, actividadddh, 
          actividadcvm, actividadbva, actividaderum,
          actividaddse, actividadmultiplicadores, actividadalcoholimetro,
          actividadusec, otrasareas
    } = req.body;
    
    if(actividadusec === 'undefined'){
      actividadusec = 'NO';
    } 

    if(otrasareas === 'undefined'){
      otrasareas = 'NO';
    } 

    if(actividaddse === 'undefined'){
      actividaddse = 'NO';
    } 

    if(actividadmultiplicadores === 'undefined'){
      actividadmultiplicadores = 'NO';
    } 

    if(actividadalcoholimetro === 'undefined'){
      actividadalcoholimetro = 'NO';
    } 

    if(actividadcvm === 'undefined'){
      actividadcvm = 'NO';
    } 

    if(actividadbva === 'undefined'){
      actividadbva = 'NO';
    }   

    if(actividaderum === 'undefined'){
      actividaderum = 'NO';
    } 

    if(actividadsct === 'undefined'){
      actividadsct = 'NO';
    } 

    if(actividaddsb === 'undefined'){
      actividaddsb = 'NO';
    }   

    if(actividadddh === 'undefined'){
      actividadddh = 'NO';
    } 

    if(actividaddgpd === 'undefined'){
      actividaddgpd = 'NO';
    } 
    
    if(actividadcdhcdmx === 'undefined'){
      actividadcdhcdmx = 'NO';
    } 

    if(actividadccsjcdmx === 'undefined'){
      actividadccsjcdmx = 'NO';
    } 

    if(actividadsdicp === 'undefined'){
      actividadsdicp = 'NO';
    } 

    if(actividadsopaft === 'undefined'){
      actividadsopaft = 'NO';
    } 

    if(actividaducs === 'undefined'){
      actividaducs = 'NO';
    } 

    if(actividaddgicot === 'undefined'){
      actividaddgicot = 'NO';
    }  

    if(actividaddgcse === 'undefined'){
      actividaddgcse = 'NO';
    }

    if(actividadddsi === 'undefined'){
      actividadddsi = 'NO';
    } 

    let { Cuadrante, sector} = req.body;

    const { datospersona1, datospersona2, datospersona3, datospersona4,
            datospersona5, datospersona6, datospersona7, datospersona8} = req.body;

    let idpersona1 = "NO";
    let nombrepersona1 = "NO";

    if(datospersona1 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona1);
      idpersona1 = splitIdnombrepersonaDB[0];
      nombrepersona1 = splitIdnombrepersonaDB[1];
    }     
    
    let idpersona2 = "NO";
    let nombrepersona2 = "NO";
    
    if(datospersona2 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona2);
      idpersona2 = splitIdnombrepersonaDB[0];
      nombrepersona2 = splitIdnombrepersonaDB[1];
    }   

    let idpersona3 = "NO";
    let nombrepersona3 = "NO";

    if(datospersona3 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona3);
      idpersona3 = splitIdnombrepersonaDB[0];
      nombrepersona3 = splitIdnombrepersonaDB[1];
    }     
    
    let idpersona4 = "NO";
    let nombrepersona4 = "NO";
    
    if(datospersona4 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona4);
      idpersona4 = splitIdnombrepersonaDB[0];
      nombrepersona4 = splitIdnombrepersonaDB[1];
    }  

    let idpersona5 = "NO";
    let nombrepersona5 = "NO";
    
    if(datospersona5 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona5);
      idpersona5 = splitIdnombrepersonaDB[0];
      nombrepersona5 = splitIdnombrepersonaDB[1];
    }  

    let idpersona6 = "NO";
    let nombrepersona6 = "NO";
    
    if(datospersona6 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona6);
      idpersona6 = splitIdnombrepersonaDB[0];
      nombrepersona6 = splitIdnombrepersonaDB[1];
    }  

    let idpersona7 = "NO";
    let nombrepersona7 = "NO";
    
    if(datospersona7 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona7);
      idpersona7 = splitIdnombrepersonaDB[0];
      nombrepersona7 = splitIdnombrepersonaDB[1];
    }  

    let idpersona8 = "NO";
    let nombrepersona8 = "NO";
    
    if(datospersona8 !== 'undefined') {
      let splitIdnombrepersonaDB = splitIdnombrepersona(datospersona8);
      idpersona8 = splitIdnombrepersonaDB[0];
      nombrepersona8 = splitIdnombrepersonaDB[1];
    }  


    let imgtotal = 0; 
    
    try {
      
      let updateregisterdata = {
        historial,  
        estrategia,     
        Tipo, 
        excluir,
        catalogogeneral,
        Actividad,
        Rubro,
        turno,
        sectoreducativo,
        claveCCT, 
        matricula,
        Subrubro,
        institucion,         
        grupovulnerable,       
        institucion,         
        Alcaldia,
        Calle, 
        Numero, 
        Colonia, 
        coordx, 
        coordy,   
        Contacto, 
        Cargo, 
        Email,       
        Telefono,
        Asistentes, 
        asistentesmujeres, 
        asistenteshombres,
        asistentes014, 
        asistentes1518, 
        asistentes1965, 
        asistentes65mas,
        TemasTratados,
        Acuerdos,
        Solicitudes,
        observaciones,
        foliosasociados,
        Cuadrante,
        sector,       
        datospersona1, datospersona2, datospersona3, datospersona4,
        datospersona5, datospersona6, datospersona7, datospersona8,
        idpersona1,
        nombrepersona1,
        idpersona2,
        nombrepersona2,   
        idpersona3,
        nombrepersona3,     
        idpersona4,
        nombrepersona4,  
        idpersona5,
        nombrepersona5,  
        idpersona6,
        nombrepersona6,     
        idpersona7,
        nombrepersona7,  
        idpersona8,
        nombrepersona8,        
        
        actividaddgpd, actividadcdhcdmx, actividadccsjcdmx,
        actividadsdicp, actividadsopaft, actividaducs,
        actividaddgicot, actividaddgcse, actividadddsi,
        actividadsct, actividaddsb, actividadddh, 
        actividadcvm, actividadbva, actividaderum,
        actividaddse, actividadmultiplicadores, actividadalcoholimetro,
        actividadusec, otrasareas,

        clasificado,
        imgtotal,

        catalogogeneral,
        programa1,
        programa2
      };      

      
      let registerdoc = await Register.findOneAndUpdate({ _id: id },
        { $set: updateregisterdata });
     
      return res.json({ msg: registerdoc.ID + ' actualizado' });
      
    } catch (err) {
      console.error(err.message);
      res.status(500)
        .json({ errors: [{ msg: 'Error en el servidor por conexión a internet' }] });
    }
  }
);

router.delete('/deleteregister/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    //Buscar el registro 
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    //Se envia correo para mantener historial de eliminación para aclaraciones
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
      }
    });
    
    mailOptions = {
      from: '"SIGVI noreply" spcypd.dgpc.sigvi@gmail.com',                            
      /* to: 'participacionciudadana.@gmail.com', */
      to: rocess.env.ALERT_EMAIL,
      subject: 'Eliminación de registro',
      // HTML body
      html:"<p>"+user.email+" "+register.ID+" "+register.Rubro+"</p>" +
      `<p><i><b>noreply:</b> esto es un mensaje automático</i></p>
      <p><i>No es necesario contestar este correo</i></p>`,

    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    await register.remove();    
    
    res.json({ msg: register.ID + ' eliminado' });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'Error de conexión con el servidor' });
  }
});

router.post('/sendregister/:id', [auth, checkObjectId('id')], async (req, res) => {

  try {
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const Send = true;
    let estadogeneral = 'ENVIADO';

    const fechaHoraServer = fechaHora();
    
    const fechadinamica = fechaHoraServer[0];
    const Enviado = fechaHoraServer[0];    
    
    let dataRegisterSend;
    let msg;
    if(Number(user.Nivel) >= 2){
      msg = " enviado";
      dataRegisterSend = {
        Send,
        estadogeneral,
        fechadinamica,
        Enviado
      };
    } else{
      msg = " validado";
      estadogeneral = "VALIDADO";
      let validasubnombre = user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];
      let validasub = true; 
      
      dataRegisterSend = {
        Send,
        estadogeneral,
        fechadinamica,
        validasubnombre,
        Enviado,
        validasub
      };
    }
    let registerdoc = await Register.findOneAndUpdate({ _id: req.params.id },
      { $set: dataRegisterSend });

    if(Number(user.Nivel) > 2){
      let subs = await User.find({ subdireccion: user.subdireccion, mirror: false});
      if(subs){
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
          }
        });
  
        var mailOptions = {};
  
        //aquí un for 
        for(var sub in subs) {
  
          mailOptions = {
           /*  from: '"SIGVI noreply" sigvi.dgpc@gmail.com',                            
            to: sub.email, */
            from: '"SIGVI noreply" spcypd.dgpc.sigvi@gmail.com',                            
            /* to: 'participacionciudadana.@gmail.com', */
            to: process.env.ALERT_EMAIL,
            subject: user.username + ' ha enviado registro/s a validación',
            // HTML body
            html:"<p>"+user.username+" ha enviado 1"+" registro a validación."+"</p>" +
            `<p><i><b>noreply:</b> esto es un mensaje automático</i></p>
            <p><i>No es necesario contestar este correo</i></p>`,
          };
  
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
      }
    }   

    res.json({ msg: register.ID + msg });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/cancelregister/:id', [auth, checkObjectId('id')], async (req, res) => {

  try {
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const fechaHoraServer = fechaHora();

    const emailcancela = user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];
    const estadogeneral = 'CANCELADO';
    const validasub = false;
    
    const dataRegisterSend = {
      emailcancela,
      estadogeneral,
      validasub
    };
    let registerdoc = await Register.findOneAndUpdate({ _id: req.params.id },
      { $set: dataRegisterSend });

    res.json({ msg: register.ID + ' cancelado' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/send', auth, async (req, res) => {

  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  let registersToSend;
  let msg;
  const fechaHoraServer = fechaHora();

  //dividir por numero 
  if((Number(user.Nivel) === 4) && (user.jud !== user.subdireccion)){
    msg = " enviado/s";
    let query = {
      $and: [{fechadinamica: fechaHoraServer[0], 
        email: user.email, },
        { $or: [{ estadogeneral: "APROBADO" },
                { estadogeneral: "APROBADO" }] }]
      };
    registersToSend = await Register.updateMany(query, 
        {  Send: true, Enviado: fechaHoraServer[0], estadogeneral: 'ENVIADO' }
    );
  } else if(Number(user.Nivel) === 3){
    msg = " enviado/s";
    let query = {
      $and: [{fechadinamica: fechaHoraServer[0], 
        email: user.email, },
        { $or: [{ estadogeneral: "BORRADOR" },
                { estadogeneral: "BORRADOR" }] }]
      };
    registersToSend = await Register.updateMany(query, 
        {  Send: true, Enviado: fechaHoraServer[0], estadogeneral: 'ENVIADO' }
    );
  } else {

    const validasubnombre = user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];

    msg = " validado/s";
    registersToSend = await Register.updateMany({fechadinamica: fechaHoraServer[0], 
      email: user.email, estadogeneral: 'BORRADOR' }, 
        {  Send: true, validasub: true,  
          Enviado: fechaHoraServer[0], 
          estadogeneral: 'VALIDADO', 
          validasubnombre: validasubnombre }
    );
  }  
  
  if(registersToSend.matchedCount === 0){
    return res.status(404).json({ msg: 'No hay registros para enviar' });
  }

  if(Number(user.Nivel) > 2){
    let subs = await User.find({ subdireccion: user.subdireccion, espejo: 'NO', Nivel: 2});
    if(subs){
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD
        }
      });

      let mailOptions = {};

      //aquí un for 
      subs.forEach(function (sub) {
        console.log(sub)
        mailOptions = {
          /* from: '"SIGVI noreply" sigvi.dgpc@gmail.com',                            
          to: sub.email, */
          from: '"SIGVI noreply" spcypd.dgpc.sigvi@gmail.com',                            
          /* to: 'participacionciudadana.@gmail.com', */
          to: process.env.ALERT_EMAIL,
          subject: user.username + ' ha enviado registro/s para su revisión',
          // HTML body
          html:"<p>"+user.username+" ha enviado "+registersToSend.matchedCount.toString()+" registro/s a revisión."+"</p>" +
          `<p><i><b>noreply:</b> esto es un mensaje automático</i></p>
          <p><i>No es necesario contestar este correo</i></p>`,
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(mailOptions);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      });
    }
  }   

  res.json({ msg: registersToSend.matchedCount + msg });
  
});

router.post('/review', auth, async (req, res) => {

  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  let registersToReview;

  let msg;

  const fechaHoraServer = fechaHora();

  if(Number(user.Nivel) === 4){
    msg = " enviado(s) a revisión";
    let query = {
      $and: [{fechadinamica: fechaHoraServer[0], 
        email: user.email, },
        { $or: [{ estadogeneral: "BORRADOR" },
                { estadogeneral: "BORRADOR" }] }]
      };
    registersToReview = await Register.updateMany(query, 
        { estadogeneral: 'REVISAR' }
    );
  } 
  
  if(registersToReview.matchedCount === 0){
    return res.status(404).json({ msg: 'No hay registros para enviar a revisión' });
  }

  if(Number(user.Nivel) === 4){
    
    let juds = await User.find({ jud: user.jud, Nivel: 3, espejo: 'NO'});
    //console.log(juds)
    if(juds){
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD
        }
      });

      let mailOptions = {};
      console.log(juds)
      //aquí un for 
      juds.forEach(function (jud) {
        console.log(jud)
        mailOptions = {
          /* from: '"SIGVI noreply" sigvi.dgpc@gmail.com',                            
          to: jud.email, */
          from: '"SIGVI noreply" spcypd.dgpc.sigvi@gmail.com',                            
          /* to: 'participacionciudadana.@gmail.com', */
          to: process.env.ALERT_EMAIL,
          subject: user.username + ' ha enviado registro/s para su revisión',
          // HTML body
          html:"<p>"+user.username+" ha enviado "+registersToReview.matchedCount.toString()+" registro/s a revisión."+"</p>" +
          `<p><i><b>noreply:</b> esto es un mensaje automático</i></p>
          <p><i>No es necesario contestar este correo</i></p>`,
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(mailOptions);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      });

    }
  }   

  res.json({ msg: registersToReview.matchedCount + msg });
  
});

router.post('/validateregister/:id', [auth, checkObjectId('id')], async (req, res) => {

  try {
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const fechaHoraServer = fechaHora()

    const validasubnombre = user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];
    const estadogeneral = 'VALIDADO';
    const validasub= true;

    const dataRegisterVal = {
        validasubnombre,
        estadogeneral,
        validasub
    };
    let registerdoc = await Register.findOneAndUpdate({ _id: req.params.id },
      { $set: dataRegisterVal });

    res.json({ msg: register.ID + ' validado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/query', auth, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    let query;

    let rangedayI = req.body.FechaInicial.slice(0,2);
    let rangemonthI = req.body.FechaInicial.slice(3,5);
    let rangeyearI = req.body.FechaInicial.slice(6,10);
    let RangeI = rangeyearI + rangemonthI + rangedayI;

    let rangedayF = req.body.fecharango.slice(0,2);
    let rangemonthF = req.body.fecharango.slice(3,5);
    let rangeyearF = req.body.fecharango.slice(6,10);
    let RangeF = rangeyearF + rangemonthF + rangedayF;

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
    let montharrayI = rangemonthI.split('')

    if(montharrayI[0] == 0){
      montharrayI = montharrayI[1]
    } else{
      montharrayI = rangemonthI
    }

    let montharrayF = rangemonthF.split('')

    if(montharrayF[0] == 0){
      montharrayF = montharrayF[1]
    } else{
      montharrayF = rangemonthF
    }
   
    const firstDate = new Date(rangeyearI, montharrayI, rangedayI);
    const secondDate = new Date(rangeyearF, montharrayF, rangedayF);
    
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));   
    if(Number(user.Nivel) === 0){

      if(req.body.informativas.toString() === 'true'){
        
        query = {
          $and: [{Direcciongeneral: user.direcciongeneral, estadogeneral: "VALIDADO" },
                  {rangofinal: { $gte: RangeI, $lte: RangeF }}
          ]
        };

      } else{

        query = {
          $and: [{Direcciongeneral: user.direcciongeneral, excluir: false, estadogeneral: "VALIDADO",
            validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }},
          ]
        };

      }
    }  else  if(Number(user.Nivel) === 1){
      query = {
      $and: [{Direcciongeneral: user.direcciongeneral, Direccion: user.direccion, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }},
      ]
      };
    }  else if(Number(user.Nivel) === 2){
      query = {
      $and: [{Direcciongeneral: user.direcciongeneral, SubDireccion: user.subdireccion, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }},
      ]
     };
    }  else if(Number(user.Nivel) === 3){
      query = {$and: [ {Direcciongeneral: user.direcciongeneral, JUD: user.jud, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }}]};
    } else if(Number(user.Nivel) === 4){
        query = {$and: [ {Direcciongeneral: user.direcciongeneral, email: user.email, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }}]};
    }   
    
    if(RangeF < RangeI){
      return res.status(404).json({ msg: 'La fecha inicial debe ser menor o igual que la fecha final' });
    } else if(Number(diffDays) <= 365){      
      const registers = await Register.find(query).sort({rangofinal: 1});
      res.json({ registers: registers, msg: 'Consulta: ' +  req.body.FechaInicial + ' - ' + req.body.fecharango});    
      
    } else{
      return res.status(404).json({ msg: 'El rango de fechas es mayor a 365 días' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/goals',  auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    let month = (new Date().getMonth() + 1).toString();
    let year = (new Date().getFullYear()).toString();
    if (month.length == 1) {
      month = '0' + month;
    }

    let nombreMes;
    switch (Number(month)) {
      case 01:
        nombreMes = 'Enero'
      break;
      case 02:
        nombreMes = 'Febrero'
      break;
      case 03:
        nombreMes = 'Marzo'
      break;
      case 04:
        nombreMes = 'Abril'
      break;
      case 05:
        nombreMes = 'Mayo'
      break;
      case 06:
        nombreMes = 'Junio'
      break;
      case 07:
        nombreMes = 'Julio'
      break;
      case 08:
        nombreMes = 'Agosto'
      break;
      case 09:
        nombreMes = 'Septiembre'
      break;
      case 10:
        nombreMes = 'Octubre'
      break;
      case 11:
        nombreMes = 'Noviembre'
      break;
      case 12:
        nombreMes = 'Diciembre'
      break;
      default:
        nombreMes = 'N/A'
        break;
    }

    const query = {
      $and: [{Direcciongeneral: user.direcciongeneral, excluir: false, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{mesrango: month, aniorango: year},
      ]
    }
  
    let group;

    if(user.direccion === "DGPC"){
      group = { _id: "$Rubro", count: { $sum: 1 }, meta: { $sum: 1 } }
    } else {
      group = {
        _id: { Direccion: "$Direccion", Rubro: "$Rubro", Mes: "$mesrango" },
        count: { $sum: 1 }, meta: { $sum: 1 }, Rubro: { $first: "$Rubro" },
        Direccion: { $first: "$Direccion" }
      }
    }

    const registers = await Register.aggregate([ //Aquí lo abro
      {
        $match: query
      },
      {
        $group: 
          group
        
      },
      {
        $sort: { "Rubro": -1 }
      },]);

      let  metasMes;
      if (user.direccion == "DVC") {
        metasMes = metasDVC(month);
      } else if (user.direccion == "DCIyT") {
        metasMes = metasDCIyT(month);
      } else {
        metasMes = metas(month);
      }

      let anothersregisters = [];

      if(user.direccion == "DGPC"){
        for (option = 0; option < metasMes.length; option++) {
          let finded = false;
          registers.forEach(function (doc) {
            let splited = metasMes[option].split("|")
            console.log(doc._id)
            if (splited[0] === doc._id) {
              doc.meta = Number(splited[1]);
              finded = true;
              anothersregisters.push({
                Rubro: splited[0], "count": doc.count, "meta": Number(splited[1]), "Direccion": user.Direccion, "Mes":month 
              });
            }
          });


          if (finded == false) {
            let splited = metasMes[option].split("|");

            anothersregisters.push({
              Rubro: splited[0], "count": 0, "meta": Number(splited[1]), "Direccion": user.direccion, "Mes": month 
            });
          }
        };
        
      } else{
        for (option = 0; option < metasMes.length; option++) {
          let finded = false;
          registers.forEach(function (doc) {
            let splited = metasMes[option].split("|")          
            if (splited[0] === doc._id.Rubro) {
              doc.meta = Number(splited[1]);
              finded = true;
              /* registers.push({
                "_id": splited[0], "count": doc.count, "meta": Number(splited[1]),
                Rubro: splited[0], metacero: "0"
              }); */
              if(doc.Direccion === user.direccion){
                anothersregisters.push({
                  Rubro: splited[0], "count": doc.count, "meta": Number(splited[1]), "Direccion": doc.Direccion, "Mes":month 
                });
              }
              if((doc.Direccion !== user.direccion) && (doc._id.Rubro === 'Ferias y Jornadas de seguridad comunitaria')){
                anothersregisters.push({
                  Rubro: splited[0], "count": doc.count, "meta": Number(splited[1]), "Direccion": doc._id.Direccion, "Mes":month 
                });
              }
            }          
          });
          
          if (finded === false) {          
            let splited = metasMes[option].split("|");
            /* registers.push({
              "_id": splited[0], "count": 0, "meta": Number(splited[1]),
              Rubro: splited[0], metacero: "0"
            }); */
            anothersregisters.push({
              Rubro: splited[0], "count": 0, "meta": Number(splited[1]), "Direccion": user.direccion, "Mes": month 
            });
          }
        };
      }

            
      res.json({ registers: anothersregisters, msg: 'Metas: ' + nombreMes + ' ' + year});    

});

router.post('/goals',  auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }
  let month = req.body.Mes;
  let year = (new Date().getFullYear()).toString();
  if (Number(month.length) == 1) {
    month = '0' + month;
  }

  let nombreMes;
  switch (Number(month)) {
    case 01:
      nombreMes = 'Enero'
    break;
    case 02:
      nombreMes = 'Febrero'
    break;
    case 03:
      nombreMes = 'Marzo'
    break;
    case 04:
      nombreMes = 'Abril'
    break;
    case 05:
      nombreMes = 'Mayo'
    break;
    case 06:
      nombreMes = 'Junio'
    break;
    case 07:
      nombreMes = 'Julio'
    break;
    case 08:
      nombreMes = 'Agosto'
    break;
    case 09:
      nombreMes = 'Septiembre'
    break;
    case 10:
      nombreMes = 'Octubre'
    break;
    case 11:
      nombreMes = 'Noviembre'
    break;
    case 12:
      nombreMes = 'Diciembre'
    break;
    default:
      nombreMes = 'N/A'
      break;
  }
 console.log('check')
  const query = {Direcciongeneral: user.direcciongeneral, excluir: false, estadogeneral: "VALIDADO",
      validasub: true, Send: true, mesrango: month, aniorango: year }

  let group;

  if(user.direccion === "DGPC"){
    group = { _id: "$Rubro", count: { $sum: 1 }, meta: { $sum: 1 } }
  } else {
    group = {
      _id: { Direccion: "$Direccion", Rubro: "$Rubro", Mes: "$mesrango" },
      count: { $sum: 1 }, meta: { $sum: 1 }, Rubro: { $first: "$Rubro" },
      Direccion: { $first: "$Direccion" }
    }
  }

  const registers = await Register.aggregate([ //Aquí lo abro
    {
      $match: query
    },
    {
      $group: group
    },
    {
      $sort: { "Rubro": -1 }
    },]);

    let  metasMes;
    if (user.direccion == "DVC") {
      metasMes = metasDVC(month);
    } else if (user.direccion == "DCIyT") {
      metasMes = metasDCIyT(month);
    } else {
      metasMes = metas(month);
    }

    let anothersregisters = [];

      if(user.direccion == "DGPC"){
        for (option = 0; option < metasMes.length; option++) {
          let finded = false;
          registers.forEach(function (doc) {
            let splited = metasMes[option].split("|")
            console.log(doc._id)
            if (splited[0] === doc._id) {
              doc.meta = Number(splited[1]);
              finded = true;
              anothersregisters.push({
                Rubro: splited[0], "count": doc.count, "meta": Number(splited[1]), "Direccion": user.Direccion, "Mes":month 
              });
            }
          });


          if (finded == false) {
            let splited = metasMes[option].split("|");

            anothersregisters.push({
              Rubro: splited[0], "count": 0, "meta": Number(splited[1]), "Direccion": user.direccion, "Mes": month 
            });
          }
        };
        
      } else{
        for (option = 0; option < metasMes.length; option++) {
          let finded = false;
          registers.forEach(function (doc) {
            let splited = metasMes[option].split("|")          
            if (splited[0] === doc._id.Rubro) {
              doc.meta = Number(splited[1]);
              finded = true;
              /* registers.push({
                "_id": splited[0], "count": doc.count, "meta": Number(splited[1]),
                Rubro: splited[0], metacero: "0"
              }); */
              if(doc.Direccion === user.direccion){
                anothersregisters.push({
                  Rubro: splited[0], "count": doc.count, "meta": Number(splited[1]), "Direccion": doc.Direccion, "Mes":month 
                });
              }
              if((doc.Direccion !== user.direccion) && (doc._id.Rubro === 'Ferias y Jornadas de seguridad comunitaria')){
                anothersregisters.push({
                  Rubro: splited[0], "count": doc.count, "meta": Number(splited[1]), "Direccion": doc._id.Direccion, "Mes":month 
                });
              }
            }          
          });
          
          if (finded === false) {          
            let splited = metasMes[option].split("|");
            /* registers.push({
              "_id": splited[0], "count": 0, "meta": Number(splited[1]),
              Rubro: splited[0], metacero: "0"
            }); */
            anothersregisters.push({
              Rubro: splited[0], "count": 0, "meta": Number(splited[1]), "Direccion": user.direccion, "Mes": month 
            });
          }
        };
      }
      res.json({ registers: anothersregisters, msg: 'Metas: ' + nombreMes + ' ' + year});  

});


router.post('/queryedit', auth, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    let query;

    let rangeday = req.body.Fecha.slice(0,2);
    let rangemonth = req.body.Fecha.slice(3,5);
    let rangeyear = req.body.Fecha.slice(6,10);
    let Range = rangeyear + rangemonth + rangeday;
    if(Number(user.Nivel) === 0){
      query = {
      $and: [{Direcciongeneral: user.direcciongeneral,
        rangofinal: Range },
        { $or: [{ estadogeneral: "VALIDADO" },
                { estadogeneral: "CANCELADO" }] }]
      };
    } else if(Number(user.Nivel) === 1){
        query = {
        $and: [{Direcciongeneral: user.direcciongeneral, Direccion: user.direccion,
          validasub: true, Send: true, rangofinal: Range, estadogeneral: "VALIDADO"},
        ]
        };
    } 
    const registers = await Register.find(query).sort({rangofinal: 1});
    res.json({ registers: registers, msg: 'Consulta: ' +  req.body.Fecha});    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/returnregister/:id', [auth, checkObjectId('id')], async (req, res) => {

  try {
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const fechaHoraServer = fechaHora();
    
    const fechadinamica = fechaHoraServer[0];

    const estadogeneral = 'ENVIADO';
    const validasub= false;

    const dataRegisterVal = {
        fechadinamica,
        estadogeneral,
        validasub
    };
    let registerdoc = await Register.findOneAndUpdate({ _id: req.params.id },
      { $set: dataRegisterVal });

    res.json({ msg: register.ID + '  regresado a subdirección para validación' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/queryfull', auth, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    const { FechaInicial, fecharango } = req.body;
    let query;

    let rangedayI =   FechaInicial.slice(0,2);
    let rangemonthI = FechaInicial.slice(3,5);
    let rangeyearI =  FechaInicial.slice(6,10);
    let RangeI = rangeyearI + rangemonthI + rangedayI;

    let rangedayF =   fecharango.slice(0,2);
    let rangemonthF = fecharango.slice(3,5);
    let rangeyearF =  fecharango.slice(6,10);
    let RangeF = rangeyearF + rangemonthF + rangedayF;

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
    let montharrayI = rangemonthI.split('')

    if(montharrayI[0] == 0){
      montharrayI = montharrayI[1]
    } else{
      montharrayI = rangemonthI
    }

    let montharrayF = rangemonthF.split('')

    if(montharrayF[0] == 0){
      montharrayF = montharrayF[1]
    } else{
      montharrayF = rangemonthF
    }
   
    const firstDate = new Date(rangeyearI, montharrayI, rangedayI);
    const secondDate = new Date(rangeyearF, montharrayF, rangedayF);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));   
    if(Number(user.Nivel) === 0){
      query = {
        $and: [{Direcciongeneral: user.direcciongeneral, estadogeneral: "VALIDADO" },
                {rangofinal: { $gte: RangeI, $lte: RangeF }}
        ]
      };
    } else {
        query = {};
    }   
    if(RangeF < RangeI){
      return res.status(404).json({ msg: 'La fecha inicial debe ser menor o igual que la fecha final' });
    } else if(Number(diffDays) <= 365){      
      const registers = await Register.find(query).sort({rangofinal: 1});
      res.json({ registers: registers, msg: 'Consulta: ' +  FechaInicial + ' - ' + fecharango});    
      
    } else{
      return res.status(404).json({ msg: 'El rango de fechas es mayor a 365 días' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Clasificación
router.get('/classify',  auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }
  const quincenaActual = quincenaNumActual(); 
  //[QuincenaNumero, año, dia, QuincenaNombre, NombreMes, numeroMes]

  const QuincenaNum = quincenaActual[0];

  const year = (new Date().getFullYear()).toString();

  const query = {
    QuincenaNum: QuincenaNum, clasificado: false,
    Direcciongeneral: user.direcciongeneral, estadogeneral: "VALIDADO",
    validasub: true, Send: true, aniorango: year
  }
  
  const registers = await Register.find(query).sort({rangofinal: 1});

    res.json({ registers: registers, datosQuincena: quincenaActual,
      msg: quincenaActual[3]}); 

  }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});


router.post('/classify',  auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }
  let QuincenaNum = req.body.QuincenaNum.toString();;
  let year = req.body.Year.toString();

  const query = {
    QuincenaNum: QuincenaNum, clasificado: false,
    Direcciongeneral: user.direcciongeneral, estadogeneral: "VALIDADO",
    validasub: true, Send: true, aniorango: year
  }
  
  const registers = await Register.find(query).sort({rangofinal: 1});
  let outputmsg = "Sin registros";
  if(registers[0]){
    outputmsg = registers[0].Quincena
  }
    res.json({ registers: registers, 
      msg: outputmsg}); 

  }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

router.post('/classifyOne',  auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  const register = await Register.findById(req.body.id);

  if (!register) {
    return res.status(404).json({ msg: 'Registro no encontrado' });
  }
  const fechaHoraServer = fechaHora();
  let Etapa_ = req.body.Etapa;
  let uniclas_ = req.body.uniclas;
  let descclas_ = req.body.descclas;
  let nomclas_ = req.body.nomclas;
  let areaclas_ = req.body.areaclas;
  let temaclas_ = req.body.temaclas;
  let publicodirigido_ = req.body.publicodirigido;

  var clasificadonombre_ = user.username + " " + fechaHoraServer[0] + " " + fechaHoraServer[1];

  let registerdoc = await Register.findOneAndUpdate({ _id: req.body.id },
    { $set: {
      clasificado: true, clasificadonombre: clasificadonombre_,
      Etapa: Etapa_, uniclas: uniclas_, descclas: descclas_,
      nomclas: nomclas_, areaclas: areaclas_, temaclas: temaclas_, publicodirigido: publicodirigido_
    }});
  let outputmsg = "Registro no encontrado";
  if(register){
    outputmsg = register.ID + " clasificado"
  }
    res.json({msg: outputmsg}); 

  }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

router.post('/returnregister/:id', [auth, checkObjectId('id')], async (req, res) => {

  try {
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const fechaHoraServer = fechaHora();
    const historial = register.historial + ', ' + user.username + ' ' + fechaHoraServer[0] + ' ' + fechaHoraServer[1];
    const fechadinamica = fechaHoraServer[0]   
    const estadogeneral = 'ENVIADO';
    const validasub = false;
    
    const dataRegister = {
      historial,
      fechadinamica,
      estadogeneral,
      validasub
    };
    let registerdoc = await Register.findOneAndUpdate({ _id: req.params.id },
      { $set: dataRegister });

    res.json({ msg: register.ID + ' retornado a subdirección' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/workforce', auth, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const {datospersona1, FechaInicial, fecharango} = req.body;

    if((!datospersona1) || (!FechaInicial) || (!fecharango)){
      return res.status(404).json({ msg: 'Complete los datos' });
    }
    let idpersona;
    if (datospersona1) {
      let string = datospersona1.split(",");
      idpersona = string[0];
    } 

    let rangedayI = FechaInicial.slice(0,2);
    let rangemonthI = FechaInicial.slice(3,5);
    let rangeyearI =  FechaInicial.slice(6,10);
    let RangeI = rangeyearI + rangemonthI + rangedayI;

    let rangedayF =   fecharango.slice(0,2);
    let rangemonthF = fecharango.slice(3,5);
    let rangeyearF =  fecharango.slice(6,10);
    let RangeF = rangeyearF + rangemonthF + rangedayF;
    
    let query;
    console.log(req.body.informativas)
    if(req.body.informativas.toString() === 'true'){
      query = {
        $and: [{
          Direcciongeneral: user.direcciongeneral, estadogeneral: "VALIDADO",
          validasub: true, Send: true,
        }, { rangofinal: { $gte: RangeI, $lte: RangeF } },
        {
          $or: [{ idpersona1: idpersona }, { idpersona2: idpersona },
          { idpersona3: idpersona }, { idpersona4: idpersona },
          { idpersona5: idpersona }, { idpersona6: idpersona },
          { idpersona7: idpersona }, { idpersona8: idpersona },
          ]
        }]
      };
    } else{
      query = {
        $and: [{
          Direcciongeneral: user.direcciongeneral, excluir: false, estadogeneral: "VALIDADO",
          validasub: true, Send: true,
        }, { rangofinal: { $gte: RangeI, $lte: RangeF } },
        {
          $or: [{ idpersona1: idpersona }, { idpersona2: idpersona },
          { idpersona3: idpersona }, { idpersona4: idpersona },
          { idpersona5: idpersona }, { idpersona6: idpersona },
          { idpersona7: idpersona }, { idpersona8: idpersona },
          ]
        }]
      };
    }
    
 
    

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
    let montharrayI = rangemonthI.split('')

    if(montharrayI[0] == 0){
      montharrayI = montharrayI[1]
    } else{
      montharrayI = rangemonthI
    }

    let montharrayF = rangemonthF.split('')

    if(montharrayF[0] == 0){
      montharrayF = montharrayF[1]
    } else{
      montharrayF = rangemonthF
    }
   
    const firstDate = new Date(rangeyearI, montharrayI, rangedayI);
    const secondDate = new Date(rangeyearF, montharrayF, rangedayF);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));   
 
    if(RangeF < RangeI){
      return res.status(404).json({ msg: 'La fecha inicial debe ser menor o igual que la fecha final' });
    } else if(Number(diffDays) <= 365){      
      const registers = await Register.find(query).sort({rangofinal: 1});
      res.json({ registers: registers, msg: 'Consulta: ' +  FechaInicial + ' - ' + fecharango});    
      
    } else{
      return res.status(404).json({ msg: 'El rango de fechas es mayor a 365 días' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/pass/:id', [auth, checkObjectId('id')], async (req, res) => {

  try {
    const register = await Register.findById(req.params.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const fechaHoraServer = fechaHora();

    const estadogeneral = 'APROBADO';

    const dataRegisterVal = {
        estadogeneral
    };

    let registerdoc = await Register.findOneAndUpdate({ _id: req.params.id },
      { $set: dataRegisterVal });

    if(Number(user.Nivel) === 3){

      if(registerdoc){
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
          }
        });
  
        let mailOptions = {};
  
          mailOptions = {
            from: '"SIGVI noreply" spcypd.dgpc.sigvi@gmail.com',   
            to: process.env.ALERT_EMAIL,
            subject: user.username + ' ha aprobado el registro',
            // HTML body
            html:"<p>"+ user.username+" ha aprobado "+ registerdoc.ID.toString() +"</p>" +
            `<p><i><b>noreply:</b> esto es un mensaje automático</i></p>
            <p><i>No es necesario contestar este correo</i></p>`,
          };
  
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(mailOptions);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
    } 
    res.json({ msg: register.ID + ' aprobado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/updatedate',  auth, async (req, res) => {

    try {
      const register = await Register.findById(req.body.id);

    if (!register) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    const { FechaSimple } = req.body;

    const fecharango = FechaSimple;
    const quincenaFechaSeleccionada = obtenerQuincenaConFecha(FechaSimple); 

    const Quincena = quincenaFechaSeleccionada[3];

    const QuincenaNum = quincenaFechaSeleccionada[0];

    let rangeday = fecharango.slice(0,2);
    let mesrango = fecharango.slice(3,5);
    let aniorango = fecharango.slice(6,10);

    const nombremesrango = quincenaFechaSeleccionada[4];
    
    const rangofinal = aniorango + mesrango + rangeday ;

    //Editar el identificador
    const splitOriginalID = register.ID.split('-');
    const ID = register.JUD + '-' + FechaSimple + '-' +  splitOriginalID[2]; 
    

    let registerdoc = await Register.findOneAndUpdate({ _id: req.body.id },
      { $set: {
        ID,
        fecharango,
        Quincena,
        QuincenaNum,
        aniorango,
        nombremesrango,
        mesrango,
        rangofinal,
      }});



    res.json({ msg: register.ID + ' cambio de fecha' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/agreggate', auth, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    const { FechaInicial, fecharango } = req.body;

    let rangedayI =   FechaInicial.slice(0,2);
    let rangemonthI = FechaInicial.slice(3,5);
    let rangeyearI =  FechaInicial.slice(6,10);
    let RangeI = rangeyearI + rangemonthI + rangedayI;

    let rangedayF =   fecharango.slice(0,2);
    let rangemonthF = fecharango.slice(3,5);
    let rangeyearF =  fecharango.slice(6,10);
    let RangeF = rangeyearF + rangemonthF + rangedayF;

    let query;

    if(Number(user.Nivel) === 0){
      if(req.body.informativas.toString() === 'true'){
        
        query = {
          $and: [{Direcciongeneral: user.direcciongeneral, estadogeneral: "VALIDADO" },
                  {rangofinal: { $gte: RangeI, $lte: RangeF }}
          ]
        };

      } else{

        query = {
          $and: [{Direcciongeneral: user.direcciongeneral, excluir: false, estadogeneral: "VALIDADO",
            validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }},
          ]
        };
        
      }
    }  else  if(Number(user.Nivel) === 1){
      query = {
      $and: [{Direcciongeneral: user.direcciongeneral, Direccion: user.direccion, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }},
      ]
    };
    }  else if(Number(user.Nivel) === 2){
      query = {
      $and: [{Direcciongeneral: user.direcciongeneral, SubDireccion: user.subdireccion, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }},
      ]
    };
    }  else if(Number(user.Nivel) === 3){
      query = {$and: [ {Direcciongeneral: user.direcciongeneral, JUD: user.jud, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }}]};
    } else if(Number(user.Nivel) === 4){
        query = {$and: [ {Direcciongeneral: user.direcciongeneral, email: user.email, estadogeneral: "VALIDADO",
        validasub: true, Send: true, },{rangofinal: { $gte: RangeI, $lte: RangeF }}]};
    }   
    
    let rubros = await Register.aggregate([{ $match: query }, 
    { 
      $group: { _id:  "$Rubro" , 
                count: { $sum: 1 }, 
                Asistentes: { $sum: "$Asistentes" },
              },
    },
    {
      $sort: { "_id": -1 }
    }]);
    let totalRubros = 0;
    let totalAsistentes = 0;
      if(rubros){
        rubros.forEach(function (element) {
          totalRubros = Number(totalRubros) + Number(element.count);
          totalAsistentes = Number(totalAsistentes) + Number(element.Asistentes);
      });
    }

    rubros.push({
      "_id": 'Total', "count": totalRubros, "Asistentes": totalAsistentes 
    });

    let actividades = await Register.aggregate([{ $match: query }, {
      $group: { _id: "$Actividad", count: { $sum: 1 } }
    },
    {
      $sort: { "_id": -1 }
    }]);   

    let totalActividades = totalRubros;


    actividades.push({
      "_id": 'Total', "count": totalActividades
    });

    let juds = await Register.aggregate([{ $match: query }, {
      $group: { _id: "$JUD", count: { $sum: 1 } }
    },
    {
      $sort: { "_id": -1 }
    }]);
    
    let totalJuds= totalRubros;


    juds.push({
      "_id": 'Total', "count": totalJuds
    });

    res.json({ rubros: rubros, actividades: actividades, juds: juds,  msg: 'Consulta: ' +  req.body.FechaInicial + ' - ' + req.body.fecharango});    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;

