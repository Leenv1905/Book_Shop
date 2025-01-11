import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function Footer() {
    return (
        <>
            
<Box sx={{ flexGrow: 1, padding: { xs: '20px', md: '30px' }, }}>
<Typography variant="h6" noWrap component="div"
          sx={{
            flexGrow: 1,
            // marginBottom: { xs: '100px', md: '100px' },
            display: { xs: 'block', sm: 'block' },
            transition: 'width 0.3s ease, margin 0.3s ease',
            backgroundColor: 'white',
            color:'#347c69',
            margin: 'auto',
            textAlign: 'center',
            fontSize: '30px',
            fontFamily: 'Roboto, sans-serif', // Sử dụng font Roboto
            position: 'relative', // Để có thể định vị đường kẻ ngang
            '&:after': {
              content: '""',
              display: 'block',
              width: '10%',
              height: '15px',
              backgroundColor: 'red', // Màu đỏ cho đường kẻ ngang
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '-10px', // Cách chữ 10px
            },
          }} >
          WHERE TO FIND US...
        </Typography>
<Link to="/"> <img src="footer.png" alt="Home" style={{ width: '100%', height: 'auto', maxWidth: '100%'}} /> </Link>
</Box>
            <Box display="flex" sx={{ bgcolor: 'rgba(249, 252, 250, 1)', color: '#144d35', pt: 8, pb: 6, borderTop: '1px solid #d0d9d4'}} component="footer">
                <Container maxWidth="huge">
                    <Grid container spacing={2} justifyContent="space-evenly" sx={{ position: 'relative' }}>

                        <Grid item xs={6} sm={3}>
                            <Link to="/"> <img src="/sp/logo2.png" alt="Home" style={{ width: '280px', height: 'auto', }} /> </Link>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Typography variant="h5" gutterBottom>
                                About Us
                            </Typography>
                            <List sx={{ fontStyle: 'italic', fontSize:'30px' }}>
                                <ListItem disablePadding>
                                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}><ListItemText primary="Introduction" /></Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}><ListItemText primary="Contact" /></Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Mission" />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Vision" />
                                    {/* <ListItemText primary={ <Typography variant="h6" component="span"> Vision </Typography> } /> */}
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="h5" gutterBottom>
                                Services
                            </Typography>
                            <List sx={{ fontStyle: 'italic' }}>
                                <ListItem disablePadding>
                                    <ListItemText primary="Spices" />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Food Additives" />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Processed Food" />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Street Food" />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="h5" color="white" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="subtitle1" fontStyle={'italic'} >
                                At Simply Organic®, we believe that nature knows best, so we keep things real.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
