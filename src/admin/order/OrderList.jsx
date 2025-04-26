import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TablePagination,
} from '@mui/material';

// Dữ liệu mẫu (thay bằng API thực tế)
const orders = [
  { id: 1, userId: 1, date: '2025-03-25', total: 150000, status: 'Completed' },
  { id: 2, userId: 1, date: '2025-03-26', total: 200000, status: 'Pending' },
  { id: 3, userId: 2, date: '2025-03-27', total: 300000, status: 'Shipped' },
  { id: 4, userId: 2, date: '2025-03-28', total: 120000, status: 'Completed' },
  { id: 5, userId: 3, date: '2025-03-29', total: 250000, status: 'Pending' },
  { id: 6, userId: 1, date: '2025-03-30', total: 180000, status: 'Shipped' },
  { id: 7, userId: 3, date: '2025-03-31', total: 400000, status: 'Cancelled' },
  { id: 8, userId: 2, date: '2025-04-01', total: 350000, status: 'Completed' },
  { id: 9, userId: 1, date: '2025-04-02', total: 220000, status: 'Pending' },
  { id: 10, userId: 3, date: '2025-04-03', total: 500000, status: 'Shipped' },
];

function OrderList() {
  const { userId } = useParams(); // Lấy userId từ URL nếu có
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleViewDetails = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };

  const handleEdit = (orderId) => {
    navigate(`/admin/edit-order/${orderId}`);
  };

  // Lọc đơn hàng theo userId nếu có, nếu không thì hiển thị tất cả
  const filteredOrders = userId
    ? orders.filter((order) => order.userId === parseInt(userId))
    : orders;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        {userId ? `ĐƠN HÀNG CỦA NGƯỜI DÙNG #${userId}` : 'DANH SÁCH ĐƠN HÀNG'}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="order table">
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
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Tổng tiền (VNĐ)</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order.id}
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
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleViewDetails(order.id)}
                          sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            px: 2,
                            py: 0.5,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              bgcolor: 'primary.dark',
                            },
                          }}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => handleEdit(order.id)}
                          sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            px: 2,
                            py: 0.5,
                            borderColor: 'secondary.main',
                            color: 'secondary.main',
                            '&:hover': {
                              borderColor: 'secondary.dark',
                              bgcolor: 'grey.50',
                            },
                          }}
                        >
                          Sửa
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{
                    py: 2,
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  }}
                >
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} của ${count}`}
        sx={{
          mt: 2,
          '& .MuiTablePagination-toolbar': {
            backgroundColor: 'grey.50',
            borderRadius: '8px',
            py: 1,
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            color: 'text.secondary',
            fontWeight: 'medium',
          },
          '& .MuiTablePagination-actions button': {
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'grey.200',
            },
          },
        }}
      />
    </Box>
  );
}

export default OrderList;