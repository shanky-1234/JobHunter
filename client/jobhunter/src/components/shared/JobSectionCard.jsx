import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router'

function JobSectionCard() {
    const navigate = useNavigate()
    const jobId = '1'

  return (
    <div className='p-4 border-1 border-gray-300 rounded-lg max-w-[450px] h-auto shadow-md'>
        <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 '>
                    <div className='w-7 h-7'>
                        <img src="/Google__G__logo.svg" className='w-full h-full' alt="" />
                    </div>
                    <div>
        <h3 className='text-xl font-bold text-blue-500'>Company Name</h3>
        <h5 className='text-md'>Nepal</h5>
        </div>
        </div>
        <span className='cursor-pointer'>   
            <FaRegBookmark size={30}/>
        </span>
        </div>
        <h2 className='text-lg font-medium'>Job Title</h2>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aliquam quo dolorem.</p>
    </div>
        <div className='flex justify-between items-center flex-wrap gap-4'>
            <div className='flex gap-2 mt-4 flex-wrap'>
            <Badge variant="default" className={'bg-green-300 text-green-700'}>12 Position</Badge>
            <Badge variant="default" className={'bg-blue-300 text-blue-700'}>Part Time</Badge>
            <Badge variant="default" className={'bg-red-300 text-red-700'}>50K</Badge>
        </div>
        
        </div>
        <div>
            <div className='w-full mt-4 flex items-center justify-between'>
             <Button className={'bg-blue-500 w-1/3'} onClick={()=>{navigate(`/jobdetail/${jobId}`)}}>Apply</Button>
             <span className='text-sm text-gray-500'>
                <p>2 Days Ago</p>
             </span>
             </div>
        </div>
       
    </div>
  )
}

export default JobSectionCard