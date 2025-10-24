import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'flowbite';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './context/CounterContext';
import UserContextProvider from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PostContextProvider from './context/PostContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostDetails from './components/PostDetails/PostDetails';
import toast, { Toaster } from 'react-hot-toast';

const query = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "PostDetails/:id", element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> }
    ]
  }
]);

function App() {
  return (
    <>


<UserContextProvider>
 <PostContextProvider>
    <CounterContextProvider>
      <QueryClientProvider client={query}>
       <RouterProvider router={router} />
       <Toaster />
       <ReactQueryDevtools />
      </QueryClientProvider>
  </CounterContextProvider>
 </PostContextProvider>
</UserContextProvider>
 

    </>
  )
}

export default App;
 
