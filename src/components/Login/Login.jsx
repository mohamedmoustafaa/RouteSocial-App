import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext'




export default function Login() {
  const navigate = useNavigate()
  const [apiError , setapiError] = useState("");
  const [isLoading , setisLoadind] = useState(false);
  let {userLogin , setuserLogin } = useContext(userContext);

  const schema = z.object({
    email : z.email("Invalid E-Mail"),
    password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "The password must have 1 capital letter atleast & Small letter atleast & 1 Special Char and Number min length is 8 Numbers"),

  });

const form = useForm({
  defaultValues : {
    email : "",
    passowrd : "",
  },
  resolver : zodResolver(schema),
})

let {register , handleSubmit , formState} = form;

// let {onChange,onBlur,ref,name} = register("name")
  

function handleLogin(values) {

  setisLoadind(true)

axios.post(`https://linked-posts.routemisr.com/users/signin` , values)
.then((res)=>{
if (res.data.message === "success") {
  setisLoadind(false);

  const token = res.data.token;
  if (!token) {
    toast.error("Token not received!");
    return;
  }

  localStorage.setItem("userToken", token);
  console.log("✅ Token saved:", token);

  setuserLogin(token);

  // تأخير بسيط لضمان الحفظ قبل الانتقال
  setTimeout(() => {
    navigate("/");
  }, 200);
}

})
.catch((err)=>{
  //console.log(err.response.data.error);

  setisLoadind(false) //عشان يرجع تاني لحالته بعد عرض النتيجة

  setapiError(err.response.data.error)


  
})
}

  return <>

  

<form  
 onSubmit={handleSubmit(handleLogin)}  
 className= "max-w-md mx-auto my-12">

{apiError && <h1 className="text-center bg-red-500  text-white rounded-md my-2 p-2 font-bold">{apiError}</h1>}

  <div className= "relative z-0 w-full mb-5 group">
      <input type="email" {...register("email")} id="email" className= "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor=   "email" className= "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your E-mail</label>
      {formState.errors.email&&formState.touchedFields.email ? <p className="text-red-500 font-semibold text-center my-2"> {formState.errors.email.message} </p> : ""}

  </div>
  <div className= "relative z-0 w-full mb-5 group">
      <input type="password" {...register("password")} id="password" className= "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor=   "password" className= "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your Password</label>
      {formState.errors.password &&formState.touchedFields.password? <p className="text-red-500 font-semibold text-center my-2"> {formState.errors.password.message} </p> : ""}

  </div>



  <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading ? <i className="fas fa-spinner fa-spin text-white "></i> : "Login"}
  </button>

</form>

  
  </>
}
