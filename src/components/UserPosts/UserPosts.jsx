import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import PostComment from '../PostComment/PostComment'
import CreateUserComment from './../CreateUserComment/CreateUserComment';
import UpdatePost from './../UpdatePost/UpdatePost';
import toast from 'react-hot-toast'


export default function UserPosts({id}) {

  function getUserPosts(){
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }
  let {data, isError, error, isLoading}=useQuery({
    queryKey:["userPosts"],
    queryFn: getUserPosts,
  })
  console.log(data?.data?.posts);
  
    const queryClient = useQueryClient()
  

  function deletePost(postId){
    axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token : localStorage.getItem("userToken")
      }
    })    
    .then((res)=>{
      if(res.data.message === "success"){
        toast.success("post deleted successfully")
         queryClient.invalidateQueries({queryKey : ["userPosts"]})

      }
    })
    .catch((err)=>{
      console.log(err.response.data.error);
      toast.error(err.response.data.error)
    })
    
  }
  return( <>
    {data?.data?.posts.map((post) =>
    <div  key={post?.id} className=" my-8 w-full md:w-[80%] lg:[60%] rounded-md bg-slate-200 p-4 mx-auto">


      <Link to={`/PostDetails/${post?.id}`}>
       <div className="flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <img src={post?.user.photo} className="size-[40px]  "  alt="" />
          <p>
            {post?.user.name}
          </p>
        </div>
        <div className="text-xs text-slate-400">
          {post?.createdAt}
        </div>
       </div>
       {post?.body && <h2 className="mb-4">{post?.body}</h2>}
       {post?.image &&<img src={post?.image} alt={post?.body}  className="w-full rounded-md"/>}

       {post?.comments?.length > 0 && <PostComment comment={post?.comments[0]} />}
        </Link>
       <CreateUserComment  postId={post?.id} />
       <br />
       <UpdatePost id={post?.id} />
       <button onClick={()=> deletePost(post?.id)} className="bg-red-500 text-white w-full rounded-sm p-3 my-4 cursor-pointer">Delete post</button>
       
    </div>
     ) }

  </>)
}
