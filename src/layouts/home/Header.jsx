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

const Logo = styled("img")({
  height: "50px",
});

const CustomButton = styled(Button)(({ uppercase })=>({
  textTransform: uppercase ? "uppercase" : "none",
  margin: "0 10px",
  fontSize: "18px",
  color: "#272727",
  "&:hover": {
    color: "#F86D72", // primary color from CSS
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
          {/* Hamburger Icon for Mobile */}
          {isMobile && (
            <IconButton edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <IconButton sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <CustomButton>Home</CustomButton>
          <CustomButton>About</CustomButton>
          <CustomButton>Shop</CustomButton>
          <CustomButton>Blogs</CustomButton>
          <CustomButton>Pages</CustomButton>
          <CustomButton>Contact</CustomButton>
        </Box>
      </Drawer>
    </>

  );
};

export default Header;
