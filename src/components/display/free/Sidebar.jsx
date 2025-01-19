import React from "react";
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from "@mui/material";

const Sidebar = () => {
  return (
    <Box className="sidebar" sx={{ paddingLeft: "2rem" }}>
      {/* Search Bar */}
      <Box sx={{ mb: 5 }}>
        <form>
          <TextField 
            fullWidth 
            placeholder="Search" 
            variant="outlined" 
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth>
            Search
          </Button>
        </form>
      </Box>

      {/* Categories */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {["All", "Romance", "Recipe", "Sci-Fi", "Lifestyle"].map((category) => (
            <ListItem key={category}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Tags */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <List>
          {["Sci-Fi", "Revenge", "Zombie", "Vampire"].map((tag) => (
            <ListItem key={tag}>
              <ListItemText primary={tag} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Filter by Price */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Filter by Price
        </Typography>
        <List>
          {["Less than $10", "$10- $20", "$20- $30", "$30- $40", "$40- $50"].map((price) => (
            <ListItem key={price}>
              <ListItemText primary={price} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
