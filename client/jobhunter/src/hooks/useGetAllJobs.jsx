import { setAllJobs } from '@/Redux/jobSlice'
import { JOB_API_ENDPOINTS } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllJobs() {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllJob = async () =>{
            try {
                const res = await axios.get(`${JOB_API_ENDPOINTS}/getalljob`,{withCredentials:true})
                console.log(res.data)
                if(res.data.status){
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.error(error)
            }
            
        }
        fetchAllJob()
    },[])
}

export default useGetAllJobs