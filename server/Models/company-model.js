const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
       description:{
        type:String
    },
       website:{
        type:String
    },
    location:{
        type:String
    },
    logo:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
    },{timestamps:true}
)

module.exports = mongoose.model('Company',CompanySchema)