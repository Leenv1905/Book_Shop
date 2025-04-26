import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Dữ liệu mẫu
const products = [
  { id: 1, name: 'Sách A' },
  { id: 2, name: 'Sách B' },
];

const suppliers = [
  { id: 1, name: 'Nhà cung cấp A' },
  { id: 2, name: 'Nhà cung cấp B' },
];

const importProducts = [
  {
    id: 1,
    supplierId: 1,
    importDate: '2025-04-01',
    items: [
      { productId: 1, price: 40000, quantity: 50, name: 'Sách A' },
      { productId: 2, price: 60000, quantity: 30, name: 'Sách B' },
    ],
  },
  {
    id: 2,
    supplierId: 2,
    importDate: '2025-04-02',
    items: [
      { productId: 1, price: 45000, quantity: 20, name: 'Sách A' },
    ],
  },
];

function EditImportProduct() {
  const { importId } = useParams();
  const navigate = useNavigate();
  const initialImport = importProducts.find((i) => i.id === parseInt(importId)) || {};

  // State cho thông tin phiếu nhập
  const [importProduct, setImportProduct] = useState({
    supplierId: initialImport.supplierId || null,
    importDate: initialImport.importDate || '',
    items: initialImport.items || [],
  });
  const [error, setError] = useState('');

  // Xử lý thay đổi nhà cung cấp
  const handleSupplierChange = (event, newValue) => {
    setImportProduct((prev) => ({ ...prev, supplierId: newValue ? newValue.id : null }));
    setError('');
  };

  // Xử lý khi chọn sản phẩm (tự động thêm vào danh sách)
  const handleProductChange = (event, newValue) => {
    if (newValue && !importProduct.items.some((item) => item.productId === newValue.id)) {
      setImportProduct((prev) => ({
        ...prev,
        items: [...prev.items, { productId: newValue.id, name: newValue.name, price: '', quantity: '' }],
      }));
    }
  };

  // Xử lý thay đổi giá và số lượng trong bảng
  const handleItemDetailChange = (productId, field, value) => {
    setImportProduct((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Xử lý xóa sản phẩm khỏi danh sách
  const handleRemoveItem = (productId) => {
    setImportProduct((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    return (
      importProduct.supplierId !== null &&
      importProduct.items.length > 0 &&
      importProduct.items.every(
        (item) => item.price !== '' && item.quantity !== '' && parseInt(item.quantity) > 0
      )
    );
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError('Vui lòng chọn nhà cung cấp và điền đầy đủ giá, số lượng cho tất cả sản phẩm');
      return;
    }

    const importData = {
      id: parseInt(importId),
      supplierId: importProduct.supplierId,
      importDate: importProduct.importDate,
      items: importProduct.items.map(({ productId, price, quantity }) => ({
        productId,
        price: parseFloat(price) || 0,
        quantity: parseInt(quantity) || 0,
      })),
    };
    console.log('Cập nhật phiếu nhập:', importData);
    navigate('/admin/import-products');
  };

  if (!initialImport.id) {
    return (
      <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1a2820',
          }}
        >
          Không tìm thấy phiếu nhập
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
        CHỈNH SỬA PHIẾU NHẬP HÀNG #{importId}
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

          {/* Ô chọn nhà cung cấp và sản phẩm */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={suppliers}
                value={suppliers.find((s) => s.id === importProduct.supplierId) || null}
                getOptionLabel={(option) => `${option.id} - ${option.name}`}
                onChange={handleSupplierChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn nhà cung cấp"
                    required
                    sx={{
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
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={products.filter(
                  (p) => !importProduct.items.some((item) => item.productId === p.id)
                )}
                getOptionLabel={(option) => `${option.id} - ${option.name}`}
                onChange={handleProductChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn sản phẩm"
                    placeholder="Gõ ID hoặc tên sản phẩm"
                    sx={{
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
                )}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Bảng danh sách sản phẩm */}
          {importProduct.items.length > 0 && (
            <TableContainer
              sx={{
                mt: 2,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="edit import product table">
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
                    <TableCell>ID</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Giá (VNĐ)</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {importProduct.items.map((item) => (
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
                      <TableCell>{item.productId}</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{item.name}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleItemDetailChange(item.productId, 'price', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0 }}
                          sx={{
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
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemDetailChange(item.productId, 'quantity', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0 }}
                          sx={{
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
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleRemoveItem(item.productId)}
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              gap: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={importProduct.items.length === 0}
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
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.600',
                },
              }}
            >
              Lưu
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/import-products')}
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

export default EditImportProduct;