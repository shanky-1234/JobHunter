const isRecuirter = async(req,res,next)=>{
    try{
    const role = req.role
    if(role !== 'recruiter'){
        console.log('recruiter')
        return res.status(403).json({
            message:"No permisson",
            status:false
        })
    }
    next()
}
catch(error){
    return res.status(500).json({
        message:'internal error',
        status:false
    })
}
}
module.exports = isRecuirter