import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

// ĐOẠN NÀY LÀ TEST
import LayoutHome from "./layouts/home/LayoutHome";
import Home from "./pages/home/Home";
import About from "./pages/home/About";
import ShopPage from "./pages/home/ShopPage";
import BlogPage from "./pages/home/BlogPage";
import ContactPage from "./pages/home/ContactPage";
import SinglePost from "./pages/home/SinglePost";
import ProductDetail from "./pages/home/ProductDetail";



// ĐOẠN NÀY LÀ TEST

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>

          <Route path="/" element={<LayoutHome />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="singlepost" element={<SinglePost />} />
            <Route path="productdetail" element={<ProductDetail />} />


          </Route>


        </Routes>
        </BrowserRouter>
       </ThemeProvider>
  );
}

export default App;
