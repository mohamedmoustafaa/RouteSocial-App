import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import  linkedPostsAPI from'../../Api/LinkedPosts'
export default function CreatePosts() {
  const form = useForm({
    defaultValues: {
      body: '',
      image: '',
    },
  });

  const { register, handleSubmit, reset } = form;

  async function handlePostSubmit(values) {
    const myData = new FormData();
    myData.append("body", values?.body);
    myData.append("image", values?.image[0]);

    try {
      const response = await linkedPostsAPI.post("/posts", myData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Response:", response.data);

      if (response?.data?.message === "success") {
        toast.success("Post Shared Successfully!");
        reset(); 
      }
    } catch (err) {
      console.error("❌ Error uploading post:", err.response?.data || err);
      if (err.response?.status === 401) {
        toast.error("Unauthorized! Please login again.");
      } else {
        toast.error("Upload post failed!");
      }
    }
  }

  return (
    <div className="w-full md:w-[60%] lg:w-[80%] mx-auto p-4 bg-slate-800 rounded-lg my-10">
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div>
          <input
            type="text"
            {...register('body')}
            className="w-full border-4 border-slate-400 rounded-lg p-3"
            placeholder="Post Details"
          />
        </div>

        <div className="my-4">
          <label
            htmlFor="photo"
            className="bg-red-600 block w-full text-center cursor-pointer rounded-lg py-3"
          >
            <i className="fa-solid fa-image fa-xl"></i>
          </label>
          <input
            type="file"
            {...register('image')}
            className="hidden"
            id="photo"
          />
        </div>

        <div>
          <button className="w-full bg-blue-600 text-white p-3 cursor-pointer rounded-lg">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
}
