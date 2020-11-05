const express = require('express')
const router = express.Router()
const User = require('../models/user')
//const Profile = require('../models/profile')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require ('../middleware/auth')


// post no /auth ==>> auth user and get token

router.post('/', [
    check('email', 'Please insert valid email').isEmail(),
    check('senha', 'pwd required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, senha } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
           return res.status(404).json({ errors: [{ msg: "User not found" }] })
        } else {
            const isMatch = await bcrypt.compare(senha, user.senha);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Senha Incorreta' }] });
            } else {
                const payload = {
                    user: {
                        id: user.id,
                        name: user.nome,
                        email: user.email,
                        isactive: user.isactive,
                        isadmin: user.isadmin
                    }
                }
console.log(payload, "token granted")
                jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '2 days' },
                    (err, token) => {
                        if (err) throw err;
                        payload.token = token
                        res.json(payload);
                    }
                );
            }
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }

})

// // get lista geral
// router.get('/', auth, async (req, res, next) => {

//     try {
//         const user = await User.find(req.query)
//         console.log(req.query)
// //        console.log(user)
//         res.json(user)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send({ "error": "server error no barra get" })
//     }
// })



//   //delete combo no user e no profile
// router.delete('/:_id', auth, [], async (req, res, next) => {
//     try {
//       const user = await User.findOneAndDelete({ _id: req.params["_id"]})
    
//         if (user) {
//             await Profile.findOneAndDelete({ user: req.params["_id"]})
//           res.status(200).send({ "msg" : "user and profile deleted"})
//         } else {
//           res.status(404).send({ "error": "user not found" })
//         }
//       } catch (err) {
//         console.error(err.message)
//         res.status(500).send({ "error": "Server Error no delete" })
//       }
//     })
module.exports = router;

