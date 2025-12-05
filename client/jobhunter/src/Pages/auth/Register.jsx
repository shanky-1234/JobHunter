import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router";
import { FaRegImage } from "react-icons/fa";
import axios from "axios";
import { USER_API_ENDPOINTS } from "@/utils/constant";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import LoadingButton from "@/components/ui/loadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/authSlice";

function Register() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });
  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onDrop = useCallback((acceptedFiles) => {
    setInput((prevValue) => ({
      ...prevValue,
      file: acceptedFiles[0],
    }));
  }, []);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
    },
    onDrop,
  });

  const files = acceptedFiles.map((file) => {
    return(<li key={file.path}>
      {file.path} - {file.size} bytes
    </li>)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("file", input.file);
    dispatch(setLoading(true))
    setLoading(true);
    try {

      const res = await axios.post(`${USER_API_ENDPOINTS}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(res.data);
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
      setInput({fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  })
    } catch (error) {
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
      console.error("error is", error);
    }
    finally{
      dispatch(setLoading(false))

    }
  };
  return (
    <>
      <section className="h-full flex justify-center items-center align-middle flex-wrap">
        <div className="flex flex-col flex-wrap align-middle mx-[40px] mt-16 lg:w-1/2 shadow-md p-12 rounded-xl border-1">
          <div>
            <h1 className="text-3xl font-black text-blue-500">Register</h1>

            <form className="w-full mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-xl font-medium">Basic Information</h3>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 w-full">
                <div className="w-full">
                  <label htmlFor="">Full Name</label>
                  <input
                    className="w-full border-2 h-10 p-2"
                    type="text"
                    onChange={handleChange}
                    value={input.fullname}
                    name="fullname"
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">E-mail</label>
                  <input
                    className="w-full border-2 h-10 p-2"
                    type="text"
                    onChange={handleChange}
                    value={input.email}
                    name="email"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 w-full">
                <div className="w-full">
                  <label htmlFor="">Password</label>
                  <input
                    className="w-full border-2 h-10 p-2"
                    type="password"
                    onChange={handleChange}
                    value={input.password}
                    placeholder="Enter Your Password"
                    required
                    name="password"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Phone Number</label>
                  <input
                    className="w-full border-2 h-10 p-2"
                    type="number"
                    onChange={handleChange}
                    value={input.phoneNumber}
                    name="phoneNumber"
                    placeholder="Enter Your Phonenumber"
                    maxLength={10}
                    min={0}
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium">Profile Information</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <label htmlFor="">Student</label>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">Recruiter</label>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div
                {...getRootProps({
                  className:
                    "dropzone border-2 border-dashed w-full h-20 flex justify-center items-center cursor-pointer",
                })}
              >
                <input className="input-zone border-1" {...getInputProps({content:'file'})} />
                <div className="text-center ">
                  <p className="dropzone-content text-gray-500 flex items-center gap-2">
                    <span>
                      <FaRegImage size={32} />
                    </span>
                    Drag and Drop or Upload your file
                  </p>
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </div>
              </div>
              {!loading ? (
                <Button className={"w-full h-12 bg-blue-500"}>Regsiter</Button>
              ) : (
                <LoadingButton content="loading" />
              )}
            </form>
            <div className="mt-2 text-center">
              <p>Don't Have an Account ?</p>
              <Link to="/Login" className="text-blue-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Register;
