const express = require('express')
const {applyJob,getAllApplicant,getAllAppliedJobs,updateStatus} = require('../Controllers/appliaction-controller')
const userMiddleware = require('../Middleware/user-middleware')
const recruiterMiddleware = require('../Middleware/recruiter-middleware')

const router = express.Router()

router.post('/applyJob/:id',userMiddleware,applyJob)
router.get('/allApplicant/:id',userMiddleware,recruiterMiddleware,getAllApplicant)
router.get('/getAppliedJobs/',userMiddleware,getAllAppliedJobs)
router.post('/updateStatus/:id',userMiddleware,recruiterMiddleware,updateStatus)


module.exports = router




