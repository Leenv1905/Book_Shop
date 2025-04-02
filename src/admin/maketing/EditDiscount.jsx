import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

// Dữ liệu mẫu
const products = [
  { id: 1, name: 'Áo thun' },
  { id: 2, name: 'Quần jeans' },
  { id: 3, name: 'Giày thể thao' },
];

const discountData = {
  1: {
    id: 1,
    salePrice: 50000,
    dateCreate: '2025-03-01',
    dateStart: '2025-03-10',
    dateEnd: '2025-03-20',
    quantity: 100,
    productIds: [1], // Thay productId thành productIds (mảng)
  },
  2: {
    id: 2,
    salePrice: 100000,
    dateCreate: '2025-03-05',
    dateStart: '2025-03-15',
    dateEnd: '2025-03-25',
    quantity: 50,
    productIds: [2, 3], // Ví dụ chọn nhiều sản phẩm
  },
};

function EditDiscount() {
  const { discountId } = useParams();
  const navigate = useNavigate();
  const initialDiscount = discountData[discountId] || {};

  const [discount, setDiscount] = useState({
    salePrice: initialDiscount.salePrice || '',
    dateCreate: initialDiscount.dateCreate || '',
    dateStart: initialDiscount.dateStart || '',
    dateEnd: initialDiscount.dateEnd || '',
    quantity: initialDiscount.quantity || '',
    productIds: initialDiscount.productIds || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscount((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (event, newValue) => {
    setDiscount((prev) => ({
      ...prev,
      productIds: newValue.map((product) => product.id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cập nhật discount:', discount);
    navigate('/admin/discount');
  };

  if (!initialDiscount.id) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy mã giảm giá</Typography>
      </Box>
    );
  }

  // Lấy danh sách sản phẩm đã chọn để hiển thị mặc định trong Autocomplete
  const selectedProducts = products.filter((product) =>
    discount.productIds.includes(product.id)
  );

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa mã giảm giá #{discountId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Giá giảm (VNĐ)"
            name="salePrice"
            type="number"
            value={discount.salePrice}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Ngày tạo"
            name="dateCreate"
            type="date"
            value={discount.dateCreate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Ngày bắt đầu"
            name="dateStart"
            type="date"
            value={discount.dateStart}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Ngày kết thúc"
            name="dateEnd"
            type="date"
            value={discount.dateEnd}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Số lượng"
            name="quantity"
            type="number"
            value={discount.quantity}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Autocomplete
            multiple
            options={products}
            getOptionLabel={(option) => option.name}
            value={selectedProducts}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sản phẩm"
                margin="normal"
                required={discount.productIds.length === 0}
              />
            )}
            fullWidth
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Lưu
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/discount')}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditDiscount;