import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

function EditOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Danh sách trạng thái
  const statuses = ['Pending', 'Shipped', 'Completed', 'Cancelled'];

  // Fetch dữ liệu đơn hàng
  useEffect(() => {
    // Mô phỏng gọi API
    const data = orderDetailsData[orderId];
    if (data) {
      setOrder({
        id: data.id,
        date: data.date,
        total: data.total,
        status: data.status,
        user: data.user,
        items: data.items,
      });
      setLoading(false);
    } else {
      setError('Không tìm thấy đơn hàng');
      setLoading(false);
    }
  }, [orderId]);

  // Xử lý thay đổi trạng thái
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    return order && order.status;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) {
      setError('Vui lòng chọn trạng thái');
      return;
    }

    const updatedOrder = {
      id: order.id,
      date: order.date,
      total: order.total,
      status: order.status,
      user: order.user,
      items: order.items,
    };
    console.log('Cập nhật đơn hàng:', updatedOrder);
    navigate('/admin/order');
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
          }}
        >
          Đang tải...
        </Typography>
      </Box>
    );
  }

  if (error || !order) {
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
        CHỈNH SỬA ĐƠN HÀNG #{order.id}
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: '8px',
              }}
            >
              {error}
            </Alert>
          )}

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
          <Grid container spacing={2}>
            {/* Cột trái */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ngày đặt"
                name="date"
                value={order.date}
                disabled
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Tổng tiền (VNĐ)"
                name="total"
                value={order.total.toLocaleString()}
                disabled
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Trạng thái
                </InputLabel>
                <Select
                  name="status"
                  value={order.status}
                  onChange={handleChange}
                  required
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  }}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Cột phải */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Khách hàng"
                name="user.name"
                value={order.user.name}
                disabled
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="user.email"
                value={order.user.email}
                disabled
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Grid>
          </Grid>

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

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3,
                py: 1,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Lưu
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/order')}
              sx={{
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
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditOrder;