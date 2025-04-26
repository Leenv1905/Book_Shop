import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from '@mui/material';

function AddSupplier() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const isValid = () => {
    return (
      supplier.name.trim() !== '' &&
      supplier.address.trim() !== '' &&
      supplier.phoneNumber.trim() !== '' &&
      supplier.email.trim() !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const supplierData = {
      name: supplier.name,
      address: supplier.address,
      phoneNumber: supplier.phoneNumber,
      email: supplier.email,
    };
    console.log('Thêm supplier:', supplierData);
    navigate('/admin/supplier');
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
        THÊM NHÀ CUNG CẤP MỚI
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên"
                name="name"
                value={supplier.name}
                onChange={handleChange}
                required
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
                name="email"
                type="email"
                value={supplier.email}
                onChange={handleChange}
                required
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={supplier.address}
                onChange={handleChange}
                required
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
                label="Số điện thoại"
                name="phoneNumber"
                value={supplier.phoneNumber}
                onChange={handleChange}
                required
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
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Thêm
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/supplier')}
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

export default AddSupplier;