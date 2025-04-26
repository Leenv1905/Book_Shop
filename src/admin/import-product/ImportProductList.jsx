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
  Collapse,
  IconButton,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Dữ liệu mẫu
const products = [
  { id: 1, name: 'Sách A' },
  { id: 2, name: 'Sách B' },
  { id: 3, name: 'Sách C' },
  { id: 4, name: 'Sách D' },
];

const suppliers = [
  { id: 1, name: 'Nhà cung cấp A' },
  { id: 2, name: 'Nhà cung cấp B' },
  { id: 3, name: 'Nhà cung cấp C' },
  { id: 4, name: 'Nhà cung cấp D' },
];

const importProducts = [
  {
    id: 1,
    supplierId: 1,
    importDate: '2025-04-01',
    items: [
      { productId: 1, price: 40000, quantity: 50 },
      { productId: 2, price: 60000, quantity: 30 },
    ],
  },
  {
    id: 2,
    supplierId: 2,
    importDate: '2025-04-02',
    items: [
      { productId: 1, price: 45000, quantity: 20 },
    ],
  },
  {
    id: 3,
    supplierId: 3,
    importDate: '2025-04-03',
    items: [
      { productId: 3, price: 50000, quantity: 40 },
      { productId: 4, price: 70000, quantity: 10 },
    ],
  },
  {
    id: 4,
    supplierId: 4,
    importDate: '2025-04-04',
    items: [
      { productId: 2, price: 62000, quantity: 25 },
    ],
  },
  {
    id: 5,
    supplierId: 1,
    importDate: '2025-04-05',
    items: [
      { productId: 1, price: 42000, quantity: 60 },
      { productId: 3, price: 48000, quantity: 15 },
    ],
  },
  {
    id: 6,
    supplierId: 2,
    importDate: '2025-04-06',
    items: [
      { productId: 4, price: 75000, quantity: 20 },
    ],
  },
  {
    id: 7,
    supplierId: 3,
    importDate: '2025-04-07',
    items: [
      { productId: 2, price: 61000, quantity: 35 },
      { productId: 3, price: 49000, quantity: 20 },
    ],
  },
  {
    id: 8,
    supplierId: 4,
    importDate: '2025-04-08',
    items: [
      { productId: 1, price: 43000, quantity: 30 },
    ],
  },
  {
    id: 9,
    supplierId: 1,
    importDate: '2025-04-09',
    items: [
      { productId: 4, price: 72000, quantity: 15 },
      { productId: 2, price: 60000, quantity: 40 },
    ],
  },
  {
    id: 10,
    supplierId: 2,
    importDate: '2025-04-10',
    items: [
      { productId: 3, price: 51000, quantity: 25 },
    ],
  },
];

function ImportProductList() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleEditImport = (importId) => {
    navigate(`/admin/edit-import-product/${importId}`);
  };

  const handleDeleteImport = (importId) => {
    if (window.confirm('Bạn có chắc muốn xóa phiếu nhập này?')) {
      console.log(`Xóa phiếu nhập với ID: ${importId}`);
      // Gọi API để xóa tại đây
    }
  };

  const handleAddImport = () => {
    navigate('/admin/create-import-product');
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : 'Không xác định';
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    return supplier ? supplier.name : 'Không xác định';
  };

  const getTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
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
          mb: 2,
          flexWrap: 'wrap',
          gap: 2,
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
          DANH SÁCH PHIẾU NHẬP HÀNG
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddImport}
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
          Thêm phiếu nhập
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
        <Table sx={{ minWidth: 650 }} aria-label="import product table">
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
              <TableCell>ID phiếu nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Tổng số lượng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {importProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((importProduct) => (
                <React.Fragment key={importProduct.id}>
                  <TableRow
                    onClick={() => handleRowClick(importProduct.id)}
                    sx={{
                      cursor: 'pointer',
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
                    <TableCell>{importProduct.id}</TableCell>
                    <TableCell>{importProduct.importDate}</TableCell>
                    <TableCell>{getTotalQuantity(importProduct.items)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditImport(importProduct.id);
                        }}
                        sx={{
                          color: 'warning.main',
                          '&:hover': { bgcolor: 'warning.light', transform: 'scale(1.1)' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImport(importProduct.id);
                        }}
                        sx={{
                          color: 'error.main',
                          '&:hover': { bgcolor: 'error.light', transform: 'scale(1.1)' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                      <Collapse in={expandedId === importProduct.id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                              fontWeight: 'medium',
                              color: '#1a2820',
                            }}
                          >
                            Chi tiết phiếu nhập hàng
                          </Typography>
                          <Table
                            size="small"
                            sx={{
                              borderRadius: '8px',
                              border: '1px solid',
                              borderColor: 'grey.200',
                            }}
                          >
                            <TableHead>
                              <TableRow
                                sx={{
                                  backgroundColor: 'grey.100',
                                  '& th': {
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                    py: 1.5,
                                    borderBottom: '1px solid',
                                    borderColor: 'grey.300',
                                  },
                                }}
                              >
                                <TableCell>ID sản phẩm</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Nhà cung cấp</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {importProduct.items.map((item, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'grey.50',
                                      transition: 'background-color 0.2s',
                                    },
                                    '& td': {
                                      py: 1,
                                      borderBottom: '1px solid',
                                      borderColor: 'grey.200',
                                    },
                                  }}
                                >
                                  <TableCell>{item.productId}</TableCell>
                                  <TableCell sx={{ fontWeight: 'medium' }}>
                                    {getProductName(item.productId)}
                                  </TableCell>
                                  <TableCell>{item.price.toLocaleString()} VNĐ</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>{getSupplierName(importProduct.supplierId)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={importProducts.length}
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

export default ImportProductList;