import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

// Dữ liệu mẫu cho Product
const products = [
  { id: 1, name: 'Áo thun' },
  { id: 2, name: 'Quần jeans' },
  { id: 3, name: 'Giày thể thao' },
];

function AddDiscount() {
  const navigate = useNavigate();
  const [discount, setDiscount] = useState({
    salePrice: '',
    dateCreate: '',
    dateStart: '',
    dateEnd: '',
    quantity: '',
    productIds: [], // Thay productId thành productIds (mảng)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscount((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (event, newValue) => {
    // newValue là mảng các sản phẩm được chọn
    setDiscount((prev) => ({
      ...prev,
      productIds: newValue.map((product) => product.id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thêm discount:', discount);
    navigate('/admin/discount');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm mã giảm giá mới
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
              Thêm
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

export default AddDiscount;