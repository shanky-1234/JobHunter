const Application = require('../Models/application-model')
const jobModel = require('../Models/job-model')

const applyJob = async(req,res)=>{
    try {
        const userId = req.id
        const jobId = req.params.id
        if(!jobId){
            return res.status(400).json({
                message:"job id is required",
                status:false
            })

        }
        //check if user have applied for job
        const existingApplication =  await Application.findOne({job:jobId, applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for the job",
                status:false,
            })
        }
        const job = await jobModel.findById(jobId)
        if(!job){
            return res.status(404).json({
                message:"Job Not Found",
                status:false
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id)
        await job.save()

        return res.status(200).json({
            message:"Job applied Successfully",
            status:true,
            newApplication
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Something went wrong",
            status:false
        })
    }
}

const getAllAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                option:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(404).json({
                message:"No application Found",
                status:false
            })
        }
        return res.status(200).json({
            message:"All Applied Jobs",
            status:true,
            application
        })
        
    } catch (error) {
         console.error(error)
        return res.status(500).json({
            message:"Something went wrong",
            status:false
        })
    }
}

const getAllApplicant = async (req,res)=>{
    try {
        const jobid = req.params.id
        const job =await jobModel.findById(jobid).populate({
          path:'applications',
          options:{sort:{createdAt:-1}},
          populate:{
            path:"applicant",
            options:{sort:{createdAt:-1}}
          }
        })

        if(!job){
            return res.status(404).json({
                message:"Job not Found",
                status:false
            })
        }
        return res.status(200).json({
            message:"Applicants Found",
            status:true,
            job
        })


        
    } catch (error) {
           console.error(error)
        return res.status(500).json({
            message:"Something went wrong",
            status:false
        })
    }
}

const updateStatus  = async(req,res)=>{
    try {
    const {status} = req.body
    const applicationId = req.params.id
    if(!status){
        return res.status(400).json({
            message:"Empty Field",
            status:false
        })
    }
    //Find the application by applicant id

    const application = await Application.findOne({_id:applicationId})
    if(!application){
        return res.status(404).json({
            message:"Application not found",
            status:false
        })
    }

    //Update status
    application.status = status.toLowerCase()
    await application.save()
    return res.status(200).json({
        message:"Status Updated Successfully",
        status:true,
        status
    })
    } catch (error) {
            console.error(error)
        return res.status(500).json({
            message:"Something went wrong",
            status:false
        })
    }


}
module.exports = {applyJob,getAllApplicant,getAllAppliedJobs,updateStatus}