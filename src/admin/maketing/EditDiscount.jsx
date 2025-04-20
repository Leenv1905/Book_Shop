import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function EditDiscount() {
  const { discountId } = useParams();
  const navigate = useNavigate();
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [error, setError] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [initialDiscount, setInitialDiscount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:6868/api/product')
      .then((response) => {
        setProducts(
          response.data.map((p) => ({
            id: p.id,
            name: p.name,
            stock: p.quantity,
            originalPrice: p.price,
          }))
        );
      })
      .catch((err) => {
        setError('Không thể tải danh sách sản phẩm');
        console.error('Lỗi khi lấy sản phẩm:', err);
      });

    axios
      .get(`http://localhost:6868/api/discounts/${discountId}`)
      .then((response) => {
        const discount = response.data;
        setInitialDiscount(discount);
        setDateStart(discount.dateStart);
        setDateEnd(discount.dateEnd);
        // Lấy danh sách sản phẩm từ discount_product
        axios
          .get(`http://localhost:6868/api/discounts/${discountId}/products`)
          .then((productResponse) => {
            setSelectedProducts(
              productResponse.data.map((dp) => ({
                id: dp.product.id,
                name: dp.product.name,
                stock: dp.product.quantity,
                originalPrice: dp.product.price,
                salePrice: dp.salePrice.toString(),
                quantity: dp.quantity.toString(),
              }))
            );
          })
          .catch((err) => {
            setError('Không thể tải sản phẩm của mã giảm giá');
            console.error('Lỗi khi lấy sản phẩm của mã giảm giá:', err);
          });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            setError(`Mã giảm giá #${discountId} không tồn tại.`);
          } else {
            setError('Lỗi khi tải mã giảm giá.');
          }
        } else {
          setError('Không thể kết nối đến server.');
        }
        console.error('Lỗi khi lấy mã giảm giá:', err);
      })
      .finally(() => setLoading(false));
  }, [discountId]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateStart') setDateStart(value);
    if (name === 'dateEnd') setDateEnd(value);
    setError('');
  };

  const handleProductChange = (event, newValues) => {
    const updatedProducts = newValues.map((newValue) => {
      const existingProduct = selectedProducts.find((p) => p.id === newValue.id);
      return existingProduct || { ...newValue, salePrice: '', quantity: '' };
    });
    setSelectedProducts(updatedProducts);
    setError('');
  };

  const handleProductDetailChange = (id, field, value) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          if (field === 'quantity') {
            const quantity = parseInt(value) || 0;
            if (quantity > product.stock) {
              setError(`Số lượng không được vượt quá tồn kho (${product.stock})`);
              return { ...product, quantity: product.stock.toString() };
            }
          }
          if (field === 'salePrice') {
            const salePrice = parseFloat(value) || 0;
            if (salePrice > product.originalPrice) {
              setError(
                `Giá khuyến mại không được vượt quá giá gốc (${product.originalPrice.toLocaleString()} VNĐ)`
              );
              return { ...product, salePrice: product.originalPrice.toString() };
            }
          }
          return { ...product, [field]: value };
        }
        return product;
      })
    );
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
    setError('');
  };

  const isDateValid = () => {
    if (!dateStart || !dateEnd) return false;
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    return diffInDays >= 1;
  };

  const isProductsValid = () => {
    return selectedProducts.length > 0 &&
           selectedProducts.every(
             (p) => p.salePrice !== '' && p.quantity !== '' && parseInt(p.quantity) > 0
           );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDateValid()) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
      return;
    }

    if (!isProductsValid()) {
      setError('Vui lòng chọn ít nhất một sản phẩm và điền đầy đủ giá, số lượng khuyến mại');
      return;
    }

    const discountData = {
      id: parseInt(discountId),
      products: selectedProducts.map((p) => ({
        id: p.id,
        salePrice: parseFloat(p.salePrice),
        quantity: parseInt(p.quantity),
      })),
      dateCreate: initialDiscount.dateCreate,
      dateStart,
      dateEnd,
    };

    try {
      await axios.put(`http://localhost:6868/api/discounts/${discountId}`, discountData);
      navigate('/admin/discount');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError(`Mã giảm giá #${discountId} không tồn tại.`);
        } else {
          setError('Lỗi khi cập nhật mã giảm giá.');
        }
      } else {
        setError('Không thể kết nối đến server.');
      }
      console.error('Lỗi khi cập nhật mã giảm giá:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Đang tải...</Typography>
      </Box>
    );
  }

  if (!initialDiscount && error) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa chương trình khuyến mại #{discountId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Ngày bắt đầu"
              name="dateStart"
              type="date"
              value={dateStart}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="Ngày kết thúc"
              name="dateEnd"
              type="date"
              value={dateEnd}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Autocomplete
            multiple
            options={products}
            getOptionLabel={(option) => `${option.id} - ${option.name}`}
            filterOptions={(options, { inputValue }) => {
              const input = inputValue.toLowerCase();
              return options.filter(
                (option) =>
                  option.name.toLowerCase().includes(input) ||
                  option.id.toString().includes(input)
              );
            }}
            renderOption={(props, option) => (
              <li {...props}>
                {option.id} - {option.name} (Tồn kho: {option.stock}, Giá gốc:{' '}
                {option.originalPrice.toLocaleString()} VNĐ)
              </li>
            )}
            onChange={handleProductChange}
            value={selectedProducts}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn sản phẩm"
                placeholder="Gõ ID hoặc tên sản phẩm"
                margin="normal"
              />
            )}
            fullWidth
          />

          {selectedProducts.length > 0 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Tồn kho</TableCell>
                    <TableCell>Giá gốc (VNĐ)</TableCell>
                    <TableCell>Giá khuyến mại (VNĐ)</TableCell>
                    <TableCell>Số lượng khuyến mại</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.originalPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.salePrice}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'salePrice', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0, max: product.originalPrice }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'quantity', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0, max: product.stock }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              disabled={selectedProducts.length === 0}
            >
              Lưu
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/discount')}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditDiscount;