import React from 'react'
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router'

function Footer() {
  return (
    <footer className='p-8 px-[80px] mt-12 bg-blue-500 '>
        <div className='flex items-center flex-col md:flex-row gap-6 md:justify-between'>
        <div>
            <h1 className="font-black text-2xl text-white">
          Job<span className="text-blue-200">Hunter</span>
        </h1>
        </div>
        <div className='flex'>
            <ul className='flex gap-4'>
                <Link className="text-md font-bold text-white">
              <li>Home</li>
            </Link>
            <Link className="text-md font-bold text-white ">
              <li>Jobs</li>
            </Link>
            <Link className="text-md font-bold text-white ">
              <li>Browse</li>
            </Link>
            </ul>
        </div>
        <div className='flex gap-4 text-white'>
            <Link className="text-lg font-bold ">
              <FaFacebook size={24}/>
            </Link>
            <Link className="text-lg font-bold ">
              <FaInstagram size={24}/>
            </Link>
            <Link className="text-lg font-bold ">
              <FaYoutube size={24}/>
            </Link>
        </div>
        </div>
        <hr className='w-full mt-8 bg-gray-900 border-1'/>
        <div className='mt-8 flex md:flex-row flex-col text-center justify-center gap-4 md:justify-between'>
            <span className='text-[12px] text-white font-bold'>All Rights Reserved</span>
            <div className='flex gap-4 justify-center'>
                 <span className='text-[12px] text-white font-bold'>Terms and Condition</span>
                  <span className='text-[12px] text-white font-bold'>Privacy Policy</span>
            </div>
        </div>
    </footer>
  )
}

export default Footer