import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import Galeryimg from '../../components/Galeryimg';
import ProDescription from '../../components/ProDescription';




function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/phpm/getProducts.php?id=${id}`);
        setProduct(response.data);
      } catch (error) { console.error('Error fetching product:', error); } };

      fetchProduct(); }, [id]);

  return (
    <>
      <Box sx={{
        flexGrow: 1,
        // paddingLeft: { xs: '10px', md: '50px' }, // Cách lề trái
        // paddingRight: { xs: '10px', md: '50px' }, // Cách lề phải
        marginBottom: { xs: '80px', md: '30px' },
        marginTop: { xs: '20px', md: '20px' },
      }}>
            <Typography variant="h2" component="h1" gutterBottom color="#035d66" textAlign={'center'} marginBottom={'30px'}>VIEW PRODUCT</Typography>

        <Grid container spacing={{ xs: 2, md: 10 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
          alignItems="stretch" justifyContent="center"  >

          <Grid size={8}>
            <Grid>
            {product && <Galeryimg images={product.images} />}
            </Grid>
            {/* <Grid sx={{
              marginBottom: { xs: '10px', md: '10px' },
              marginTop: { xs: '10px', md: '10px' },
              boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              }}>
              <ProDescription />
            </Grid> */}
          </Grid>


          <Grid size={6}>
            <Grid sx={{
              marginBottom: { xs: '10px', md: '10px' },
              marginTop: { xs: '10px', md: '10px' },
              boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
            }}>
              <Card>
                <Typography sx={{
                  padding: {
                    xs: '10px', md: '10px',
                    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                  }, fontFamily: 'Roboto, sans-serif', color: '#035d66', background: '#91e0e2'
                }}
                  variant="h4" gutterBottom align="center">GOOD PRODUCT</Typography>
                <CardContent>
                {product && (
                  <>
                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                      Product Name: {product.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Product Price: {product.productPrice} $
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Promotional Price: {product.salePrice} $
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Discount: {product.discount} %
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Weight: {product.weight} gram
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Sale Per Month: {product.salePerMonth} pcs
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Date Import: {product.dateImport}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Supplier: {product.supplier}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mr: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      <AssistantPhotoOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="p">
                        Hastags: {product.tags}
                      </Typography>
                    </Box>
                  </Box>
                  </>
                )}
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{
              marginBottom: { xs: '10px', md: '10px' },
              marginTop: { xs: '10px', md: '10px' },
              boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              }}>

              {product && ( 
                <ProDescription 
                description={product.description} 
                ingredient={product.ingredient} 
                recipe={product.recipe} 
                /> )}

            </Grid>

          </Grid>
        </Grid>

      </Box>

    </>
  );
}

export default ViewProduct;
