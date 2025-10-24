import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';

export default function Layout() {
  return (
    <div> 
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      
    </div>
  );
}
