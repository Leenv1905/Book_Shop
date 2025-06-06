// TODO
// API: Fetch dữ liệu từ /api/orders, /api/users, /api/products và gửi dữ liệu qua POST/PUT.
// Rating riêng lẻ: Nếu muốn mỗi sản phẩm có rating và comment riêng trong cơ sở dữ liệu, cần điều chỉnh cấu trúc dữ liệu reviews.
// rating riêng cho từng sản phẩm (CÁI NÀY QUAN TRỌN, CẦN THAY ĐỔI CẢ CSDL, NẾU KO PHẢI LOGIC CHON ĐÁNH GIÁ Ở 1 Ô THÌ TẤT CẢ CÁC Ô KHÁC ĂN THEO)
// Xác nhận: Thêm dialog xác nhận trước khi submit.
// xử lý COMMENT ĐÁNH GIÁ CHUNG TƯƠNG TỰ RATING
// CREATE TABLE reviews (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   orderId INT,
//   userId INT,
//   productId INT,
//   rating INT,
//   comment TEXT,
//   dateReview DATE,
//   FOREIGN KEY (orderId) REFERENCES orders(id),
//   FOREIGN KEY (userId) REFERENCES users(id),
//   FOREIGN KEY (productId) REFERENCES products(id)
// );
// BẢNG REVIEWS CẦN CÓ CẤU TRÚC NHƯ NÀY
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

// Dữ liệu mẫu
const users = [
  { id: 1, name: 'Lee Jung Joe' },
  { id: 2, name: 'Park Ji Sung' },
];

const products = [
  { id: 1, name: 'Life Skills for Tweens' },
  { id: 2, name: '101 Things Every Kid Needs To Know' },
  { id: 3, name: 'Life Skills for Teens' },
];

const orders = [
  {
    id: 1,
    userId: 1,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
  },
  {
    id: 2,
    userId: 2,
    products: [{ productId: 3, quantity: 1 }],
  },
];

function AddReview() {
  const navigate = useNavigate();

  // State cho form
  const [dateReview, setDateReview] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Xử lý thay đổi ngày
  const handleDateChange = (e) => {
    setDateReview(e.target.value);
    setError('');
  };

  // Xử lý khi chọn đơn hàng từ Autocomplete
  const handleOrderChange = (event, newValue) => {
    setSelectedOrder(newValue);
    if (newValue) {
      const orderProducts = orders
        .find((o) => o.id === newValue.id)
        .products.map((item) => ({
          productId: item.productId,
          name: products.find((p) => p.id === item.productId)?.name || 'Không xác định',
          rating: 0, // Rating riêng cho từng sản phẩm
          comment: '',
        }));
      setSelectedProducts(orderProducts);
    } else {
      setSelectedProducts([]);
    }
    setError('');
  };

  // Xử lý thay đổi rating cho từng sản phẩm
  const handleRatingChange = (productId, newValue) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.productId === productId ? { ...product, rating: newValue } : product
      )
    );
  };

  // Xử lý thay đổi comment cho từng sản phẩm
  const handleCommentChange = (productId, value) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.productId === productId ? { ...product, comment: value } : product
      )
    );
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    if (!dateReview || !selectedOrder) return false;
    return selectedProducts.every((p) => p.rating > 0 && p.comment.trim() !== '');
  };

  // Mở dialog xác nhận
  const handleOpenDialog = (e) => {
    e.preventDefault();
    if (!isValid()) {
      setError('Vui lòng điền đầy đủ ngày, đơn hàng, điểm đánh giá và bình luận cho từng sản phẩm');
      return;
    }
    setOpenDialog(true);
  };

  // Đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Xử lý submit form
  const handleSubmit = () => {
    const reviewData = selectedProducts.map((product) => ({
      dateReview,
      orderId: selectedOrder.id,
      userId: orders.find((o) => o.id === selectedOrder.id).userId,
      productId: product.productId,
      rating: product.rating,
      comment: product.comment,
    }));

    console.log('Thêm reviews:', reviewData);
    setOpenDialog(false);
    navigate('/admin/review');
  };

  return (
    <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#1a2820',
          letterSpacing: '0.5px',
          mb: 3,
        }}
      >
        Thêm đánh giá mới
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box component="form" onSubmit={handleOpenDialog}>
          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: '8px',
                mb: 2,
              }}
            >
              {error}
            </Alert>
          )}

          {/* Ô chọn ngày */}
          <TextField
            label="Ngày đánh giá"
            type="date"
            value={dateReview}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
            required
          />

          {/* Ô chọn đơn hàng */}
          <Autocomplete
            options={orders}
            getOptionLabel={(option) => {
              const user = users.find((u) => u.id === option.userId);
              return `${option.id} - Khách hàng: ${user ? user.name : 'Không xác định'}`;
            }}
            onChange={handleOrderChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn đơn hàng"
                placeholder="Gõ ID đơn hàng"
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
                required
              />
            )}
            fullWidth
          />

          {/* Bảng sản phẩm đã chọn */}
          {selectedProducts.length > 0 && (
            <TableContainer
              sx={{
                mt: 2,
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Table>
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
                    <TableCell>ID sản phẩm</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Điểm đánh giá</TableCell>
                    <TableCell>Bình luận</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow
                      key={product.productId}
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
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Rating
                          value={product.rating}
                          onChange={(e, newValue) =>
                            handleRatingChange(product.productId, newValue)
                          }
                          precision={1}
                          sx={{ color: 'yelow' }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={product.comment}
                          onChange={(e) =>
                            handleCommentChange(product.productId, e.target.value)
                          }
                          size="small"
                          fullWidth
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Nút submit và hủy */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedOrder}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3,
                py: 1,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  bgcolor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.600',
                },
              }}
            >
              Thêm
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/admin/review')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3,
                py: 1,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'grey.50',
                },
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Dialog xác nhận */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            color: '#1a2820',
          }}
        >
          Xác nhận thêm đánh giá
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: 'text.secondary',
            }}
          >
            Bạn có chắc muốn thêm các đánh giá này? Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.50',
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.50',
                color: 'primary.dark',
              },
            }}
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddReview;