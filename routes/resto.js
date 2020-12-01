const express = require('express');
const Resto = require('../models/resto');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route    GET /resto
// @access   Public
router.get('/', async (req, res, next) => {
  try {
    let busca = null
    query = {}
    for (const [key, value] of Object.entries(req.query)) {
      if (key == 'userlikes'){
        query[key] = { "$in" : value.split(',')  }
      }
      if (key == 'userdislikes') {
        query[key] = {  "$in" : value.split(',') } 
      }
      else{
        query[key] = value
      }
    }
    console.log(query)
    busca = await Resto.find(query)
    res.json(busca)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
  
  
  // //original
  // try {
  //   const resto = await Resto.find({})
  //   res.json(resto)
  // } catch (err) {
  //   console.error(err.message)
  //   res.status(500).send({ "error": "Server Error" })
  // }
})


module.exports = router;