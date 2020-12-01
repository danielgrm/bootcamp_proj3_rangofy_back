const express = require('express');
const Resto = require('../models/resto');
const auth = require('../middleware/auth')

const router = express.Router();

// @route    GET /resto
// @access   Private
router.get('/', auth, async (req, res, next) => {
  try {
    const usermail = req.user.email
    const resto = await Resto.find ({ "userdislike.email": usermail } ) 
    res.json(resto)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})


module.exports = router;
