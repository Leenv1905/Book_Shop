// Đây là Card bài viết, có thể tái sử dụng

import React from "react";
import { Box, Typography, Link, Card, CardMedia, CardContent } from "@mui/material";

const PostCard = ({ image, category, title, description, postLink, categoryLink }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 0, maxWidth: 345, position: "relative" }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Post image"
        sx={{ borderRadius: "12px 12px 0 0", position: "absolute", top: 0, left: 0, width: "100%" }}
      />
      <CardContent sx={{ paddingTop: '210px' }}>
        {/* Điều chỉnh padding top để không bị che bởi CardMedia
        Nếu không có padding top, phần nội dung sẽ bị che bởi CardMedia
        Nếu không phải bỏ absolute và relative phía trên đi
        */}
        <Link href={categoryLink} underline="hover" color="primary" variant="body2">
          {category}
        </Link>
        <Typography variant="h6" component="h4" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
          <Link href={postLink} underline="none" color="text.primary"
          sx={{ '&:hover': { color: '#F86D72', textDecoration: 'none', } }}
          >
            {title}
          </Link>
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" > */}
        <Typography variant="body2" color="text.secondary" sx={{fontSize: '18px' }} >

          {description}{" "}
          <Link href={postLink} underline="hover" color="text.primary">
            Read More
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
