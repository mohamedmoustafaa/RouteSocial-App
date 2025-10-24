import React from 'react'
import style from './deleteComment.module.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

export default function DeleteComment({id}) {
let queryClient = useQueryClient()


function Delete(){
 axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
  headers: {
    token : localStorage.getItem("userToken")
  }
 })
 .then((res)=> {

  if(res.data.message === "success"){
      toast.success('delete is Success')
      queryClient.invalidateQueries({queryKey : ["userPosts"]})
  
      }
 

 })
.catch((err)=>{
  toast.console.error();
  ('Delete doesnt done')

})
}

  return (<>

  <button onClick={Delete}>Delete Comment</button>
  
  </>
  )
}
