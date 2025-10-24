import React, { useState } from 'react'
import style from './UpdatePost.module.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';


export default function UpdatePost({id}) {
  const [isShow, setisShow] = useState(false);
  let queryClient = useQueryClient()
  const form = useForm({
    defaultValues : {
      body: "",
      image: "",
    
    }
  })

  const {register, handleSubmit} = form

  async function handleUpdate(values){
  //console.log(value.body);
  //console.log(value.image[0]);
  let myData = new FormData()
  myData.append(`body`,values.body)
  myData.append(`image`,values.image[0])

  axios.put(`https://linked-posts.routemisr.com/posts/${id}`, myData, {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`
  }

  })

  .then((res) => {
    console.log(res);
    if(res.data.message === "success"){
    toast.success('Update is Success')
    queryClient.invalidateQueries({queryKey : ["userPosts"]})

    }
    
  })
  .catch((err) =>{
    console.log(err);
     toast.error('Update is failed')

  })
      console.log("TOKEN:", localStorage.getItem("userToken"));

}

  function changeToggle(){
    setisShow(true);
  }


  return <>
  

<button 
onClick={changeToggle}
className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
 type="button">
Update Post 
</button>

{isShow && (
  <div id="authentication-modal"  aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                </h3>
                <button onClick={()=> setisShow(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                  <i  className="fas fa-close cursor-pointer"></i>
                  <span className="sr-only">Close modal</span>
                </button>
            </div>

            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)} action="#">
                    <div>
                        <label htmlFor="Comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add text</label>
                        <input type="text" {...register('body')} id="Comment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="post details"  />
                    </div>

                    <div >
                      <input   type="file" {...register('image')} id="image" placeholder="" className="bg-gray-50 hidden border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                      <label htmlFor="image" className=" block w-full text-center cursor-pointer p-4 bg-slate-500" > 
                        <i className="fa-solid fa-images fa-2xl"></i>
                      </label>
                    </div>
                    
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Comment

                    </button>
                </form>
            </div>
        </div>
    </div>
</div> )}

  </>

}
