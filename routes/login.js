const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')



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


module.exports = router;

