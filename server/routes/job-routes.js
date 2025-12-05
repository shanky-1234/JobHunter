const express = require('express')
const {getJobById,postJob,getAllJob,getAdminJobs} = require('../Controllers/job-controller')
const userMiddleware = require('../Middleware/user-middleware')
const recruiterMiddleware = require('../Middleware/recruiter-middleware')

const router = express.Router()

router.post('/post',userMiddleware,recruiterMiddleware,postJob)
router.get('/getalljob',getAllJob)
router.get('/getJobById/:id',userMiddleware,recruiterMiddleware,getJobById)
router.get('/getAdminJob',userMiddleware,recruiterMiddleware,getAdminJobs)


module.exports = router




