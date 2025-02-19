import React from "react";
import GalleryProduct from '../../components/display/free/GalleryProduct'; // Component lọc sản phẩm
import { Box, Typography, Button, Stack } from "@mui/material";

const ProductDetail = () => {
  const product = {
    title: "The Emerald Crown",
    price: 200,
    oldPrice: 260,
    description: "Justo, cum feugiat imperdiet nulla molestie...",
    stock: 2,
    images: [
      "/demo/images/product-large-1.png",
      "/demo/images/product-large-2.png",
      "/demo/images/product-large-3.png",
      "/demo/images/product-large-3.png",
      "/demo/images/product-large-3.png",
      "/demo/images/product-thumbnail-1.png",
      "/demo/images/product-thumbnail-2.png",
      "/demo/images/product-thumbnail-3.png",
      "/demo/images/product-thumbnail-3.png",
      "/demo/images/product-thumbnail-3.png",
    ],
  };

  return (
    <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
      {/* Gallery bên trái */}
      <Box sx={{ width: "40%" }}>
        <GalleryProduct images={product.images} />
      </Box>

      {/* Thông tin sản phẩm bên phải */}
      <Box sx={{ width: "60%" }}>
        <Typography variant="h4" gutterBottom>{product.title}</Typography>
        <Typography variant="h5" color="primary">
          ${product.price} <del style={{ color: "gray" }}>${product.oldPrice}</del>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>Stock: {product.stock}</Typography>

        {/* Nút thao tác */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">Order Now</Button>
          <Button variant="outlined">Add to Cart</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;
