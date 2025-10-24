import React from 'react'
import style from './postDetails.module.css'
import { useParams } from 'react-router-dom' //عشان استدعي اي حاجة من الurl 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import PostComment from '../PostComment/PostComment';



export default function postDetails() {

  let {id} = useParams();
  console.log(id);

  function getSinglePost(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers:{
        token : localStorage.getItem("userToken")
      }
    })
  }

  let {data, isError , isLoading , error} =useQuery({
    queryKey : ["getSinglePost"],
    queryFn : getSinglePost,
    select : (data)=> data.data.post
  });
  console.log(data);
  
  
  return (
    <div className=" my-8 w-full md:w-[80%] lg:[60%] rounded-md bg-slate-200 p-4 mx-auto">
           <div className="flex justify-between items-center ">
            <div className="flex items-center gap-4">
              <img src={data?.user.photo} className="size-[40px]  "  alt="" />
              <p>
                {data?.user.name}
              </p>
            </div>
            <div className="text-xs text-slate-400">
              {data?.createdAt}
            </div>
           </div>
           {data?.body && <h2 className="mb-4">{data?.body}</h2>}
           {data?.image &&<img src={data?.image} alt={data?.body}  className="w-full rounded-md"/>}
           {data?.comments.map((comment)=> <PostComment key={comment.id} comment={comment} />)}
           {/* <PostComment comment={post.comments[0]} /> */}
    
        </div>
  )
}
