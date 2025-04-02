import React from 'react';
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
} from '@mui/material';

// Dữ liệu mẫu
const products = [
  { id: 1, name: 'Áo thun' },
  { id: 2, name: 'Quần jeans' },
  { id: 3, name: 'Giày thể thao' },
];

const discounts = [
  {
    id: 1,
    salePrice: 50000,
    dateCreate: '2025-03-01',
    dateStart: '2025-03-10',
    dateEnd: '2025-03-20',
    quantity: 100,
    productIds: [1],
  },
  {
    id: 2,
    salePrice: 100000,
    dateCreate: '2025-03-05',
    dateStart: '2025-03-15',
    dateEnd: '2025-03-25',
    quantity: 50,
    productIds: [2, 3],
  },
];

function DiscountList() {
  const navigate = useNavigate();

  const handleEditDiscount = (discountId) => {
    navigate(`/admin/edit-discount/${discountId}`);
  };

  const handleDeleteDiscount = (discountId) => {
    console.log(`Xóa discount với ID: ${discountId}`);
  };

  const handleAddDiscount = () => {
    navigate('/admin/add-discount');
  };

  // Hàm lấy danh sách tên sản phẩm từ productIds
  const getProductNames = (productIds) => {
    return productIds
      .map((id) => {
        const product = products.find((p) => p.id === id);
        return product ? product.name : 'Không xác định';
      })
      .join(', ');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách mã giảm giá</Typography>
        <Button variant="contained" color="primary" onClick={handleAddDiscount}>
          Thêm mã giảm giá
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="discount table">
          <TableHead>
            <TableRow>
              <TableCell>Giá giảm (VNĐ)</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell>{discount.salePrice.toLocaleString()}</TableCell>
                <TableCell>{discount.dateCreate}</TableCell>
                <TableCell>{discount.dateStart}</TableCell>
                <TableCell>{discount.dateEnd}</TableCell>
                <TableCell>{discount.quantity}</TableCell>
                <TableCell>{getProductNames(discount.productIds)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditDiscount(discount.id)}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteDiscount(discount.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DiscountList;