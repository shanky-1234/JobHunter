const jwt = require('jsonwebtoken')

const isAuthenticated = async(req,res,next) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:'Unauthorized Access',
                status:false
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRECT_KEY)
        if(!decode){
            return res.status(401).json({
                message:'Unauthorized Access',
                status:false
            })
        }
        req.id = decode.userId
        req.email = decode.email
        req.role = decode.role
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:'Something went wrong',
            status:false,
            error
        })
    }
}

module.exports = isAuthenticated