const express = require('express');
const Resto = require('../../models/resto');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth')

// @route    GET /resto/:restoId
// @access   Public
router.get('/:restoId', [], async (req, res, next) => {
  try {
    const id = req.params.restoId
    const resto = await Resto.findOne({_id : id})
    if (resto) {
      res.json(resto)
    } else {
      res.status(404).send({ "error": "Restaurant not found" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

// @route    DELETE /resto/:restoId
// @access   Public
router.delete('/:restoId',  async(req, res, next) => {
  try {
    const id = req.params.restoId
    const resto = await Resto.findOneAndDelete({_id : id})
    if (resto) {
      res.json(resto)
    } else {
      res.status(404).send({ "error": "Restaurant not found" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})


// @route    PATCH /resto/:restoId
// @access   Public
router.patch('/:restoId', [], async (request, res, next) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
      return
    }
    const id = request.params.restoId
    const update = { $set: bodyRequest }
    const resto = await Resto.findByIdAndUpdate(id, update, { new: true })
    if (resto) {
      res.send(resto)
    } else {
      res.status(404).send({ error: "Restaurant not found" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

// @route    GET /resto
// @access   Private
router.get('/', async (req, res, next) => {
  try {
    const resto = await Resto.find({})
    res.json(resto)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

// @route    POST /resto
// @desc     CREATE resto
// @access   Public
router.post('/',  [
  check('nome').not().isEmpty(),
  check('cozinha').not().isEmpty(),
  check('endereco').not().isEmpty(),
  check('instagram').not().isEmpty(),
  
], async (req, res, next) => {
  try {
    let { nome, cozinha, endereco, instagram } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      let resto = new Resto({ nome, cozinha, endereco, instagram })

      await resto.save()
      if (resto.id) {
        res.json(resto);
      }
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})


module.exports = router;