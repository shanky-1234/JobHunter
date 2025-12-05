const companyModel = require('../Models/company-model')
const Jobs = require('../Models/job-model')

const postJob = async(req,res)=>{
    try {
        const {title,description,requirements,salary, location, types,position,experience} = req.body
        const userId = req.id
        const getCompanyID = await companyModel.findOne({userId:userId})
        
        if(!title||!description||!requirements||!salary||!location||!types||!experience||!position){
            return res.status(403).json({
            message:"Some Fields are missing",
            status:false    
        })
        }
        const createJob = await Jobs.create({
            title,
            description,
            requirements:requirements.split(","),
            salary,
            location,
            jobType:types,
            experience, 
            noOfPosition:position,
            company:getCompanyID._id,
            createdBy:userId
        })
        return res.status(200).json({
            message:"New Job Created Successfully",
            status:true,
            data:createJob
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Not enough expeirence",
            status:false    
        })
    }
}

const getAllJob =  async (req,res)=>{
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs = await Jobs.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({
                message:"JOb not found",
                status:false
            })
        }
        return res.status(200).json({
            message:"All Jobs found",
            status:true,
            jobs
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Not enough expeirence",
            status:false  
        })
    }
}
const getJobById = async (req,res)=>{
    try{
    const jobId = req.params.id
    const job = await Jobs.findById(jobId)
    if(!job){
         return res.status(404).json({
                message:"JOb not found",
                status:false
            })
    }
    return res.status(200).json({
        message:"Job Found",
        status:true,
        job
    })
}
catch(error){
    console.error(error)
     return res.status(500).json({
            message:"Not enough expeirence",
            status:false  
        })
}
}

const getAdminJobs = async (req,res)=>{
    try {
        const adminId = req.id
        const jobs = await Jobs.find({createdBy:adminId}).populate({path:"company"})
        if(!adminId){
            return res.status(404).json({
                message:"Not found",
                status:false
            })
        }
        return res.status(200).json({
            message:"Found Job admin",
            status:true,
            jobs
        })
    } catch (error) {
        console.error(error)
     return res.status(500).json({
            message:"Not enough expeirence",
            status:false  
        })
    }
}
module.exports = {postJob,getAllJob,getJobById,getAdminJobs}