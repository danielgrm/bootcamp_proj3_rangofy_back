const jwt = require('jsonwebtoken')
const config = require('config')
const user = require('../models/user')
const map = require ('../service/router_map')
const router_map = require('../service/router_map')

module.exports = function (req, res ,next){
const token = req.header('x-auth-token')

if(!token){
    return res.status(401).json({msg: 'No Token, no deal'})
}
try{
jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
    if (error) {
    return res.status(401).json({msg: 'Token not valid'})}
    req.user= decoded.user  
    map=router_map(req.baseUrl, decoded.user)
    if (map.status==200){
        next()
    }else{
        return res.status(map.status).json({msg:map.msg})
    }
})
}catch (err){
console.error('middleware malfunction')
res.status(500).json({msg:' Server Error'})
}
}

