import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { GiHamburgerMenu } from "react-icons/gi";
import { HamburgerIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/Redux/authSlice";
import { toast } from "react-toastify";
import { USER_API_ENDPOINTS } from "@/utils/constant";


function Navbar() {
  const [open,setOpen] = useState(false)
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async() =>{
      try{
        const res = await axios.get(`${USER_API_ENDPOINTS}/logout`,{withCredentials:true})
        dispatch(setUser(null))
        toast.success('Logged out')
        navigate('/')
        console.log(res.data)
      }
      catch(error){
        console.error(error)
      }
  }
  return (
    <nav className="py-6 bg-blue-500 max-w-full shadow-md h-20 ">
      <div className="mx-[80px] flex items-center justify-between align-middle md:justify-between">
        <h1 className="font-black text-2xl text-white">
          Job<span className="text-blue-200">Hunter</span>
        </h1>
        <div className="">
          <ul className="md:flex justify-between gap-10 items-center hidden">
            <Link to='/' className="text-md font-medium text-white">
              <li>Home</li>
            </Link>
            <Link to='/jobs' className="text-md font-medium text-white">
              <li>Jobs</li>
            </Link>
            <Link to='/browse' className="text-md font-medium text-white">
              <li>Browse</li>
            </Link>
            {!user ? (
              <Link to='/login'>
              <Button
                className={
                  "bg-white text-blue-500 hover:bg-gray-200 cursor-pointer"
                }
               
              >
                Log-In
              </Button>
              </Link>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className={"cursor-pointer"}>
                    <AvatarImage src={`${user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}  `}></AvatarImage>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mx-[80px] w-48 bg-white p-5 h-32 flex-col flex justify-center shadow-md space-y-2 transition-all duration-400 rounded-xl">
                  <div className="flex gap-2 items-center my-1">
                    <Avatar className={"cursor-pointer"}>
                      <AvatarImage src={`${user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}  `}></AvatarImage>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>{user.fullname}</p>
                      <Link to='/profile' className="text-sm text-blue-500">
                        View Profile
                      </Link>
                    </div>
                  </div>
                 
                    <Button onClick={()=>handleLogout()}>Log Out</Button>
                  
                </PopoverContent>
              </Popover>
            )}
          </ul>
        </div>
        
        <div className={'md:hidden'} onClick={()=>setOpen(prevValue => !prevValue)}>
        <GiHamburgerMenu
          color="white"
          size="24"
          className="md:hidden cursor-pointer"
        />
        </div>
        {/* Mobile Navbar */}
        
        <div className={`md:hidden bg-blue-500 w-1/2 h-full flex  fixed top-0 right-0 z-999 backdrop-brightness-0 flex-col ${open ? "translate-x-0":"translate-x-full"} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-end p-12">
            <div onClick={()=>setOpen((prevValue)=>!prevValue)}>
              <IoClose size={32} color="white"/>
            </div>
            </div>
            <div>
            <ul className="text-center justify-center items-center align-middle text-white text-lg flex flex-col gap-4">
              <Link className="text-md  text-white">
              <li>Home</li>
            </Link>
            <Link className="text-md  text-white">
              <li>Jobs</li>
            </Link>
            <Link className="text-md  text-white">
              <li>Browse</li>
            </Link>
            { user ?
             <div className="flex gap-2 items-center my-1">
                    <Avatar className={"cursor-pointer"}>
                      <AvatarImage src={`${user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}  `}></AvatarImage>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>{user.fullname}</p>
                    </div>
                  </div>:
                  <Button variant={'default'} className={'bg-white text-blue-500 font-medium text-[16px]'}>Log-In</Button>
}
            </ul>
          </div>
        </div>

      </div>
      {/* Overlay*/}
      { open &&
      <div className="md:hidden bg-black w-full h-full opacity-50 fixed z-200 inset-0" onClick={()=>setOpen((prevValue) =>!prevValue)}>
      </div>
}
    </nav>
  );
}

export default Navbar;
