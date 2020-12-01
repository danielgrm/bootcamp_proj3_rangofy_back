const express = require('express')
var bodyparser = require('body-parser')
const app = express()
const PORT = process.env.PORT ||3005
const cors = require('cors')
const connectDB = require('./config/db')

// init middleware
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())
connectDB()

app.use('/', require('./routes/main'))
app.use('/admin/user', require('./routes/admin/user'))
app.use('/login', require ('./routes/login'))
app.use('/admin/resto', require ('./routes/admin/resto'))
app.use('/resto', require ('./routes/resto'))
app.use('/cadastro', require ('./routes/cadastro'))
app.use('/likes', require ('./routes/likes'))
app.use('/dislikes', require ('./routes/dislikes'))
app.use('/likeslist', require ('./routes/likeslist'))
app.use('/dislikeslist', require ('./routes/dislikeslist'))


app.listen(PORT, () => { console.log(`Projdupla rodando na ${PORT}`) })
