import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

// Dữ liệu mẫu (thay bằng API thực tế)
const userData = {
  1: {
    id: 1,
    name: 'User 1',
    email: 'user1@gmail.com',
    phoneNumber: '0901234567',
    address: '123 Đường A, TP.HCM',
    birthDay: '1990-01-01',
    gender: 'Male',
    password: 'password123',
    avata: 'https://via.placeholder.com/40',
    roles: ['Admin'],
  },
  2: {
    id: 2,
    name: 'User 2',
    email: 'user2@gmail.com',
    phoneNumber: '0909876543',
    address: '456 Đường B, Hà Nội',
    birthDay: '1995-05-10',
    gender: 'Female',
    password: 'password456',
    avata: 'https://via.placeholder.com/40',
    roles: ['User'],
  },
};

function EditUser() {
  const { userId } = useParams();
//   useParams: Lấy userId từ URL để hiển thị thông tin người dùng tương ứng
  const navigate = useNavigate();
  const initialUser = userData[userId] || {};

  const [user, setUser] = useState({
    // useState: Quản lý trạng thái form với các trường của bảng User
    name: initialUser.name || '',
    email: initialUser.email || '',
    phoneNumber: initialUser.phoneNumber || '',
    address: initialUser.address || '',
    birthDay: initialUser.birthDay || '',
    gender: initialUser.gender || '',
    password: initialUser.password || '',
    avata: initialUser.avata || '',
    roles: initialUser.roles || [], // mảng để chứa nhiều vai trò
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e) => {
    setUser((prev) => ({ ...prev, roles: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API để cập nhật user tại đây
    console.log('Updated user:', user);
    navigate('/admin/add-user'); // Quay lại danh sách sau khi lưu
  };

  if (!initialUser.id) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy người dùng</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa người dùng #{userId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Avatar src={user.avata} alt={user.name} sx={{ width: 60, height: 60, mb: 2 }} />
          <TextField
            fullWidth
            label="Tên"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={user.address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ngày sinh"
            name="birthDay"
            type="date"
            value={user.birthDay}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            select
            label="Giới tính"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Male">Nam</MenuItem>
            <MenuItem value="Female">Nữ</MenuItem>
            <MenuItem value="Other">Khác</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="URL ảnh đại diện"
            name="avata"
            value={user.avata}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
          {/* Dùng Select multiple để chọn nhiều vai trò */}
            <InputLabel>Vai trò</InputLabel>
            <Select
              multiple
              name="roles"
              value={user.roles}
              onChange={handleRolesChange}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Moderator">Moderator</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Lưu
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/add-user')}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditUser;