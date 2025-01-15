import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Link,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import UserItems from "./UserItems";

const Logo = styled("img")({
  height: "50px",
});

const CustomButton = styled(Button)(({ uppercase })=>({
  textTransform: uppercase ? "uppercase" : "none", // Chuyển đổi chữ hoa chữ thường
  margin: "0 10px",  // Khoảng cách giữa các nút
  fontSize: "18px",
  color: "#272727",
  "&:hover": {
    color: "#F86D72",
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:800px)");
  // Chuyển về chế độ mobile khi kích thước < 800 px
  // Có thể kết hợp useMediaQuery và logic JavaScript để kích hoạt drawer dựa trên không gian.
  // Tuy nhiên ở tình hướng này là chưa cần thiết

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "none", padding: '10px 0' , color: "#272727" }}>
        <Toolbar>
          {/* Logo */}
          <Logo src="/demo/images/main-logo.png" alt="Logo" />
          {/* Links for Desktop */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <CustomButton uppercase>Home</CustomButton>
              <CustomButton uppercase>About</CustomButton>
              <CustomButton uppercase>Shop</CustomButton>
              <CustomButton uppercase>Blogs</CustomButton>
              <CustomButton uppercase>Pages</CustomButton>
              <CustomButton uppercase>Contact</CustomButton>
            </Box>
          )}
          {!isMobile && <UserItems />} {/* UserItems hiển thị ngoài cùng bên phải trên Desktop */}
          {/* Hamburger Icon for Mobile */}
          {isMobile && (
            <>
            
            {/* <IconButton edge="end" onClick={toggleDrawer(true)}> */}
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon sx={{marginLeft:'20px'}}/>
            </IconButton>

            <Box sx={{ position: 'absolute', right: 30, display: 'flex', alignItems: 'center' }}>
              {/* Căn chỉnh UserItems ở góc phải trên Mobile, cần cho nằm trong 1 Box */}
            <UserItems/>
            </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: '100%', p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <IconButton sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{
            display: 'grid', // Hiển thị theo lưới
            gridTemplateColumns: 'repeat(2, 1fr)', // Chia thành 2 cột
            gap: 2, // Khoảng cách giữa các nút
            justifyItems: 'center', // Căn giữa các nút theo chiều ngang
            alignItems: 'center',
            mt: 2, // Khoảng cách trên cùng
            }}>
          <CustomButton sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>Home</CustomButton>
          <CustomButton sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>About</CustomButton>
          <CustomButton sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>Shop</CustomButton>
          <CustomButton sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>Blogs</CustomButton>
          <CustomButton sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>Pages</CustomButton>
          <CustomButton sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>Contact</CustomButton>
          {/* <CustomButton>Extra</CustomButton>  */}
          {/* Nút thứ 7 - khi này sẽ là 1 cột 4, 1 cột 3 */}
        </Box>
        </Box>
      </Drawer>
    </>

  );
};

export default Header;
