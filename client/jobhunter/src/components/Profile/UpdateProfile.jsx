import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { FaRegImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidFilePdf } from "react-icons/bi";
import axios from "axios";
import { USER_API_ENDPOINTS } from "@/utils/constant";
import { setLoading, setUser } from "@/Redux/authSlice";
import LoadingButton from "../ui/loadingButton";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

function UpdateProfile({ open, setOpen }) {
  const { user,loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.file,
  });

 
  const onDrop = useCallback((acceptedFiles) => {
    setInput((prevValue) => ({
      ...prevValue,
      file: acceptedFiles[0],
    }));
  }, []);
 const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'application/pdf': [".pdf"],
    },
    onDrop,
  });
  const handleEvents = (e) => {
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const files = acceptedFiles.map((file) => {
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    dispatch(setLoading(true))
    console.log(input)
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINTS}/updateProfile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(setLoading(false))
      dispatch(setUser(res.data.data))
      toast.success("Account Updated Successfuly", {
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
      setOpen(false)

    } catch (error) {
      console.error(error);
      toast.error(error, {
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
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-black">Edit Profile</DialogTitle>
            <DialogDescription>
              Edit you profile and click on save to make the changes
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="flex flex-col w-full">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={input.fullname}
                    className="border-1 border-gray-400 p-2 rounded-lg mt-1"
                    onChange={handleEvents}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={input.email}
                    className="border-1 border-gray-400 p-2 rounded-lg mt-1"
                    onChange={handleEvents}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={input.phoneNumber}
                    className="border-1 border-gray-400 p-2 rounded-lg mt-1"
                    maxLength={10}
                    onChange={handleEvents}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    id="bio"
                    value={input.bio}
                    onChange={handleEvents}
                    className="border-1 border-gray-400 p-2 rounded-lg mt-1"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    value={input.skills}
                    className="border-1 border-gray-400 p-2 rounded-lg mt-1"
                    onChange={handleEvents}
                  />
                </div>
                <div
                  {...getRootProps({
                    className:
                      "dropzone border-2 border-dashed w-full h-20 flex justify-center items-center cursor-pointer",
                  })}
                >
                  <input className="input-zone border-1" {...getInputProps({name:'file'})} />
                  <div className="text-center ">
                    <p className="dropzone-content text-gray-500 flex items-center gap-2">
                      <span>
                        <BiSolidFilePdf size={32} />
                      </span>
                      Drag and Drop or Upload your file
                    </p>
                    <aside>
                      <ul>{files}</ul>
                    </aside>
                  </div>
                </div>
              </div>
              <div className="">
              <DialogClose className="mt-8" asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {!loading ?
              <Button type="submit" className="ml-2 bg-blue-500 text-white">
                Save changes
              </Button> : <LoadingButton className={''} content={loading}/>}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default UpdateProfile;
