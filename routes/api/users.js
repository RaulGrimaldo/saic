const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const User = require('../../models/User');
const { funcBaseURL, funcNivel, funcSubDir } = require('../../helpers/backoffice');
const checkObjectId = require('../../middleware/checkObjectId');
const { fechaHora } = require('../../helpers/dates');


// @route       GET api/users
// @desc        Test route
// @access      Public
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [auth],
  check('username', 'El nombre es requerido').notEmpty(),
  check('numeroEmpleadoPlaca', 'El primer apellido es requerido').notEmpty(),
  check('phonenumber', 'El segundo apellido es requerido').notEmpty(),
  check('ROL', 'El rol es requerido').notEmpty(),
  check('jud', 'El área es requerido').notEmpty(),
  check('email', 'Porfavor incluya un email válido').isEmail(),
  check(
    'password',
    'Por favor ingrese una contraseña con 6 o más caracteres'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mirror, username, numeroEmpleadoPlaca, email, phonenumber, password, ROL, jud } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'El usuario ya existe' }] });
      }

      let baseURL = funcBaseURL(ROL);
      let Nivel = funcNivel(ROL);
      if (!baseURL) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Error al cargar el rol' }] });
      }

      let espejo = "NO";

      if (mirror === 'true') {
        espejo = "SI";
      }

      //Primer ingreso activo
      const active = true;

      let activo = "SI";

      let secretaria = "SSC";
      let subsecretaria = "OM";
      let direcciongeneral = "DGF";
      let direccion;
      let subdireccion;

      const subDir = funcSubDir(jud);

      if(subDir){
        subdireccion = subDir[0];
        direccion = subDir[1];
      }



      user = new User({
        secretaria,
        subsecretaria,
        direcciongeneral,
        direccion,
        subdireccion,
        jud,
        ROL,
        Nivel,
        username,
        email,
        active,
        activo,
        mirror,
        espejo,
        numeroEmpleadoPlaca,
        phonenumber,
        baseURL,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({ msg: 'Usuario agregado' });


    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  }
);


// @access   Private
router.get('/users', auth, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password');
    const users = await User.find({direcciongeneral: user.direcciongeneral, active: true});

    if (users.length > 0) {
      users.map(function (user) {
        user.password = 'Hola Neo'
      });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @access   Private
router.delete('/deleteuser/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const usermain = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    await user.remove();
    res.json({ msg: user.email + ' eliminado', user1: user._id, user2: usermain._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @access   Private
router.post(
  '/updateuser',
  [auth],
  check('username', 'El nombre es requerido').notEmpty(),
  check('numeroEmpleadoPlaca', 'El primer apellido es requerido').notEmpty(),
  check('phonenumber', 'El segundo apellido es requerido').notEmpty(),
  check('ROL', 'El rol es requerido').notEmpty(),
  check('jud', 'El área es requerido').notEmpty(),
  check('email', 'Porfavor incluya un email válido').isEmail(),
   async (req, res) => {

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, active, mirror, username, numeroEmpleadoPlaca, email, phonenumber, ROL, jud } = req.body;


      let user = await User.find({ email, "_id": { $ne: id } })

      if (user.length != 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'El email ya está ocupado' }] });
      }



      let baseURL = funcBaseURL(ROL );
      let Nivel = funcNivel(ROL);
      if (!baseURL) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Error al cargar el rol' }] });
      }
      
      let espejo = 'NO';

      if (mirror) {
        espejo = 'SI';
      }

      let activo = 'NO';

      if (active) {
        activo = 'SI';
      }

      let secretaria = "SSC";
      let subsecretaria = "OM";
      let direcciongeneral = "DGF";
      let direccion;
      let subdireccion;

      const subDir = funcSubDir(jud);

      if(subDir){
        subdireccion = subDir[0];
        direccion = subDir[1];
      }



      const newuserdata = {
        secretaria,
        subsecretaria,
        direcciongeneral,
        direccion,
        subdireccion,
        jud,
        ROL,
        Nivel,
        username,
        email,
        mirror,
        active,
        activo,
        espejo,
        numeroEmpleadoPlaca,
        phonenumber,
        baseURL
      };
      let userdoc = await User.findOneAndUpdate({ _id: id },
        { $set: newuserdata });

      return res.json(userdoc);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post(
  '/updateuserpassword',
  [auth],
  check(
    'password',
    'Por favor ingrese una contraseña con 6 o más caracteres'
  ).isLength({ min: 6 }), async (req, res) => {
    console.log(req.body)
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { password, id } = req.body;

      let user = await User.findById(id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No se encontro al usuario' }] });
      }



      const salt = await bcrypt.genSalt(10);

      password = await bcrypt.hash(password, salt);

      let newuserdata = {
        password
      };
      let userdoc = await User.findOneAndUpdate({ _id: id },
        { $set: newuserdata });

      return res.json(userdoc);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
