import React from "react";
import { Box, List, ListItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserModal from "./UserModal";
import WishlistDropdown from "./WishlistDropdown";
import CartDropdown from "./CartDropdown";

const UserItems = () => {
  return (
    <Box
      sx={{
        display: "flex", // Đảm bảo các phần tử nằm trên 1 hàng ngang
        justifyContent: "flex-end", // Căn phải
        alignItems: "center", // Căn giữa theo chiều dọc
        gap: 2, // Khoảng cách giữa các phần tử
      }}
    >
      {/* Search Icon */}
      <SearchIcon style={{ cursor: "pointer" }} />

      {/* User Modal */}
      <UserModal />

      {/* Wishlist Dropdown */}
      <WishlistDropdown />

      {/* Cart Dropdown */}
      <CartDropdown />
    </Box>
  );
};

export default UserItems;
