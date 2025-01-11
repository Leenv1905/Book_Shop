import * as React from 'react';
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import CompanyServices from "../../components/display/free/CompanyServices";
import LimitedOffer from "../../components/display/free/LimitedOffer";
import BestSellingItems from "../../components/display/free/BestSellingItems";
import ProductSection from "../../components/display/GroupItems/ProductSection";
import CategoriesSection from "../../components/display/free/CategoriesSection";
import CustomerReviewsSlider from "../../components/action/CustomerReviewsSlider";
import LatestPosts from "../../components/display/free/LatestPosts";



export default function Home() {
  
  return (
    <>
      <CompanyServices />
      <LimitedOffer />
      <BestSellingItems />
      <ProductSection />
      <CategoriesSection />
      <CustomerReviewsSlider />
      <LatestPosts />

      <Box sx={{ flexGrow: 1, padding: { xs: '20px', md: '30px' }, }}>
        <Typography variant="h6" noWrap component="div"
          sx={{
            flexGrow: 1,
            // marginBottom: { xs: '100px', md: '100px' },
            display: { xs: 'block', sm: 'block' },
            transition: 'width 0.3s ease, margin 0.3s ease',
            backgroundColor: 'white',
            color:'#347c69',
            margin: 'auto',
            textAlign: 'center',
            fontSize: '30px',
            fontFamily: 'Roboto, sans-serif', // Sử dụng font Roboto
            position: 'relative', // Để có thể định vị đường kẻ ngang
            '&:after': {
              content: '""',
              display: 'block',
              width: '10%',
              height: '15px',
              backgroundColor: 'red', // Màu đỏ cho đường kẻ ngang
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '-10px', // Cách chữ 10px
            },
          }} >
          BEST SELLERS
        </Typography>



      </Box>


    </>
  );
}