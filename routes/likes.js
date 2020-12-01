const express = require('express');
const Resto = require('../models/resto');
const router = express.Router();
const auth = require('../middleware/auth')
//const decoded = require


// @route    POST /education
// @desc     CREATE education
// @access   Private
router.post('/:restoId',auth, async (req, res, next) => {
  try {

    const id = req.params.restoId
    const usermail = req.user.email
    let tem = await Resto.findById(id)
    let verifica = tem.userlike.filter(function(elem){
      return elem.email == usermail
    })
    if (verifica.length > 0) {
      res.status(401).json({error : "voce ja deu like, po!"})
    }else{
      const poelike = await Resto.findByIdAndUpdate(id , { $push: { userlike: {email: usermail }}}, { new: true })
      const tiradislike = await Resto.findByIdAndUpdate(id, { $pull: { userdislike:  {email:usermail }}}, { new: true })
    
   
    if (poelike) {
      res.json(tiradislike)
    } else {
      res.status(404).send({ "error": "Resto not found" })
   }
  }

  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

// @route    DELETE /education
// @desc     DELETE education
// @access   Private
// router.delete('/:restoId', auth, async (req, res, next) => {
//   try {
//     const id = req.params.restoId
//     const usermail = req.user.email
//     const profile = await Resto.findByIdAndUpdate(id, { $pull: { userlike: {email:usermail }} }, { new: true })
//     console.log (profile)
//     console.log (usermail)
//     console.log (id)
//     if (profile) {
//       res.json(profile)
//     } else {
//       res.status(404).send({ "error": "user not found" })
//     }
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send({ "error": "Server Error" })
//   }
// })

module.exports = router;
