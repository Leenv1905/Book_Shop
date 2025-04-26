import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AdminAppBar from './AdminAppBar';
import Slide from '@mui/material/Slide';

const drawerWidth = 240;

function LayoutAdmin() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < theme.breakpoints.values.md);

  // Theo dõi resize để điều chỉnh drawer
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth < theme.breakpoints.values.md;
      setIsMobile(isCurrentlyMobile);
      if (isCurrentlyMobile) {
        setDrawerOpen(false); // Đóng drawer trên mobile
        setMobileOpen(false);
      } else {
        setDrawerOpen(true); // Mở drawer trên desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints.values.md]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const icons = [
    <InsightsOutlinedIcon />,
    <ShoppingCartCheckoutOutlinedIcon />,
    <ShoppingBagOutlinedIcon />,
    <SupportAgentOutlinedIcon />,
    <SupportAgentOutlinedIcon />,
  ];

  const icons2 = [
    <InboxIcon />,
    <PeopleOutlineOutlinedIcon />,
    <NoteAltOutlinedIcon />,
  ];

  // Menu cho Drawer tạm thời (mobile, 3 cột)
  const mobileMenu = (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {['Dashboard', 'Products', 'Ware House', 'Order', 'User', 'Supplier', 'Maketing', 'Review'].map((text, index) => {
        const paths = [
          '/admin',
          '/admin/product',
          '/admin/import-products',
          '/admin/order',
          '/admin/user',
          '/admin/supplier',
          '/admin/discount',
          '/admin/review',
        ];
        const allIcons = [...icons, ...icons2];
        return (
          <Grid item xs={4} key={text}>
            <Paper
              sx={{
                p: 1,
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease',
                },
              }}
            >
              <ListItemButton
                component={Link}
                to={paths[index]}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#d5d6d6',
                }}
              >
                <ListItemIcon sx={{ color: '#d5d6d6', mb: 1 }}>
                  {allIcons[index % allIcons.length]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#d5d6d6' }} />
              </ListItemButton>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );

  // Menu cho Drawer cố định (desktop, danh sách dọc)
  const desktopMenu = (
    <>
      <List>
        {['Dashboard', 'Products', 'Ware House', 'Order', 'User'].map((text, index) => {
          const paths = ['/admin', '/admin/product', '/admin/import-products', '/admin/order', '/admin/user'];
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={paths[index]}
                sx={{
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#d5d6d6',
                  }}
                >
                  {icons[index % icons.length]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: drawerOpen ? 1 : 0, color: '#d5d6d6' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {['Supplier', 'Maketing', 'Review'].map((text, index) => {
          const paths2 = ['/admin/supplier', '/admin/discount', '/admin/review'];
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={paths2[index]}
                sx={{
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#d5d6d6',
                  }}
                >
                  {icons2[index % icons2.length]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: drawerOpen ? 1 : 0, color: '#d5d6d6' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  const drawer = (
    <div style={{ backgroundColor: '#99b7bb', height: isMobile ? 'auto' : '100vh', overflow: 'auto' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={drawerOpen ? 'close drawer' : 'open drawer'}
          edge="start"
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          {drawerOpen ? (
            <img src="/demo/images/main-logo.png" alt="SHOP" style={{ width: '120px', height: 'auto' }} />
          ) : (
            <MenuIcon sx={{ color: '#d5d6d6' }} />
          )}
        </IconButton>
        <Typography sx={{ display: { xs: 'block', md: drawerOpen ? 'none' : 'none' } }}>
          BOOK SHOP
        </Typography>
      </Toolbar>
      <Divider />
      {isMobile ? mobileMenu : desktopMenu}
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminAppBar
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{
          width: { md: drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)` },
          flexShrink: { md: 0 },
          transition: 'width 0.2s ease',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          anchor="top"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%',
              height: 'auto',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: '#99b7bb',
            },
          }}
        >
          <Slide in={mobileOpen} direction="down">
            <div>{drawer}</div>
          </Slide>
        </Drawer>
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
              transition: 'width 0.2s ease',
              backgroundColor: '#99b7bb',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 8,
          width: { md: `calc(100% - ${drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`})` },
          transition: 'width 0.2s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default LayoutAdmin;