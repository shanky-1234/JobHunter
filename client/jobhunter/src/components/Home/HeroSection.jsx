import React from 'react'
import { FaSearch } from 'react-icons/fa'

function HeroSection() {
  return (
    <main className='w-full px-[80px] '>
        <div className='flex flex-col items-center text-center gap-2 justify-center py-20 '>
            <div className='w-fit rounded-md p-2 bg-blue-200'>
               <p className='font-medium text-blue-700'>Made for Students</p> 
            </div>
            <h1 className=' text-blue-500 font-black tracking-tight text-6xl'>YOUR CAREER</h1>
            <h1 className=' font-medium text-4xl'>STARTS HERE</h1>
        
        <div className='flex justify-center'>
            <p>Start Searching Your Jobs</p>
        </div>
        <div className='w-full md:w-1/2 mt-2 relative'>
            <input type="text" className='border-2 border-gray-300 rounded-4xl p-4 w-full shadow-md' placeholder='Search for Jobs'/>
            <button className='bg-blue-500 p-3 rounded-full text-white absolute top-2 right-4'><span><FaSearch /></span></button>
        </div>
        </div>
    </main>
  )
}

export default HeroSection