import { Button } from '@/components/ui/button'
import { USER_API_ENDPOINTS } from '@/utils/constant'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast,Bounce, ToastContainer } from 'react-toastify'
import LoadingButton from '@/components/ui/loadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser} from '@/Redux/authSlice'

function Login() {
    const {loading} = useSelector(store=>store.auth)
    const [input,setInput] = useState({
        email:'',
        password:'',
        role:''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) =>{
        setInput((prevValue)=>({...prevValue,[e.target.name]:e.target.value}))
    }

    const submitHandle = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('email',input.email)
        formData.append('password',input.password)
        formData.append('role',input.role)
        console.log(input)
        try{
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINTS}/login`,formData,{
                headers:{
                    "Content-Type":'multipart/form-data'
                },
                withCredentials:true
            })
            console.log(res.data)
            dispatch(setUser(res.data.userLogin))
            setLoading(false)
            toast.success("Account Registered Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate('/')
        }
        catch(error){
            console.error("error is", error);
            toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
                  setLoading(false)
        }
        finally{
            dispatch(setLoading(false))
        }


    }

  return (
    <>
    <section className='h-full '>
        <div className='flex flex-col align-middle mt-40 mx-auto w-[400px] shadow-md p-12 rounded-xl border-1'>
            <h1 className='text-3xl font-black text-blue-500'>Log-In</h1>
            <form onSubmit={submitHandle} className='w-full mt-4 space-y-4'action="">
            <div>
                <label htmlFor="">E-mail</label>
                <input className='w-full border-2 h-10 p-2' placeholder='Enter Your Email' type="email" name='email' value={input.email} onChange={handleChange} required/>
            </div>
             <div>
                <label htmlFor="">Password</label>
                <input className='w-full border-2 h-10 p-2' placeholder='Enter Your Password' type="password" name='password' value={input.password} onChange={handleChange} required/>
            </div>
               <div className='flex gap-4'>
            <div className='flex gap-2'>
                <label htmlFor="">Student</label>
                <input type='radio' name='role' value="student" onChange={handleChange} required />
            </div>
            <div className='flex gap-2'>
                <label htmlFor="">Recruiter</label>
                <input type='radio' name='role' value="recruiter" onChange={handleChange} required/>
            </div>
            </div>
             {!loading ? (
                <Button className={"w-full h-12 bg-blue-500"}>Login</Button>
              ) : (
                <LoadingButton content="loading" />
              )}
            </form>
              <div className='mt-2 text-center'>
            <p>Don't Have an Account ?</p>
            <Link to='/register' className='text-blue-500'>Create an Account</Link>
        </div>
        </div>
        <ToastContainer />
      
    </section>
    </>
  )
}

export default Login