import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTheme, styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SearchIcon from '@mui/icons-material/Search';
// import ProtectedRoute from './ProtectedRoute'; 
// KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP

import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ColorModeIconDropdown from '../admin/componentsDashboard/Themebutton';
import AppTheme from '../admin/componentsDashboard/Theme';



const drawerWidth = 240;
// const logoUrl = process.env.PUBLIC_URL + './banner1.jpg';
function LayoutAdmin({ isLoggedIn, setIsLoggedIn},props) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Đăng xuất người dùng và cập nhật trạng thái 
    try { 
     const response = await axios.get('http://localhost:3000/phpm/signout.php'); 
     if (response.data.success) { 
       setIsLoggedIn(false); 
       navigate('/'); // Điều hướng về trang đăng nhập hoặc home 
       } 
     } catch (error) { 
       console.error('Error logging out:', error); 
     } 
     };

  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const icons = [<InsightsOutlinedIcon />,
  <ShoppingCartCheckoutOutlinedIcon />,
  <ShoppingBagOutlinedIcon />,
  <SupportAgentOutlinedIcon />,];
  const icons2 = [
    <InboxIcon />,
    <PeopleOutlineOutlinedIcon />,
    <NoteAltOutlinedIcon />];

  // KHAI BÁO CHO MENU SEARCH
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));
  // KHAI BÁO CHO MENU SEARCH

  // KHAI BÁO CHO CÀI ĐẶT CÁ NHÂN
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // KHAI BÁO CHO CÀI ĐẶT CÁ NHÂN

  const drawer = (
    <div style={{ backgroundColor: '#082123',
      height: '100vh',
      overflow: 'auto',
     }}>
      {/* // Đặt màu nền của Navibar là màu vàng 
      // Đặt chiều cao của Navibar chiếm toàn bộ chiều cao màn hình
      // Đảm bảo nội dung có thể cuộn nếu vượt quá chiều cao màn hình
      */}
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={drawerOpen ? 'close drawer' : 'open drawer'}
          edge="start"
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {drawerOpen ? (
            <img src="/sp/logo2.png" alt="FLAVOURS SHOP" style={{ width: '120px', height: 'auto' }} />) : (<MenuIcon sx={{color:'#d5d6d6'}}/>)}
          {/* KHI THU GỌN NAVIBAR THÌ MENUICON SẼ HIỆN LÊN THAY THẾ */}
        </IconButton>
        <Typography sx={{ display: { xs: 'block', sm: drawerOpen ? 'none' : 'none' } }}>
          FLAVOURS SHOP
        </Typography>
        {/* CHỮ FLAVOURS SHOP PHÍA DƯỚI NÀY CHỈ ĐƯỢC HIỂN THỊ TRONG GIAO DIỆN MOBILE */}

      </Toolbar>

      <Divider />
      {/* ĐƯỜNG KẺ NGANG */}
      <List>
        {['Dashboard', 'All Products', 'Add Product', 'User'].map((text, index) => {
          const paths = ['/admin', '/admin/allproduct', '/admin/add', '/admin/add-user'];
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={paths[index]}
                // ĐOẠN NÀY LÀ CHÈN LINK VÀO CÁC MENU
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
                    color: '#d5d6d6'
                  }}
                >
                  {icons[index % icons.length]} {/* Sử dụng icon tương ứng với chỉ số index */}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: drawerOpen ? 1 : 0 ,color: '#d5d6d6'}}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {['Supplier', 'Customer', 'Report'].map((text, index) => {
          const paths2 = ['/admin', '/admin/customer'];
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
                    color: '#d5d6d6'
                  }}
                >
                  {icons2[index % icons2.length]} {/* Sử dụng icon tương ứng với chỉ số index */}
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
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <AppTheme>
     <CssBaseline enableColorScheme />
      <Box sx={{
      display: 'flex',

    }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: { xs: theme.zIndex.drawer - 1, sm: theme.zIndex.drawer - 1 },
          // Ở MÁY TÍNH LÀ PHÍA SAU, Ở MOBILE LÀ ZINDEX
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          ml: { sm: drawerOpen ? `${drawerWidth}px` : 0 },
          transition: 'width 0.3s ease, margin 0.3s ease',
          backgroundColor: '#555764',
          color: '#fffde7',
        }}
      >
      {/* // THUỘC TÍNH ZINDEX THỂ HIỆN VIỆC APPBAR HAY NAVIBAR ĐƯỢC ƯU TIÊN HIỂN THỊ */}

        <Toolbar >
          {/* ICON MENU ĐIỀU KHIỂN/ CHỈ HIỆN RA Ở GIAO DIỆN MOBILE */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* ICON MENU ĐIỀU KHIỂN/ CHỈ HIỆN RA Ở GIAO DIỆN MOBILE */}

          <Typography variant="h8" noWrap component="div"
            sx={{
              flexGrow: 1,
              ml: '60px',
              display: { xs: 'none', sm: 'block' },
              transition: 'width 0.3s ease, margin 0.3s ease'
            }} >
            ADMIN
          </Typography>
          {/* TÌM KIẾM */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
              {/* TÌM KIẾM */}
         <ColorModeIconDropdown />
            {/* Điểu khiển màu sắc */}
      

          {/* CÀI ĐẶT CÁ NHÂN */}
          {isLoggedIn ? (
          <Box sx={{ flexGrow: 0, ml: '10px' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300?img=13" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
             ) : (
              // <Typography variant="body1" color="textSecondary">Please log in to access admin settings.</Typography>
              <Button onClick={() => navigate('/signin')} variant="contained" color="primary"> Login </Button>
              // <Link href="/signin" variant="body1" color="primary">Login</Link>
            )}
          {/* CÀI ĐẶT CÁ NHÂN */}

        </Toolbar>
      </AppBar>

      {/* ĐIỀU KHIỂN NAVIBAR */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)` }, flexShrink: { sm: 0 }, transition: 'width 0.3s ease' }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            },
            transition: 'width 0.3s ease',
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* ĐIỀU KHIỂN NAVIBAR */}

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`})` }, transition: 'width 0.3s ease' }}>
        <Toolbar />
        {/* <Typography sx={{ marginBottom: 2 }}>
          CHỖ NÀY NÊN CHÈN CÁI ĐƯỜNG DAANXVD: DASHBOARD/ADMIN....
        </Typography> */}
      {/* <ProtectedRoute isLoggedIn={isLoggedIn}> */}
        <Outlet />
        {/* </ProtectedRoute> */}
      </Box>
    </Box>
    </AppTheme>

  );
}

LayoutAdmin.propTypes = {
  window: PropTypes.func,
};

export default LayoutAdmin;
