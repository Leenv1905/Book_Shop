import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import Header from "./layouts/home/header/Header";
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ProtectedRoute from "./layouts/protected/ProtectedRoute"; // Quản lý trạng thái đăng nhập
import UserModal from "./layouts/home/header/UserModal"; // Hiển thị UserModal

// ĐOẠN NÀY LÀ GIAO DIỆN NGƯỜI DÙNG
import LayoutHome from "./layouts/home/LayoutHome";
import Home from "./pages/home/Home";
import About from "./pages/home/About";
import ShopPage from "./pages/home/ShopPage";
import BlogPage from "./pages/home/BlogPage";
import ContactPage from "./pages/home/ContactPage";
import SinglePost from "./pages/home/SinglePost";
import ProductDetail from "./components/display/product/ProductDetail";
import Cart from "./pages/buy/Cart";
import CheckOut from "./pages/buy/CheckOut";
import CustomerProfile from "./pages/customer/CustomerProfile";

// ĐOẠN NÀY LÀ GIAO DIỆN ADMIN
import LayoutAdmin from "./admin/layout/LayoutAdmin";
import AllProduct from "./admin/product/AllProduct";
import AddProduct from "./admin/product/AddProduct";
import EditProduct from "./admin/product/EditProduct";
import ProductView from "./admin/product/ProductView";


// ĐOẠN NÀY LÀ TEST

function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập theo mặc định, f5 là mất
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);
  // Lưu trạng thái đăng nhập vào localStorage

  const [showLoginModal, setShowLoginModal] = useState(false); // Điều khiển UserModal

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false); // Đóng modal sau khi đăng nhập thành công
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
        isAuthenticated={isAuthenticated}
        setShowLoginModal={setShowLoginModal}
        setIsAuthenticated={setIsAuthenticated}
        />
        {/* <UserModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setShowLoginModal(false);
          }}
        /> */}
        <Routes>

          <Route path="/" element={<LayoutHome />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="singlepost" element={<SinglePost />} />
            <Route path="productdetail" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />

            <Route path="checkout" element={<ProtectedRoute isAuthenticated={isAuthenticated} setShowLoginModal={setShowLoginModal} // Truyền hàm mở UserModal
            ><CheckOut /></ProtectedRoute>} />

            <Route path="customerprofile" element={<CustomerProfile />} />


          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<AllProduct />} />
            <Route path="allproduct" element={<AllProduct />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct" element={<EditProduct />} />
            <Route path="productview" element={<ProductView />} />
            {/* <Route path="about" element={<About />} /> */}

          </Route>

        </Routes>

        {/* Hiển thị UserModal khi cần đăng nhập */}
        {/* <UserModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setShowLoginModal(false);
          }}
        /> */}

<UserModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
