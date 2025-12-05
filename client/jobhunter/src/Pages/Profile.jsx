import AppliedJobs from '@/components/JobSection/AppliedJobs'
import UpdateProfile from '@/components/Profile/UpdateProfile'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Layout from '@/Layout/Layout'

import React, { useState } from 'react'
import { FaFilePdf, FaPhoneAlt } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux'

function Profile() {
    const [open,setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)

  return (
    <Layout>
      <section className="w-full">
        {/* Blue Header Background */}
        <div className="bg-blue-500 w-full h-32 md:h-40"></div>

        {/* Floating Profile Card */}
        <main className="lg:w-3/4 w-auto px-4 md:px-[40px] lg:px-[80px] -mt-16 md:-mt-20 mx-auto">
          <div className="w-full bg-white md:h-full px-4 md:px-8 p-6 shadow-md flex flex-col lg:flex-row relative">
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="md:w-[100px] md:h-[100px] w-[80px] h-[80px] mx-auto lg:mx-0 flex-shrink-0">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={`${user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}  `}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-blue-500">
                  {user?.fullname}
                </h1>
                <p className="text-md font-medium text-gray-500">
                  {user?.profile?.bio}
                </p>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-2 font-medium">
                  <span className="flex gap-2 items-center">
                    <FaPhoneAlt /> <p>{user?.phoneNumber}</p>
                  </span>
                  <span className="flex gap-2 items-center">
                    <IoMail /> <p>{user?.email}</p>
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  {
                    user?.profile?.skills.length != 0 && user?.profile?.skills.map((items,index)=>{
                      return <Badge key={index} variant="default" className={"bg-blue-500"}>
                    {items}
                  </Badge>
                    })
                  }
                </div>
                <div className="mt-2 flex gap-2">
                  <FaFilePdf />
                  <label htmlFor="">
                    <a
                      target="_blank"
                     href={`${user?.profile?.resume}`}
  download={user?.profile?.resumeOriginalName}
                      className="text-md font-medium underline text-blue-500"
                    >
                      {user?.profile?.resumeOrginalName}
                    </a>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Button
                className={"bg-blue-500 rounded-full w-[40px] h-[40px]"}
                onClick={()=>setOpen(true)}
              >
                <MdEdit />
              </Button>
            </div>
          </div>
        </main>
      </section>

      {/* Content below */}
      <section className="mt-10 md:mt-16 mx-[80px]">
        <div>
          <h1 className="text-center text-2xl font-bold text-blue-500">
            Applied Jobs
          </h1>
        </div>
        <AppliedJobs />
      </section>
      <UpdateProfile open={open} setOpen={setOpen}/>
    </Layout>

  )
}

export default Profile
