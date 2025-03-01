import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'; // Gọi modal xác nhận xóa
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const AllProduct = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/phpm/getProducts.php');
        setRows(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/add');
  };

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setOpenModal(true); // Hiện xác nhận Modal xoa sản phẩm
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/phpm/deleteProduct.php', 
        { id: selectedProductId }, // Dữ liệu gửi đi
        {
          headers: { 'Content-Type': 'application/json' }, // Header quan trọng
        }
      );
  
      if (response.data.success) {
        setRows(rows.filter((row) => row.id !== selectedProductId)); // Cập nhật danh sách sản phẩm
      } else {
        console.error('Failed to delete product:', response.data.message);
      }
      setOpenModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const cancelDelete = () => {
    setOpenModal(false); // Đóng modal nếu cancel
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 130 },
    { field: 'productPrice', headerName: 'Product Price', type:'number', width: 130 },
    { field: 'salePrice', headerName: 'Promotional Price', type: 'number', width: 130 },
    { field: 'discount', headerName: 'Discount', type: 'number', width: 90 },
    { field: 'weight', headerName: 'Weight', type: 'number', width: 90 },
    { field: 'salePerMonth', headerName: 'Sale Per Month', type: 'number', width: 90 },
    { field: 'dateImport', headerName: 'Date Import', type: 'number', width: 90 },
    { field: 'supplier', headerName: 'Supplier', type: 'number', width: 90 },
    { field: 'description', headerName: 'Description', width: 90 },
    { field: 'ingredient', headerName: 'Ingredient', width: 90 },
    { field: 'recipe', headerName: 'Recipe', width: 90 },
    { field: 'tags', headerName: 'Hashtag', width: 90 },
    { field: 'images', headerName: 'Images', width: 150, renderCell: (params) => params.row.images.map((url, index) => ( 
      <img key={index} src={`http://localhost:3000/${url}`} alt={`Product ${index}`} style={{ width: 50, height: 50, objectFit: 'cover' }} />
    )) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 50,
      renderCell: (params) => <ActionsMenu id={params.row.id} handleDelete={handleDelete} />
    }
  ];

  return (
    <div style={{ margin: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        style={{ marginBottom: '10px' }}
      >
        Add New Product
      </Button>
      <Paper sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Tác vụ xử lý ở MODAL */}
      <ConfirmDeleteModal
        open={openModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

const ActionsMenu = ({ id, handleDelete }) => {  // Nhận dữ liệu id từ state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    // console.log('Viewing item with id:', id);
    navigate(`/admin/viewProduct/${id}`);
    handleClose();
  };

  const handleEdit = () => {
    // console.log('Editing item with id:', id);
    navigate(`/admin/editProduct/${id}`);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '15ch',
          },
        }}
      >
        <MenuItem onClick={handleView}><VisibilityIcon sx={{ mr: 1 }} />View</MenuItem>
        <MenuItem onClick={handleEdit}><EditIcon sx={{ mr: 1 }} />Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(id)}><DeleteIcon sx={{ mr: 1 }} />Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default AllProduct;
