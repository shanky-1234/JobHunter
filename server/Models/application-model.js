const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Jobs',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
},{timeseries:true})

module.exports = mongoose.model('Application',ApplicationSchema)