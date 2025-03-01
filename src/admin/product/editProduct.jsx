import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Chip, Autocomplete } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Grid from '@mui/material/Grid2';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#E1306C',
    },
  },
});

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    productPrice: '',
    salePrice: '',
    discount: '',
    weight: '',
    salePerMonth: '',
    dateImport: '',
    supplier: '',
    description: '',
    ingredient: '',
    recipe: '',
    tags: [],
    images: [], // Hình ảnh cũ từ server
    newImages: [], // Hình ảnh mới cần upload
  });

  const [tags, setTags] = useState([]);
  const availableTags = ["Whole Spices", "Spice Blends", "Powdered Spices"];

  // TẢI SẢN PHẨM KHI MỞ TRANG
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/phpm/getProducts.php?id=${id}`);
        const productData = response.data;

        // Chuyển đổi tags từ chuỗi thành mảng nếu cần thiết
        if (productData.tags && typeof productData.tags === 'string') {
          productData.tags = productData.tags.split(',').map(tag => tag.trim());
        }

        // Chuyển đổi đường dẫn hình ảnh thành định dạng đúng
        if (productData.images && Array.isArray(productData.images)) {
          productData.images = productData.images.map(path => path.replace(/\\/g, '/'));
        }

        setProduct({ ...productData, newImages: [] }); // Thiết lập giá trị mới cho sản phẩm
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setProduct((prevProduct) => ({
      ...prevProduct,
      newImages: files,
    }));
  };

  // Xóa ảnh khỏi danh sách hình ảnh hiện tại
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const handleDeleteImage = (img) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((image) => image !== img), // Loại bỏ hình ảnh
    }));
    setImagesToDelete((prev) => [...prev, img]); // Thêm ID hình vào danh sách xóa
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu để gửi
    const updatedProduct = {
      ...product,
      tags: product.tags.join(','), // Chuyển mảng tags thành chuỗi
    };
    // console.log('Updated product data:', updatedProduct); 
    // Log để kiểm tra updatedProduct

    // Sử dụng FormData để gửi hình ảnh
    const formData = new FormData();
    for (const key in updatedProduct) {
      if (key !== 'newImages') {
        formData.append(key, updatedProduct[key]);
      }
    }
    // console.log('FormData after adding updated product:', formData);
    // Log formData để kiểm tra- HOẶC
      // Log nội dung formData theo cách sâu hơn nội dung bên trong
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

    // Thêm hình ảnh cũ vào formData
if (product.images && product.images.length > 0) {
  product.images.forEach((img, index) => {
    formData.append('existingImages[]', img);
  });
}
    // Thêm hình ảnh mới vào formData
    if (updatedProduct.newImages.length > 0) {
      updatedProduct.newImages.forEach((file, index) => {
        formData.append(`image[${index}]`, file);
      });
    }
      // Log lại formData sau khi thêm hình ảnh
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

    // Trước khi gửi dữ liệu
    if (imagesToDelete.length > 0) {
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
    }

    // Gửi danh sách ID các hình cần xóa
    // formData.append('imagesToDelete', JSON.stringify(imagesToDelete)); 
    // Chuyển mảng ID ảnh cần xóa thành chuỗi JSON

    // if (product.newImages.length > 0) {
    //   product.newImages.forEach((file, index) => {
    //     formData.append(`image[${index}]`, file);
    //   });
    // }

    // TRÙNG MÃ, GỬI 2 LẦN LÊN SERVER

    // console.log('FormData before sending:', formData); 
    // Log formData trước khi gửi
      // Log cuối cùng sâu hơn bên trong các cặp key, value
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

    // Gửi dữ liệu đến server
    try {
      const response = await axios.post('http://localhost:3000/phpm/updateProduct.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đảm bảo header đúng khi gửi FormData
        },
      });
      console.log('Server response:', response); 
      // Kiểm tra phản hồi từ server
      
      if (response.data.success) {
        console.log('Product updated successfully');
        navigate('/admin/allproduct');
      } else {
        console.error('Error updating product:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: 'url(https://obi.vn/wp-content/uploads/2023/02/top-50-y-tuong-hinh-nen-trang-dep-tinh-khoi-cuc-ky-doc-dao_1.jpg)', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'rgba(227, 244, 251, 0.5)' }}></div>
        <Box sx={{ flexGrow: 1, padding: 5 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom color="#0c4646">EDIT PRODUCT FORM</Typography>
            <Button type="submit" variant="contained" color="success" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }}>CONFIRM</Button>
            <Button variant="contained" color="error" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }} onClick={() => navigate('/admin/allproduct')}>CANCEL</Button>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center">

              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Product Price"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={handleChange}
                  type="number"
                  required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Promotional Price"
                  name="salePrice"
                  value={product.salePrice}
                  onChange={handleChange}
                  type="number"
                  required />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Discount"
                  placeholder="Discount %"
                  variant="outlined"
                  type="number"
                  margin="normal"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Weight"
                  placeholder="Product Weight gram"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Sales Per Month"
                  placeholder="Sales Per Month"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  name="salePerMonth"
                  value={product.salePerMonth}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Date of import"
                  margin="normal"
                  placeholder="Date of import"
                  variant="outlined"
                  type="date"
                  name="dateImport"
                  value={product.dateImport}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Supplier"
                  placeholder="Supplier Code"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  name="supplier"
                  value={product.supplier}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter Product Description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={1}
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Ingredient"
                  variant="outlined"
                  margin="normal"
                  placeholder="Ingredient of Product"
                  name="ingredient"
                  value={product.ingredient}
                  onChange={handleChange}
                  required
                  multiline
                  rows={1}
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Recipe"
                  variant="outlined"
                  margin="normal"
                  placeholder="Recipe of Product"
                  name="recipe"
                  value={product.recipe}
                  onChange={handleChange}
                  required
                  multiline
                  rows={1}
                />
              </Grid>

            </Grid>

            <Grid container spacing={{ xs: 5, md: 10 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              alignItems="stretch" justifyContent="center"
              sx={{ padding: '30px' }} >

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={availableTags}
                  required
                  value={product.tags}
                  onChange={(event, newValue) => setProduct({ ...product, tags: newValue })}
                  renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
                  renderInput={(params) => <TextField {...params} label="Tags" />}
                />
              </Grid>

              {/* Chỉnh sửa hình ảnh */}
              <Grid item xs={12}>
                <input accept="image/*" style={{ display: 'none' }} id="upload-images" multiple type="file" onChange={handleImageChange} />
                <label htmlFor="upload-images">
                  <Button variant="contained" color="primary" component="span">Upload Images</Button>
                </label>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {product.images.map((img, index) => (
                    <div key={index}>
                      <img
                        src={`http://localhost:3000/${img}`}
                        alt={`Product ${index}`}
                        style={{ width: 150, height: 150, objectFit: 'cover' }}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteImage(img)}
                      >
                        x
                      </Button>
                    </div>

                    // <img key={index} src={`http://localhost:3000/${url}`} alt={`Product ${index}`} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  ))}
                  {product.newImages.length > 0 && product.newImages.map((url, index) => (
                    <img key={index} src={URL.createObjectURL(url)} alt={`Preview ${index}`} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  ))}
                </Box>
              </Grid>

            </Grid>
          </form>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default EditPage;