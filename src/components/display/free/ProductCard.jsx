import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Icon cho sao
import CardActions from '../../action/CardActions';


const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        position: 'relative',
        p: 2,
        borderRadius: 3,
        boxShadow: "none", // Tắt bóng đổ
        border: "1px solid #ddd", // (Tuỳ chọn) Thêm viền nhạt để phân biệt
        bgcolor: 'background.paper',
        width: 220,  // Kích thước chiều rộng của card
        height: 420, // Kích thước chiều cao của card
        display: 'flex',
        flexDirection: 'column',
        // Hiển thị CardActions khi hover
        overflow: 'hidden',
        '&:hover .card-actions': {
          opacity: '1 !important', // Hiển thị CardActions khi hover
        },
      }}
    >
         {/* Các nút hành động CardActions */}
         <CardActions
         className="card-actions" // Đặt tên class để truyền vào CSS selectors
        sx={{
          position: 'absolute',
          top: '93%',
          left: '75%',
          transform: 'translate(-50%, -50%)', // Căn giữa
          opacity: 0, // Ẩn mặc định
          transition: 'opacity 0.3s ease', // Hiệu ứng mượt mà
          zIndex: 2,
        }}
      />

       {/* Hiển thị giảm giá */}
      {product.discount && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: '#F86D72',
            color: 'white',
            borderRadius: 1,
            px: 1,
            py: 0.5,
            fontSize: '0.8rem',
          }}
        >
          {product.discount}
        </Box>
      )}

      <CardMedia
        component="img"
        // height="350"
        height="auto" // Chiều cao của ảnh
        image={product.image}
        alt={product.name}
        sx={{ borderRadius: 2, boxShadow: 2 }}
      />
      
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h7" component="div" 
        sx={{ 
            fontWeight: 'bold', 
            mb: 1, 
            whiteSpace: 'nowrap', // Không xuống dòng
            overflow: 'hidden',  // Ẩn phần chữ tràn
            textOverflow: 'ellipsis', // Hiển thị dấu "..."
            }}>
          {product.name}
        </Typography>

{/* TÁC GIẢ VÀ ĐÁNH GIÁ CÓ 2 CÁCH TRÌNH BÀY, CHIA 2 DÒNG HOẶC GỘP LÀM 1 */}
        {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.author}
        </Typography>

        <Box 
        sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1, 
            // justifyContent: 'center',  
            }}>
          {Array.from({ length: product.rating }, (_, index) => (
            <StarIcon key={index} sx={{ color: 'gold', fontSize: 16 }} />
          ))}
        </Box> */}

        {/* Tác giả và Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mr: 1, // Khoảng cách giữa tên tác giả và rating
              whiteSpace: 'nowrap', // Không xuống dòng
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.author}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: product.rating }, (_, index) => (
              <StarIcon key={index} sx={{ color: 'gold', fontSize: 16, fontWeight: 'bold' }} />
            ))}
          </Box>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F86D72', }}>
          $ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
