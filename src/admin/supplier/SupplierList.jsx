import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Dữ liệu mẫu
const suppliers = [
  { id: 1, name: 'Supplier A', address: '123 Đường A, TP.HCM', phoneNumber: '0901234567', email: 'supa@gmail.com' },
  { id: 2, name: 'Supplier B', address: '456 Đường B, Hà Nội', phoneNumber: '0909876543', email: 'supb@gmail.com' },
  { id: 3, name: 'Supplier C', address: '789 Đường C, Đà Nẵng', phoneNumber: '0912345678', email: 'supc@gmail.com' },
  { id: 4, name: 'Supplier D', address: '101 Đường D, Cần Thơ', phoneNumber: '0908765432', email: 'supd@gmail.com' },
  { id: 5, name: 'Supplier E', address: '202 Đường E, Hải Phòng', phoneNumber: '0913456789', email: 'supe@gmail.com' },
  { id: 6, name: 'Supplier F', address: '303 Đường F, TP.HCM', phoneNumber: '0907654321', email: 'supf@gmail.com' },
  { id: 7, name: 'Supplier G', address: '404 Đường G, Hà Nội', phoneNumber: '0914567890', email: 'supg@gmail.com' },
  { id: 8, name: 'Supplier H', address: '505 Đường H, Đà Nẵng', phoneNumber: '0906543210', email: 'suph@gmail.com' },
  { id: 9, name: 'Supplier I', address: '606 Đường I, Cần Thơ', phoneNumber: '0915678901', email: 'supi@gmail.com' },
  { id: 10, name: 'Supplier J', address: '707 Đường J, Hải Phòng', phoneNumber: '0905432109', email: 'supj@gmail.com' },
];

function SupplierList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleEditSupplier = (supplierId) => {
    navigate(`/admin/edit-supplier/${supplierId}`);
  };

  const handleDeleteSupplier = (supplierId) => {
    console.log(`Xóa supplier với ID: ${supplierId}`);
    // Gọi API để xóa supplier tại đây
  };

  const handleAddSupplier = () => {
    navigate('/admin/add-supplier');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1a2820',
            letterSpacing: '0.5px',
          }}
        >
          DANH SÁCH NHÀ CUNG CẤP
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSupplier}
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
          }}
        >
          Thêm nhà cung cấp
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
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
              <TableCell>Tên</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.length > 0 ? (
              suppliers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((supplier) => (
                  <TableRow
                    key={supplier.id}
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
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>{supplier.phoneNumber}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => handleEditSupplier(supplier.id)}
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
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                          sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            px: 2,
                            py: 0.5,
                            borderColor: 'error.main',
                            color: 'error.main',
                            '&:hover': {
                              borderColor: 'error.dark',
                              bgcolor: 'grey.50',
                            },
                          }}
                        >
                          Xóa
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
                  Không có nhà cung cấp nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={suppliers.length}
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

export default SupplierList;