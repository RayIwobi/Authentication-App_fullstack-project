const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 10000
const app = express()


app.use(cors({  
    origin: 'http://localhost:3000',   
    credentials:true,
}))


const  {UserRouter } = require('./routes/user.js') 
const User = require('./models/User.js')
const cookieParser = require('cookie-parser');//requirement for authentication

app.use(express.json())
app.use(cookieParser()) 
app.use(express.static('public'))
app.use('/auth', UserRouter)



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));


app.listen(process.env.PORT, () => {
    console.log('SERVER RUNNING ON PORT ' + process.env.PORT)
})
