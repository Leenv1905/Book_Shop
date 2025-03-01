import * as React from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Button from "@mui/material/Button";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function ActionButton () {
  return (
    <Box sx={{ '& > :not(style)': { mr: 1,},
  }}>

      <Fab 
        color="secondary" 
        aria-label="edit" 
        sx={{ width: 39, height: 39, }}
      >
        <DeleteOutlineIcon />
      </Fab>
      <Fab 
        aria-label="like" 
        sx={{ width: 39, height: 39,  }}
      >
        <AddCircleOutlineIcon />
      </Fab>
    </Box>
  );
}
