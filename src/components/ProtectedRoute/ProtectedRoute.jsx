import React from 'react'
import { Navigate } from 'react-router-dom'

export default function protectedRoute(props) {
 
   if (localStorage.getItem("userToken")){
    //go to component
    return  props.children
   }
   else {
    // go to login
    return <Navigate to="/Login"/>
   };
  
}
