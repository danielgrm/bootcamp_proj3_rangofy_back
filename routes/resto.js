const express = require('express');
const Resto = require('../models/resto');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route    GET /resto
// @access   Public
router.get('/', async (req, res, next) => {
  try {
    const resto = await Resto.find({})
    res.json(resto)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})


module.exports = router;