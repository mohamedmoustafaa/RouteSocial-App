import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import PostComment from '../PostComment/PostComment'
import { Link } from 'react-router-dom'
import CreateUserComment from './../CreateUserComment/CreateUserComment';
import CreatePosts from './../CreatePosts/CreatePosts';



export default function Home() {


  // let {getAllPosts} = useContext(PostContext)

  //  const [posts, setposts] = useState([])

  //  async function getPosts() {
  //   let  res= await getAllPosts();  

  //     if (res.length) {
  //     setposts(res);
  //     console.log(res);
  //    }
     
    
    
    
  //  }
  // useEffect(()=>{
  //   getPosts()
  // },[])

  function getAllPosts(){
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`,{
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
  }

 let {data, isError , isLoading , error} = useQuery({
  queryKey : ["getPosts"],
  queryFn : getAllPosts,
  // staleTime : 20000 ,  بيخلي الداتا فريش لمدة 20 ثانية
  // retry : 3  بتخليه يحاول 3 مرات يستدعي الداتا وبعدين يظهر رسالة الايرور
  // retryDelay : 2000  يعني استني بين المحاولات قد ايه  
  // refetchInterval :30000 بتحدد يعمل كام ريكويست كل كام ثانية

 });

 if(isError){
  return <h3>{error.message}</h3>
 }

 if(isLoading){
  return <span className="loader"></span>
 }

  return <>
    
    <CreatePosts />

    {data?.data?.posts.map((post) =>
    <div className=" my-8 w-full md:w-[80%] lg:[60%] rounded-md bg-slate-200 p-4 mx-auto">


      <Link key={post.id} to={`/PostDetails/${post.id}`}>
       <div className="flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <img src={post.user.photo} className="size-[40px]  "  alt="" />
          <p>
            {post.user.name}
          </p>
        </div>
        <div className="text-xs text-slate-400">
          {post.createdAt}
        </div>
       </div>
       {post.body && <h2 className="mb-4">{post.body}</h2>}
       {post.image &&<img src={post.image} alt={post.body}  className="w-full rounded-md"/>}

       <PostComment comment={post.comments[0]} />
        </Link>
       <CreateUserComment  postId={post.id} />
       

    </div>
     ) }
    </>

  
}
