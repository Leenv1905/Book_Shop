import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <ShoppingCartIcon style={{ cursor: "pointer" }} onClick={handleOpen} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: 300, padding: 16 },
        }}
      >
        <Typography variant="h6" mb={2}>
          Your Cart
        </Typography>
        <List>
          <ListItem>
            <Box>
              <Typography variant="subtitle1">Secrets of the Alchemist</Typography>
              <Typography variant="body2">High quality in good price.</Typography>
            </Box>
            <Typography>$870</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Box>
              <Typography variant="subtitle1">Quest for the Lost City</Typography>
              <Typography variant="body2">Professional Quest for the Lost City.</Typography>
            </Box>
            <Typography>$600</Typography>
          </ListItem>
        </List>
        <Box mt={2}>
          <Button variant="contained" fullWidth>
            View Cart
          </Button>
          <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
            Checkout
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default CartDropdown;
