const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Consecutive = require('../../models/Consecutive');

// @access   Private
router.get('/consecutives', auth, async (req, res) => {
    try {
      const consecutives = await Consecutive.find({});
  
      res.json(consecutives);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post(
    '/upsertconsecutive',
    [auth],
    check('areafull', 'El área es requerido').notEmpty(), async (req, res) => {

      try {
  
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const filter = { jud: req.body.areafull }
  
        const update = { consecutivo: 0}

        let consecutive = await Consecutive.findOneAndUpdate(filter, update, {
            upsert: true, useFindAndModify: false
        });
  
        return res.json(consecutive);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});


module.exports = router;