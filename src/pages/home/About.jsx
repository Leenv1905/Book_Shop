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
import Grid from "@mui/material/Grid2";

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

const About = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

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

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Top Info Section */}
        <Grid container spacing={2} sx={{ borderBottom: "1px solid #E3E3E3", mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">
              Need any help? Call us <Link href="#">112233344455</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ borderLeft: { md: "1px solid #E3E3E3" }, borderRight: { md: "1px solid #E3E3E3" } }}>
            <Typography variant="body1" align="center">
              Summer sale discount off 60%! <Link href="shop.html">Shop Now</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">
              2-3 business days delivery & free returns
            </Typography>
          </Grid>
        </Grid>

        {/* Placeholder for Additional Sections */}
        <Typography variant="h2" align="center" sx={{ mt: 5, color: "#272727" }}>
          About Us Daily
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Add your about page content here. Daily
        </Typography>
      </Container>
    </>
  );
};

export default About;
