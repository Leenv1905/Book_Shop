import React from "react";
import { Grid, Container } from "@mui/material";
import ProductList from "../../components/display/free/ProductList";
import Sidebar from "../../components/display/free/Sidebar";
import PaginationComponent from '../../components/display/free/PaginationComponent'; // Component phân trang
import ProductFilter from '../../components/display/free/ProductFilter'; // Component lọc sản phẩm

const ShopPage = () => {
  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Product Filter */}
          <ProductFilter />

          {/* Product List */}
          <ProductList />

          {/* Pagination */}
          <PaginationComponent />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopPage;
