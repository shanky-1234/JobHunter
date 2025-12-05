require('dotenv').config()
const express = require('express')
const cookie = require('cookie-parser')
const cors = require('cors')
const app = express()

const connectToDB = require('./Database/database')
const userRoute = require('./routes/user-routes')
const companyRoute = require('./routes/company-routes')
const jobRoute = require('./routes/job-routes')
const appliactionRoute = require('./routes/application-routes')

const PORT = process.env.PORT || 3000

// For CORS Value
const corsOption ={
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOption))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie())

//api's
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',appliactionRoute)



app.listen(PORT,()=>{
    connectToDB()
    console.log(`Server is now running on Port: ${PORT}`)
})