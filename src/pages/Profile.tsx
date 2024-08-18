import { Avatar } from '@mui/material'
import Navbar from '../components/Navbar'
import { MdEdit } from "react-icons/md";
import { getUserRequest, updateUserRequest } from '../api/userApi';
import Loaders from '../components/Loaders';
import { FaUserCircle } from "react-icons/fa";
import {useRef, useState } from 'react';
const Profile = () => {
  const fileRef = useRef(null)
  const {userData, findingUser} = getUserRequest()
  const {updateFn, isUpdating} = updateUserRequest()
  const [picload, setPicLoad] = useState<boolean>(false)
  const uploadProfilePic = async (picture:  string | ArrayBuffer| null) => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const preset = import.meta.env.VITE_CLOUD_PRESET
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
    const fd = new FormData()
    fd.append("upload_preset", preset)
    fd.append("file",picture as string)
    await fetch(url, {
        method: "post",
        body: fd
    })
    .then(resp => resp.json())
    .then(async data => {
        const url = data.secure_url
        await updateFn({profile_pic: url})
        setPicLoad(false)
    })
  }

  const loadImage = (e: React.ChangeEvent) => {
    setPicLoad(true)
    const input = e.target as HTMLInputElement
    const file = input.files![0]
    const reader = new FileReader()
    reader.addEventListener("load", () => {   
        uploadProfilePic(reader.result)
    })
    if(file){
        reader.readAsDataURL(file)
    }
  }

  if(findingUser || isUpdating || picload){
    return <><Loaders /></>
  }
  return (
    <>
        <Navbar />
        <div className='flex flex-col justify-center items-center w-[98vw] h-[86.5vh] space-y-1'>
            {!userData.profile_pic && <div className='relative'>
                <input ref = {fileRef} id="file" type = "file" onChange = {(e) => loadImage(e)} className = "hidden"/>
                <FaUserCircle className = "z-10" size = {180}/>
                <div onClick = {() => {((fileRef.current as unknown) as HTMLInputElement).click()}} className='cursor-pointer hover:bg-gray-100 absolute right-[10px] border-2 rounded-full p-2 bg-white z-20 bottom-[0px]'>
                    <MdEdit size = {30} className='fill-red-400'/>
                    <Avatar sx = {{width: "200px", height: "200px" ,border: "5px solid gray"}} src = {userData.profile_pic}/>
                </div>
                
            </div>}
            {userData.profile_pic && <div className='relative'>
                <input ref = {fileRef} id="file" type = "file" onChange = {(e) => loadImage(e)} className = "hidden"/>
                <Avatar sx = {{width: "200px", height: "200px" ,border: "5px solid gray"}} src = {userData.profile_pic}/>
                <div onClick = {() => {((fileRef.current as unknown) as HTMLInputElement).click()}} className='cursor-pointer hover:bg-gray-100 absolute right-[10px] border-2 rounded-full p-2 bg-white z-20 bottom-[0px]'>
                    <MdEdit size = {30} className='fill-red-400'/>
                </div>
            </div>}
            <div className='flex gap-2'><label className='text-xl'>name:</label><span className='text-xl text-gray-500'>{userData.name}</span></div>
            <div className='flex gap-2'><label className='text-xl'>email:</label><span className='text-xl text-gray-500'>{userData.email}</span></div>
        </div>
    </>
  )
}

export default Profile