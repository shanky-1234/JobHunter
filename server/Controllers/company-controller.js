const Company = require('../Models/company-model')

const registerCompany = async (req,res) =>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(403).json({
                message:'Field is Empty',
                status:false
            })
        }
        const company = await Company.findOne({name:name})
        if(company){
            return res.status(400).json({
                message:"Company Already Exists",
                status:false
            })
        }
        const createCompany = await Company.create({
            name,
            userId:req.id
        })

        if(createCompany){
             return res.status(200).json({
                message:"Company Created",
                status:true,
                createCompany
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:'Some Error Occured',
            status:false,
            error
        })
    }
    
}

const getCompany = async(req,res)=>{
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:'Not Found',
                status:false
            })
        }

        return res.status(200).json({
            message:`company from ${userId}`,
            status:true,
            companies
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:'Some Error Occured',
            status:false,
            error
        })
    }
}

//Get By ID
const getCompanyById = async (req,res)=>{
    const getCompanyId = req.params.id
    const company = await Company.findById(getCompanyId)
    if(!company){
            return res.status(404).json({
                message:'Not Found',
                status:false
            })
    }
    return res.status(200).json({
        message:'Company Retrieved',
        status:true,
        company
    })

} 

const updateCompany = async(req,res)=>{
    try {
        const {name,description,website, location} = req.body
        const file = req.file
        //cloudinary

        const uploadData = {name,description,website, location}

        const company = await Company.findByIdAndUpdate(req.params.id,uploadData,{new:true})

        if(!company){
            return res.status(404).json({
                message:'Not Found',
                status:false
            })
        }

        return res.status(200).json({
            message:'Data Successfully Updated',
            status: true,
            company
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
              message:'Some Error Occured',
            status:false,
            error
        })
    }
}

module.exports = {registerCompany,getCompany,getCompanyById,updateCompany}