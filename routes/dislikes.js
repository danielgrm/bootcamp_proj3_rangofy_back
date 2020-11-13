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
    const poedislike = await Resto.findByIdAndUpdate(id , { $push: { userdislike: {email:usermail }} }, { new: true })
    const tiralike = await Resto.findByIdAndUpdate(id, { $pull: { userlike: {email:usermail }} }, { new: true })

    if (poedislike) {
      res.json(tiralike)
    } else {
      res.status(404).send({ "error": "Resto not found" })
    }
    next()
  
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})
module.exports = router;