const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email already taken'],
        lowercase:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:[true,'Phone Number already Taken'],
        maxlength:10
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'], 
        require:true,
        default:'student'
    },
    profile:{
         bio:{type:String},
         skills: [{type:String}],
         resume:{type:String},
         resumeOrginalName:{type:String},
         company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
         profilePhoto:{type:String,default:''}
    }
},{timestamps:true})

module.exports = mongoose.model('Users',UserSchema)