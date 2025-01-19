import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard'; // Đường dẫn tới ProductCard

const ProductList = () => {
  // Dữ liệu mẫu (Bạn có thể thay thế bằng dữ liệu từ API hoặc props)
  const products = [
    {
      id: 1,
      name: 'Product 1',
      author: 'Author 1',
      image: '/demo/images/product-item1.png',
      discount: '10% OFF',
      price: 20.99,
      rating: 4,
    },
    {
      id: 2,
      name: 'Product 2',
      author: 'Author 2',
      image: '/demo/images/product-item1.png',
      discount: '15% OFF',
      price: 15.49,
      rating: 5,
    },
    {
      id: 3,
      name: 'Product 3',
      author: 'Author 3',
      image: '/demo/images/product-item1.png',
      discount: null, // Không có giảm giá
      price: 30.0,
      rating: 3,
    },
    {
      id: 4,
      name: 'Product 3',
      author: 'Author 3',
      image: '/demo/images/product-item1.png',
      discount: null, // Không có giảm giá
      price: 30.0,
      rating: 3,
    },
    {
      id: 5,
      name: 'Product 3',
      author: 'Author 3',
      image: '/demo/images/product-item1.png',
      discount: null, // Không có giảm giá
      price: 30.0,
      rating: 3,
    },
  ];

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
