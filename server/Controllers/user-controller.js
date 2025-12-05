
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const User = require('../Models/user-model')
const userModel = require('../Models/user-model')
const datauri = require('../utils/datauri')
const cloudinary = require('../utils/cloudinary')



const register = async(req,res)=>{
    try{
    const {fullname,email,phoneNumber,password,role} =  req.body
    const file= req.file
    const fileURI = datauri(file)
    const cloudinaryResponse = await cloudinary.uploader.upload(fileURI.content)

    if(!fullname||!email||!phoneNumber||!password||!role||!file){
        return res.status(400).json({
            message:'Empty Fields',
            status:false
        })
    }   
     const checkIfUserExists = await User.findOne({$or:[{email},{phoneNumber}]})
     if(checkIfUserExists){
        return res.status(400).json({
            message:'User Already Exists with this Value',
            status:false
        })
     }
     const salt = await bycrypt.genSalt(10)
     const hashedPassword = await bycrypt.hash(password,salt)

     const createUser = await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
        profile:{
             profilePhoto:cloudinaryResponse.secure_url
        }
        

     })

     if(createUser){
        return res.status(200).json({
            message:"User Created Successfully",
            status:true,
            data:createUser
        })
     }
}
catch(error){
    console.error(error)
    return res.status(500).json({
        message:'Some Error Occured',
        status:false,
        error:error
    })
}
}

const login = async(req,res)=>{
    try{
        const {email,password, role} = req.body
        if(!email||!password,!role){
            return res.status(401).json({
                message:'Fields Missing',
                status:false
            })
        }
        let userLogin = await User.findOne({email})
        if(!userLogin){
            return res.status(400).json({
                message:"Incorrect Email or Password or Role",
                status:false
            })
        }
        const comparePassword = await bycrypt.compare(password,userLogin.password)
        if(!comparePassword){
            return res.status(403).json({
                message:'Incorrect Email or Password or Role',
                status:false
            })
        }

        if (role !== userLogin.role){
            return res.status(403).json({
                message:'Incorrect Email or Password or Role',
                status:false
            })
        }

        const token ={
            userId:userLogin._id,
            email,
            role
        }

        userLogin = {
            _id:userLogin._id,
            fullname:userLogin.fullname,
            email:userLogin.email,
            phoneNumber:userLogin.phoneNumber,
            role:userLogin.role,
            profile:userLogin.profile
        }

        const generateToken = await jwt.sign(token,process.env.JWT_SECRECT_KEY,{expiresIn:'1d'})
        console.log(generateToken)
        return res.status(200).cookie("token",generateToken,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${userLogin.fullname}`,
            success:true,
            token:generateToken,
            userLogin
        })
        

    }catch(error){
        console.error(error)
    return res.status(500).json({
        message:'Some Error Occured',
        status:false,
        error:error
    })
    }
}

const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:'0'}).json({
            message:'Logged Out Successfully',
            success:true
        })
    } catch (error) {
             console.error(error)
    return res.status(500).json({
        message:'Some Error Occured',
        status:false,
        error:error
    })
    }

}

const updateProfile = async (req,res)=>{
    try {
        const{fullname, email,phoneNumber, bio,skills } = req.body  
        const file = req.file

        console.log(file)
        
        

        const fileUri = datauri(file)
        console.log(fileUri);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content)

        let skillsArray
        if(skills){
        skillsArray = skills.split(',')
        }
        const userId = req.id
        let user = await User.findById(userId)

        if(!user){
            return res.status(403).json({
                message:'User Not Found',
                status:false
            })
        }

        if(!file){
            return res.status(404).json({
                message:"File is Missing",
                status:false
            })
        }

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        if(cloudinaryResponse){
            user.profile.resume = cloudinaryResponse.secure_url //save the cloudinary URL
            user.profile.resumeOrginalName = file.originalname // save the orginal name
        }


        await user.save()

         user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).json({
            messgae:'Updated Successfully',
            status:true,
            data:user
        })


        
    } catch (error) {
                  console.error(error)
    return res.status(500).json({
        message:'Some Error Occured',
        status:false,
        error:error
    })
    }
}
module.exports = {register,login,logout,updateProfile}