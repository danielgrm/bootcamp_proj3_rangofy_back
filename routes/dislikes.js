const express = require('express');
const Resto = require('../models/resto');
const router = express.Router();
const auth = require('../middleware/auth')


// @route    POST /education
// @desc     CREATE education
// @access   Private
router.post('/:restoId', auth, async (req, res, next) => {
  try {

    const id = req.params.restoId
    const usermail = req.user.email

    let tem = await Resto.findById(id)
    let verifica = tem.userdislike.filter(function(elem){
      return elem.email == usermail
    })
    if (verifica.length > 0) {
      res.status(401).json({error : "Esse restaurante já tem sua avaliação negativa!"})
    }else{

    const poedislike = await Resto.findByIdAndUpdate(id , { $addToSet: { userdislike: {email: usermail }} }, { new: true })
    const tiralike = await Resto.findByIdAndUpdate(id, { $pull: { userlike: {email: usermail}} }, { new: true })

    if (poedislike) {
      res.json(tiralike)
    } else {
      res.status(404).send({ "error": "Restaurante não encontrado" })
    }
    next()
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})
module.exports = router;