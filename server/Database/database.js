const mongoose = require('mongoose')
const connectToDB = async ()=>{
    try{
    await mongoose.connect(process.env.mongoURI)
    console.log('Database is Connected')
    }
    catch(error){
        console.error('Error is',error)
    }
}

module.exports = connectToDB