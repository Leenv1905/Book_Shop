import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';

import Footer from './Footer';
import Header from './Header';



function LayoutHome() {
 
  return (
    <>
      <Header />
    

      <main style={{ flexGrow: 1 }}>
        <Outlet />
        {/* kết xuất nội dung các trang được tải vào Layout */}
      </main>

      <Toolbar />

      <Footer />
    </>
  )
}
export default LayoutHome;



