const express = require('express')
const {registerCompany,updateCompany,getCompany,getCompanyById} = require('../Controllers/company-controller')
const userMiddleware = require('../Middleware/user-middleware')
const recruiterMiddleware = require('../Middleware/recruiter-middleware')

const router = express.Router()

router.post('/register',userMiddleware,recruiterMiddleware,registerCompany)
router.post('/updateCompany/:id',userMiddleware,recruiterMiddleware,updateCompany)
router.get('/getCompany',userMiddleware,recruiterMiddleware,getCompany)
router.get('/getCompanyById/:id',userMiddleware,recruiterMiddleware,getCompanyById)

module.exports = router




