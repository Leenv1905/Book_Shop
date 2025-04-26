import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

// Dữ liệu mẫu (có thể thay bằng API thực tế)
const orderDetailsData = {
  1: {
    id: 1,
    date: '2025-03-31',
    total: 150000,
    status: 'Completed',
    user: { name: 'User1', email: 'user1@gmail.com' },
    items: [
      { productId: 1, name: 'Áo thun', quantity: 2, price: 50000 },
      { productId: 2, name: 'Quần jeans', quantity: 1, price: 100000 },
    ],
  },
  2: {
    id: 2,
    date: '2025-03-31',
    total: 200000,
    status: 'Pending',
    user: { name: 'User2', email: 'user2@gmail.com' },
    items: [{ productId: 2, name: 'Quần jeans', quantity: 2, price: 100000 }],
  },
  3: {
    id: 3,
    date: '2025-03-30',
    total: 300000,
    status: 'Shipped',
    user: { name: 'User3', email: 'user3@gmail.com' },
    items: [{ productId: 3, name: 'Áo khoác', quantity: 2, price: 150000 }],
  },
};

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orderDetailsData[orderId] || {};

  if (!order.id) {
    return (
      <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
          }}
        >
          Không tìm thấy đơn hàng
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1a2820',
          letterSpacing: '0.5px',
        }}
      >
        CHI TIẾT ĐƠN HÀNG #{order.id}
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1a2820',
            mb: 2,
          }}
        >
          Thông tin đơn hàng
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            mb: 1,
          }}
        >
          Ngày đặt: {order.date}
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            mb: 1,
          }}
        >
          Trạng thái: {order.status}
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            mb: 1,
          }}
        >
          Tổng tiền: {order.total.toLocaleString()} VNĐ
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            mb: 2,
          }}
        >
          Khách hàng: {order.user.name} ({order.user.email})
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1a2820',
            mb: 2,
            mt: 3,
          }}
        >
          Danh sách sản phẩm
        </Typography>
        <TableContainer
          sx={{
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="order items table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: 'grey.100',
                  '& th': {
                    fontWeight: 'bold',
                    color: 'text.primary',
                    py: 2,
                    borderBottom: '2px solid',
                    borderColor: 'grey.300',
                  },
                }}
              >
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá (VNĐ)</TableCell>
                <TableCell>Thành tiền (VNĐ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'grey.50',
                      transition: 'background-color 0.2s',
                    },
                    '& td': {
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 'medium' }}>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toLocaleString()}</TableCell>
                  <TableCell>{(item.quantity * item.price).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="outlined"
          onClick={() => navigate('/admin/order')}
          sx={{
            mt: 3,
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'medium',
            px: 3,
            py: 1,
            borderColor: 'grey.400',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'grey.50',
            },
          }}
        >
          Quay lại
        </Button>
      </Paper>
    </Box>
  );
}

export default OrderDetails;