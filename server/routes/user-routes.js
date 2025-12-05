const express = require('express')
const {login,register,updateProfile,logout} = require('../Controllers/user-controller')
const userMiddleware = require('../Middleware/user-middleware')
const singleUpload = require('../Middleware/multer')

const router = express.Router()

router.post('/register',singleUpload,register)
router.post('/login',singleUpload,login)
router.get('/logout',logout)
router.post('/updateProfile',userMiddleware,singleUpload,updateProfile)

module.exports = router




