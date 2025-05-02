
        import React, { useState, useEffect } from 'react';
        import { Grid, Box, Typography, CircularProgress } from '@mui/material';
        import ProductCard from './ProductCard';
        import PaginationComponent from '../free/PaginationComponent';
        
        const ProductList = () => {
          const [products, setProducts] = useState([]);
          const [page, setPage] = useState(0);
          const [size] = useState(12); // Số sản phẩm mỗi trang
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState('');
        
          useEffect(() => {
            setLoading(true);
            fetch('http://localhost:6868/api/product')
              .then((res) => {
                if (!res.ok) throw new Error('Không thể tải danh sách sản phẩm');
                return res.json();
              })
              .then((data) => {
        // Ánh xạ ProductDTO sang định dạng cho ProductCard
                const mappedProducts = data.map((product) => ({
                  id: product.id,
                  name: product.name,
                  author: product.author,
                  image: product.images?.[0]?.imagePath || '/demo/images/placeholder.png',
                  discount: product.discountPercentage ? `${product.discountPercentage}% OFF` : null,
                  price: product.price,
                  salePrice: product.salePrice || null,
                  rating: 4, // Giả lập, chờ EntityRating
                }));
                setProducts(mappedProducts);
                setLoading(false);
              })
              .catch((err) => {
                setError('Lỗi khi tải sản phẩm');
                setLoading(false);
                console.error('Error:', err);
              });
          }, []);
        
          const totalPages = Math.ceil(products.length / size);
          const displayedProducts = products.slice(page * size, (page + 1) * size);
        
          const handlePageChange = (newPage) => {
            setPage(newPage);
          };
        
          if (loading) {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            );
          }
        
          if (error) {
            return (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
              </Box>
            );
          }
        
          if (products.length === 0) {
            return (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography>Không có sản phẩm</Typography>
              </Box>
            );
          }
        
          return (
            <>
              <Grid container spacing={2}>
                {displayedProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product.id}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              <PaginationComponent
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          );
        };
        
        export default ProductList;