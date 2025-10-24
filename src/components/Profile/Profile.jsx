import React from 'react'
import styles from './profile.module.css';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserPosts from '../UserPosts/UserPosts'
import ChangePasswordModal from './../ChangePasswordModal/ChangePasswordModal';
import UploadProfilePhoto from './../UploadProfilePhoto/UploadProfilePhoto';

export default function profile() {
  function getUserData(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token :localStorage.getItem("userToken")
      }
    })
  }

  let {data, isloadind, error, isError} =useQuery({
    queryKey:["userData"],
    queryFn:getUserData,
    select: (data)=> data?.data?.user,
  })
  console.log(data);
  

  return <>
   <div className={styles.container}>
     <div className="w-full md:w-[80%] lg:w-[60%] mx-auto text-center border-2 border-slate-600 bg-slate-400 rounded-lg p-4 mt-6 ">
      <img src={data?.photo} className="size-[50px] mx-auto " alt="" />
      <p>Name:{data?.name} </p>
      <p>email:{data?.email} </p>
      <p>gender:{data?.gender} </p>
      <p>dateOfBirth:{data?.dateOfBirth} </p>

    </div>
   </div>

    <div className="w-full flex flex-col items-center gap-3 justify-center md:w-[80%] lg:w-[60%] mx-auto text-center border-2 border-slate-600 bg-slate-400 rounded-lg p-4  mt-6">
      <ChangePasswordModal />
      <UploadProfilePhoto />
    </div>
    {data &&<UserPosts id={data?._id} />}
  </>
}
